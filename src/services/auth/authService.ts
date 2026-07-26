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
    createUserProfile
}
from "../user/userService";



const provider =
new GoogleAuthProvider();


export async function loginWithGoogle(){

    const result = await signInWithPopup(
        auth,
        provider
    );

    console.log("Firebase User:", result.user);

    await createUserProfile(result.user);

    return result.user;
}

export async function logout(){
    await signOut(auth);
}