import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/services/auth/authService";
import { useNavigate } from "react-router-dom";
import { getMyEvents } from "@/services/event/eventService";
import EventForm from "@/components/EventForm";


export default function Dashboard() {

    const navigate = useNavigate();

    const user = useAuthStore(
        state => state.user
    );

    const [events, setEvents] = useState<any[]>([]);


    async function handleLogout() {

        await logout();

        navigate("/");

    }


    useEffect(() => {

        async function loadEvents() {

            if (!user) {
                return;
            }

            const data =
                await getMyEvents(
                    user.uid
                );

            setEvents(data);

        }


        loadEvents();

    }, [user]);


    return (
        <div>

            <h1>
                Dashboard
            </h1>


            <p>
                {user?.displayName}
            </p>


            <p>
                {user?.email}
            </p>

            <p>
                UID:{user?.uid}
            </p>

            <h2 className="mt-8 text-xl font-bold">
                我的行程
            </h2>


            <div className="mt-4 space-y-3">

                {
                    events.map(event => (

                        <div
                            key={event.id}
                            className="border rounded p-4"
                        >

                            <h3 className="font-bold">
                                {event.title}
                            </h3>

                            <p>
                                {event.description}
                            </p>

                            <p>
                                開始：{event.startTime?.toDate().toLocaleString()}
                            </p>

                            <p>
                                結束：{event.endTime?.toDate().toLocaleString()}
                            </p>

                            <p>
                                地點：{event.location}
                            </p>

                        </div>

                    ))
                }

            </div>


            <EventForm />


            <button
                onClick={handleLogout}
                className="mt-5 px-4 py-2 rounded bg-black text-white"
            >
                Logout
            </button>


        </div>
    );

}