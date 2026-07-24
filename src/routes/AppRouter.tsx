import {
    BrowserRouter,
    Routes,
    Route
}
from "react-router-dom";


import Login from "@/pages/Login/Login";

import Dashboard from "@/pages/Dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";


export default function AppRouter(){


return (

<BrowserRouter>


<Routes>

<Route
path="/"
element={
<Navigate to="/login" replace/>
}
/>

<Route
path="/login"
element={<Login/>}
/>



<Route
path="/dashboard"
element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}
/>


</Routes>


</BrowserRouter>

)

}