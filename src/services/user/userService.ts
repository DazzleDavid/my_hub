import {
    doc,
    setDoc,
    getDoc
}
from "firebase/firestore";


import {db}
from "../firebase/config";


import type {
    User
}
from "firebase/auth";



export async function createUserDocument(
    user:User
){

    const userRef =
    doc(
        db,
        "users",
        user.uid
    );


    const snapshot =
    await getDoc(userRef);



    // 已存在，不重新建立
    if(snapshot.exists()){

        return;

    }



    await setDoc(
        userRef,
        {

            uid:user.uid,

            name:user.displayName ?? "",

            email:user.email ?? "",

            photoURL:user.photoURL ?? "",


            createdAt:
            new Date()


        }
    );

}