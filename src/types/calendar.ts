// 1. 行程類別型別
export interface EventCategory {
  id: string;
  displayName: string; // 對外顯示名稱 (例如："工作/會議")
  name: string;        // 內部識別碼/代碼 (例如："meeting_internal")
  color?: string;      // 自訂顏色標籤
  order?: number;      // 排序序號 (新增此欄位)
}

// 2. 行程資料型別 (寫入 Firestore 用)
export interface CalendarEventInput {
  title: string;
  start: string;              // ISO 8601 字串 (例如："2026-08-20T09:30:00")
  end?: string;               // 可選，避免全天或單一時間點行程報錯
  allDay?: boolean;
  description?: string;
  location?: string;
  categoryId: string;         // 關聯到 EventCategory 的 id
}

// 3. 從 Firestore / 前端使用的行程型別
export interface CalendarEvent extends Omit<CalendarEventInput, 'start' | 'end'> {
  id: string;
  start: string | Date;       // 相容 FullCalendar 支援的 Date 物件或字串
  end?: string | Date;
  categoryName?: string;        // 內部類別代碼 (管理員檢視用)
  categoryDisplayName?: string; // 對外顯示名稱 (Modal / 訪客檢視用)
  createdAt?: any;
}