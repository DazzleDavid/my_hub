import {
useAuthStore
}
from "@/store/authStore";
import { logout } from "@/services/auth/authService";
import {useNavigate} from "react-router-dom";


export default function Dashboard(){

    const navigate = useNavigate();


const user =
useAuthStore(
state=>state.user
);

async function handleLogout(){

        await logout();

        navigate("/login");

    }

return (

<div>

<h1>
Dashboard
</h1>


<p>
{
user?.displayName
}
</p>


<p>
{
user?.email
}
</p>

<button
                onClick={handleLogout}
                className="
                mt-5
                px-4
                py-2
                rounded
                bg-black
                text-white
                "
            >
                Logout
            </button>


</div>

)

}