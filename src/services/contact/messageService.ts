import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/services/firebase/config";

export async function sendMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await addDoc(collection(db, "messages"), {
    ...data,
    createdAt: serverTimestamp(),
    status: "unread",
  });
}

export async function getMessages() {
  const q = query(
    collection(db, "messages"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function markMessageAsRead(id: string) {
  await updateDoc(doc(db, "messages", id), {
    status: "read",
  });
}

export async function deleteMessage(id: string) {
  await deleteDoc(doc(db, "messages", id));
}