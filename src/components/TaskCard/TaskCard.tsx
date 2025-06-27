import { IoMdArrowUp } from "react-icons/io";
import { Button } from "../ui/button";
import { FaRegEye } from "react-icons/fa6";
import { SquarePen, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TaskType } from "@/types/types";
import StatusBadge from "../StatusBadge/StatusBadge";
import Link from "next/link";

type TaskPropType = {
    task: TaskType;
};

const TaskCard = ({ task }: TaskPropType) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }

    return (
        < div className='p-4 space-y-3 text-base font-normal rounded-sm shadow-sm bg-white' >
            <div className='flex items-center justify-between'>
                <h4 className='text-lg'>{task.title}</h4>
                <div className='flex items-center gap-2 text-red-500'>
                    <IoMdArrowUp size={20} />
                    <span>High</span>
                </div>
            </div>
            <StatusBadge status={task.status} />
            <div className='space-x-3'>
                <span>Due Date:</span>
                <span>{new Date(task.due_date).toLocaleDateString('en-us', options)}</span>
            </div>
            <div className='flex items-center justify-between'>
                <div className='space-x-2'>
                    <Button variant='ghost' size="icon" className="size-8 rounded-sm cursor-pointer" asChild>
                        <Link href={`/viewtask/${task.id}`}><FaRegEye /></Link>
                    </Button>
                    <Button variant='ghost' size="icon" className="size-8 rounded-sm cursor-pointer">
                        <SquarePen />
                    </Button>
                    <Button variant='ghost' size="icon" className="size-8 rounded-sm cursor-pointer">
                        <Trash2 />
                    </Button>
                </div>
                <Avatar>
                    <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                    <AvatarFallback>LR</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default TaskCard;