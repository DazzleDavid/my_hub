import {
onAuthStateChanged
}
from "firebase/auth";


import {
auth
}
from "../services/firebase/config";


import {
useAuthStore
}
from "../store/authStore";



export function useAuthListener(){


const setUser =
useAuthStore(
state=>state.setUser
);



const setLoading =
useAuthStore(
state=>state.setLoading
);



onAuthStateChanged(
auth,
(user)=>{


    setUser(user);


    setLoading(false);


});


}