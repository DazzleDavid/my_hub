import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/services/auth/authService";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const navigate = useNavigate();

    async function handleLogin(){
        console.log("開始登入");

        try{
            await loginWithGoogle();
            navigate("/dashboard");
        }
        catch(error){
            console.error("登入失敗:", error);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="space-y-6 text-center">

                <h1 className="text-4xl font-bold">
                    LifeOS
                </h1>


                <p className="text-gray-500">
                    Personal Life Management System
                </p>


                <Button
                    onClick={handleLogin}
                >
                    Google Login
                </Button>


            </div>


        </div>
    )

}