'use client';
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import getAxiosPublic from "@/lib/axiosPublic";
import { TaskType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

type TaskId = {
    params: Promise<{ id: string }>
}

const ViewTask = ({ params }: TaskId) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
    const axiosPublic = getAxiosPublic();
    const { id } = use(params);

    const { isLoading, data: task } = useQuery<TaskType>({
        queryKey: ['task'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/${id}`);
            return res.data;
        }
    });

    return (
        <section className='h-[calc(100vh-206px)]'>
            <h3 className='text-2xl font-semibold'>Task Details</h3>
            <div className='p-4 mt-8 h-full content-center rounded-sm bg-[#F8F9FA]'>
                {
                    isLoading ? (<div className="w-3/4 mx-auto flex items-center space-x-4">
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-72 bg-white" />
                            <Skeleton className="h-4 w-32 bg-white" />
                            <Skeleton className="h-4 w-52 bg-white" />
                            <Skeleton className="h-36 w-[1144px] bg-white" />
                        </div>
                    </div>) : (<div className='w-3/4 mx-auto p-4 space-y-4 rounded-sm shadow-sm bg-white'>
                        <h2 className='text-5xl font-bold'>{task?.title}</h2>
                        <StatusBadge status={task?.status ?? ''} />
                        <div><span className='font-semibold'>Due Date:</span> <span>{new Date(task?.due_date ?? '').toLocaleDateString('en-us', options)}</span></div>
                        <p className='text-justify'>{task?.description}</p>
                    </div>)
                }
            </div>
        </section>
    );
};

export default ViewTask;