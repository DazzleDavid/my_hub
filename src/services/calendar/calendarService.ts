import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  setDoc, 
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from "firebase/firestore";
import { auth, db } from "@/services/firebase/config";
import { isAdmin } from "@/services/auth/adminConfig";
import type { EventCategory, CalendarEventInput, CalendarEvent } from "@/types/calendar";

/* ====================================================
   A. 行程類別 (Categories) 操作
   ==================================================== */

// 1. 取得所有類別
export const getCategories = async (): Promise<Record<string, EventCategory>> => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categories: Record<string, EventCategory> = {};
  
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    categories[docSnap.id] = { 
      id: docSnap.id, 
      name: data.name || "",
      displayName: data.displayName || data.name || "",
      color: data.color || "#d97724"
    };
  });
  
  return categories;
};

// 2. 新增或更新類別
export const saveCategory = async (
  id: string, 
  name: string, 
  displayName: string, 
  color = "#d97724"
): Promise<void> => {
  // 修復原始程式碼中 doc() 重複宣告的語法錯誤
  const categoryRef = doc(db, "categories", id);
  await setDoc(categoryRef, { name, displayName, color }, { merge: true });
};

/* ====================================================
   B. 行程資料 (Events) 操作
   ==================================================== */

// 1. 取得所有行程 (根據管理者/訪客進行敏感欄位清洗)
export const getCalendarEvents = async (): Promise<CalendarEvent[]> => {
  // 檢查權限
  const currentUser = auth.currentUser;
  let userIsAdmin = false;
  if (currentUser) {
    try {
      userIsAdmin = await isAdmin(currentUser.uid);
    } catch (error) {
      console.error("檢查 Admin 權限失敗:", error);
      userIsAdmin = false;
    }
  }

  // 並行讀取 categories 與 events
  const [catSnapshot, eventSnapshot] = await Promise.all([
    getDocs(collection(db, "categories")),
    getDocs(collection(db, "events"))
  ]);

  const catMap: Record<string, EventCategory> = {};
  catSnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    catMap[docSnap.id] = { 
      id: docSnap.id, 
      name: data.name || "",
      displayName: data.displayName || data.name || "",
      color: data.color || "#d97724"
    };
  });

  const events: CalendarEvent[] = [];
  
  eventSnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const catId = data.categoryId || "";
    const cat = catMap[catId];
    const publicDisplayName = cat?.displayName || "不公開行程";

    if (userIsAdmin) {
      // 🟢 管理者：完整資料
      events.push({
        id: docSnap.id,
        title: data.title || "",
        start: data.start,
        end: data.end || undefined,
        allDay: data.allDay ?? false,
        description: data.description || "",
        location: data.location || "",
        categoryId: catId,
        categoryName: cat?.name || "",
        categoryDisplayName: cat?.displayName || publicDisplayName,
        createdAt: data.createdAt
      });
    } else {
      // 🔴 訪客/非管理者：安全清洗（敏感欄位不打包進 Array）
      events.push({
        id: docSnap.id,
        title: publicDisplayName, // 標題直接替換為對外名稱
        start: data.start,
        end: data.end || undefined,
        allDay: data.allDay ?? false,
        categoryId: catId,
        categoryDisplayName: publicDisplayName,
        createdAt: data.createdAt
      });
    }
  });
  
  return events;
};

// 2. 新增行程
export const addCalendarEvent = async (eventData: CalendarEventInput): Promise<string> => {
  const docRef = await addDoc(collection(db, "events"), {
    ...eventData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// 3. 更新行程
export const updateCalendarEvent = async (id: string, eventData: Partial<CalendarEventInput>): Promise<void> => {
  const eventRef = doc(db, "events", id);
  await updateDoc(eventRef, {
    ...eventData,
    updatedAt: serverTimestamp()
  });
};

// 4. 刪除行程
export const deleteCalendarEvent = async (id: string): Promise<void> => {
  const eventRef = doc(db, "events", id);
  await deleteDoc(eventRef);
};