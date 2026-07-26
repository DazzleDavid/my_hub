import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    where,
    getDocs,
    orderBy,
    Timestamp
} from "firebase/firestore";


import { db } from "@/services/firebase/config";



// 新增事件
export async function createEvent(data: any) {

    await addDoc(
        collection(db, "events"),
        {

            ownerId: data.ownerId,

            title: data.title,

            description: data.description ?? "",

            startTime: Timestamp.fromDate(
                new Date(data.startTime)
            ),

            endTime: Timestamp.fromDate(
                new Date(data.endTime)
            ),

            category: data.category ?? "Other",

            location: data.location ?? "",

            isPublic: data.isPublic ?? false,


            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp()

        }
    );

}



// 取得自己的事件
export async function getMyEvents(userId:string){

    const q = query(
        collection(db,"events"),
        where("ownerId","==",userId),
        orderBy("startTime","asc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    }));

}