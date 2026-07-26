import {useState} from "react";
import {useAuthStore} from "@/store/authStore";
import {createEvent} from "@/services/event/eventService";

export default function EventForm(){

const user = useAuthStore(state=>state.user);

const [form,setForm] = useState({
    title:"",
    description:"",
    startTime:"",
    endTime:"",
    location:""
});

function handleChange(e:any){
    setForm({
        ...form,
        [e.target.name]:e.target.value
    });
}

async function handleSubmit(e:any){
    e.preventDefault();

    if(!user) return;

    await createEvent({
        ...form,
        ownerId:user.uid
    });

    alert("新增成功");

    setForm({
        title:"",
        description:"",
        startTime:"",
        endTime:"",
        location:""
    });
}

return (
<form onSubmit={handleSubmit} className="space-y-3 mt-5">

<input
name="title"
value={form.title}
onChange={handleChange}
placeholder="標題"
className="border p-2 rounded w-full"
/>

<textarea
name="description"
value={form.description}
onChange={handleChange}
placeholder="描述"
className="border p-2 rounded w-full"
/>

<input
type="datetime-local"
name="startTime"
value={form.startTime}
onChange={handleChange}
className="border p-2 rounded w-full"
/>

<input
type="datetime-local"
name="endTime"
value={form.endTime}
onChange={handleChange}
className="border p-2 rounded w-full"
/>

<input
name="location"
value={form.location}
onChange={handleChange}
placeholder="地點"
className="border p-2 rounded w-full"
/>

<button
type="submit"
className="px-4 py-2 rounded bg-black text-white"
>
新增行程
</button>

</form>
);

}