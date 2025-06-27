'use client';
import useTasks from "@/lib/useTasks";
import { CheckCheck, CircleDashed, Clock3, Logs } from "lucide-react";

const Overview = () => {
    const { tasks } = useTasks();
    const pendingTasks = tasks.filter(task => task.status.toLowerCase() === 'pending');
    const inprogressTasks = tasks.filter(task => task.status.toLowerCase() === 'inprogress');
    const completedTasks = tasks.filter(task => task.status.toLowerCase() === 'completed');

    return (
        <section className='h-[calc(100vh-206px)]'>
            <h3 className='text-2xl font-semibold'>Overview</h3>
            <div className='p-4 mt-8 h-full rounded-sm bg-[#F8F9FA]'>
                <div className='flex items-center justify-between gap-10'>
                    <div className='flex-1 rounded-sm p-4 bg-green-100/70'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-sm p-2 bg-green-400 text-white'><CheckCheck /></div>
                            <span>Completed tasks</span>
                        </div>
                        <h3 className='mt-6 mb-2 text-3xl font-bold'>{completedTasks.length ?? 0}</h3>
                        <span>Increased by 6 this week</span>
                    </div>
                    <div className='flex-1 rounded-sm p-4 bg-red-100/70'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-sm p-2 bg-red-400 text-white'><CircleDashed /></div>
                            <span>Incomplete tasks</span>
                        </div>
                        <h3 className='mt-6 mb-2 text-3xl font-bold'>{pendingTasks.length ?? 0}</h3>
                        <span>Decreased by 5 this week</span>
                    </div>
                    <div className='flex-1 rounded-sm p-4 bg-blue-100/70'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-sm p-2 bg-blue-400 text-white'><Clock3 /></div>
                            <span>Inprogress tasks</span>
                        </div>
                        <h3 className='mt-6 mb-2 text-3xl font-bold'>{inprogressTasks.length ?? 0}</h3>
                        <span>Increased by 3 this week</span>
                    </div>
                    <div className='flex-1 rounded-sm p-4 bg-orange-100/70'>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-sm p-2 bg-orange-400 text-white'><Logs /></div>
                            <span>Total tasks</span>
                        </div>
                        <h3 className='mt-6 mb-2 text-3xl font-bold'>{tasks.length ?? 0}</h3>
                        <span>Completion rate: 80%</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Overview;