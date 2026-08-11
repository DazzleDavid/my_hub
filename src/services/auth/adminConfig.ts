import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/config";

export async function isAdmin(uid: string) {
  const adminRef = doc(db, "admins", uid);
  const adminSnap = await getDoc(adminRef);
  return adminSnap.exists() && adminSnap.data()?.enabled === true;
}