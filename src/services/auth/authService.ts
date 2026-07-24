import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut
}
from "firebase/auth";


import {
    auth
}
from "../firebase/config";


import {
    createUserDocument
}
from "../user/userService";



const provider =
new GoogleAuthProvider();




export async function loginWithGoogle(){


    const result =
    await signInWithPopup(
        auth,
        provider
    );


    const user =
    result.user;



    await createUserDocument(user);



    return user;

}




export async function logout(){

    await signOut(auth);

}