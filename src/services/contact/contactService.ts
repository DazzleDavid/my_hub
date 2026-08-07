import { db } from "@/services/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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