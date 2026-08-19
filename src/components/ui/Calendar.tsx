import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import { auth, db } from "@/services/firebase/config";
import { isAdmin } from "@/services/auth/adminConfig";
import type { CalendarEvent, EventCategory } from "@/types/calendar";
import * as calendarServiceModule from "@/services/calendar/calendarService";
import "./calendar.css";

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: string) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

export default function Calendar({
  events: propEvents,
  onDateClick,
  onEventClick,
}: CalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [firebaseEvents, setFirebaseEvents] = useState<CalendarEvent[]>([]);
  // categoryId -> EventCategory 對照地圖
  const [categoryMap, setCategoryMap] = useState<Record<string, EventCategory>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);

  // 1. 檢查 Auth 與 Admin 權限
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          try {
            const adminStatus = await isAdmin(user.uid);
            setUserIsAdmin(adminStatus);
          } catch (error) {
            console.error("👉 [Calendar] 檢查 Admin 發生錯誤:", error);
            setUserIsAdmin(false);
          }
        } else {
          setUserIsAdmin(false);
        }
      },
      (error) => {
        console.error("👉 [Calendar] Auth 監聽失敗:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. 載入類別與行程資料
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // 撈取 Categories（主要用於顏色比對）
        try {
          const categorySnap = await getDocs(collection(db, "categories"));
          const map: Record<string, EventCategory> = {};
          
          categorySnap.forEach((docSnap) => {
            const data = docSnap.data();
            map[docSnap.id] = {
              id: docSnap.id,
              name: data.name || "",
              displayName: data.displayName || data.name || "",
              color: data.color || "#d97724",
            };
          });
          setCategoryMap(map);
        } catch (catError) {
          console.error("載入 Firebase 類別資料失敗：", catError);
        }

        // 若外部沒傳入 props，則呼叫已做資安清洗的 service 撈取資料
        if (!propEvents || propEvents.length === 0) {
          const fetchedEvents = await calendarServiceModule.getCalendarEvents();
          setFirebaseEvents(fetchedEvents);
        }
      } catch (error) {
        console.error("載入 Firebase 行程資料失敗：", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [propEvents]);

  const rawEvents = propEvents && propEvents.length > 0 ? propEvents : firebaseEvents;

  // 3. 計算渲染用 Events（帶入顏色）
  const displayEvents = rawEvents.map((evt) => {
    const cat = categoryMap[evt.categoryId];
    const matchedColor = cat?.color || (evt as any).color || "#d97724";

    return {
      ...evt,
      backgroundColor: matchedColor,
      borderColor: matchedColor,
    };
  });

  const handleEventClick = (info: any) => {
    info.jsEvent.preventDefault();

    const foundEvent = displayEvents.find((e) => e.id === info.event.id);

    const event = foundEvent || {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      color: info.event.backgroundColor,
      ...info.event.extendedProps,
    };

    onEventClick?.(event);
    setSelectedEvent(event);
  };

  // 算透明度膠囊背景色
  const getBadgeStyle = (rawHex: string) => {
    let cleanHex = rawHex.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map((c) => c + c).join("");
    }

    if (cleanHex.length !== 6) {
      return {
        borderColor: rawHex,
        backgroundColor: "rgba(217, 119, 36, 0.08)",
      };
    }

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return {
      borderColor: rawHex,
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.08)`,
    };
  };

  if (loading) {
    return <div style={{ padding: "20px", color: "#6e645a" }}>載入行事曆資料中...</div>;
  }

  return (
    <div className="modern-calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="zh-tw"
        height="auto"

        eventDisplay="block"
        displayEventTime={true}
        eventOrder="start"

        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}

        buttonText={{
          today: "今天",
          month: "月",
          week: "週",
          day: "日",
        }}

        slotMinTime="08:00:00"
        slotMaxTime="24:00:00"
        slotDuration="01:00:00"

        allDaySlot={true}
        allDayText="全天"

        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}

        dayCellContent={(arg) => arg.dayNumberText.replace("日", "")}

        events={displayEvents}
        dateClick={(info) => onDateClick?.(info.dateStr)}
        eventClick={handleEventClick}
      />

      {/* 彈出視窗 (Modal) */}
      {selectedEvent && (
        <div className="calendar-modal-backdrop" onClick={() => setSelectedEvent(null)}>
          <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              {/* Service 層已將訪客 title 洗為對外名稱，管理者 title 為真實標題 */}
              <h3>{selectedEvent.title}</h3>
              <button className="close-btn" onClick={() => setSelectedEvent(null)}>✕</button>
            </div>

            <div className="modal-body-styled">
              {(() => {
                const formatTime = (timeStr: any) => {
                  if (!timeStr) return "";
                  const date = new Date(timeStr);
                  if (isNaN(date.getTime())) return String(timeStr).replace("T", " ");
                  
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const day = String(date.getDate()).padStart(2, "0");
                  const hours = String(date.getHours()).padStart(2, "0");
                  const minutes = String(date.getMinutes()).padStart(2, "0");
                  return `${year}-${month}-${day} ${hours}:${minutes}`;
                };

                const cat = categoryMap[selectedEvent.categoryId];
                const baseColor = cat?.color || (selectedEvent as any).backgroundColor || "#d97724";
                const badgeStyle = getBadgeStyle(baseColor);
                const displayBadgeText = selectedEvent.categoryDisplayName || cat?.displayName;

                return (
                  <div className="info-grid">
                    {/* 對外顯示類別膠囊 */}
                    {displayBadgeText && (
                      <div className="info-item">
                        <span className="info-label">🏷️ 行程類型</span>
                        <span
                          className="info-value category-badge"
                          style={{
                            border: `2.5px solid ${badgeStyle.borderColor}`,
                            backgroundColor: badgeStyle.backgroundColor,
                            color: "inherit",
                          }}
                        >
                          {displayBadgeText}
                        </span>
                      </div>
                    )}

                    {/* 管理員專用：內部類別代碼 */}
                    {userIsAdmin && selectedEvent.categoryName && (
                      <div className="info-item">
                        <span className="info-label">🔑 內部類別代碼</span>
                        <span className="info-value">{selectedEvent.categoryName}</span>
                      </div>
                    )}

                    <div className="info-item">
                      <span className="info-label">🕒 開始時間</span>
                      <span className="info-value">{formatTime(selectedEvent.start)}</span>
                    </div>

                    {selectedEvent.end && (
                      <div className="info-item">
                        <span className="info-label">⌛ 結束時間</span>
                        <span className="info-value">{formatTime(selectedEvent.end)}</span>
                      </div>
                    )}

                    {/* 管理員專用欄位（僅在 Service 有回傳且為管理員時才會存在） */}
                    {userIsAdmin && selectedEvent.location && (
                      <div className="info-item">
                        <span className="info-label">📍 地點</span>
                        <span className="info-value">{selectedEvent.location}</span>
                      </div>
                    )}

                    {userIsAdmin && selectedEvent.description && (
                      <div className="info-item desc-item">
                        <span className="info-label">📝 說明</span>
                        <span className="info-value desc-value">{selectedEvent.description}</span>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="modal-footer">
              <button className="primary-btn" onClick={() => setSelectedEvent(null)}>關閉</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}