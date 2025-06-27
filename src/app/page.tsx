'use client';
import TaskCard from "@/components/TaskCard/TaskCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import getAxiosPublic from "@/lib/axiosPublic";
import useTasks from "@/lib/useTasks";
import { TaskType } from "@/types/types";
import { Ellipsis, Plus } from "lucide-react";
import Link from "next/link";
import { CiFilter } from "react-icons/ci";
import toast from "react-hot-toast";
import TaskCardSkeleton from "@/components/TaskCardSkeleton/TaskCardSkeleton";

export default function Home() {
  const { tasks, isLoading, refetch } = useTasks();
  const pendingTasks = tasks.filter(task => task.status.toLowerCase() === 'pending');
  const inprogressTasks = tasks.filter(task => task.status.toLowerCase() === 'inprogress');
  const reviewTasks = tasks.filter(task => task.status.toLowerCase() === 'review');
  const completedTasks = tasks.filter(task => task.status.toLowerCase() === 'completed');
  const axiosPublic = getAxiosPublic();

  const handleDeleteTask = async (taskId: string) => {
    const res = await axiosPublic.delete(`/tasks/${taskId}`);
    if (res.status === 200) {
      toast.success('Task has been deleted.');
      await refetch();
    }
  };

  const handleWarning = (taskId: string) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md  bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col items-center justify-center gap-4 p-4 ring-1 ring-[#F8F9FA]`}>
        <div className='text-center'>
          <p className="text-lg font-semibold text-gray-900">Are you sure?</p>
          <p className="mt-1 text-sm text-gray-500">You won&apos;t be able to revert this!</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => { handleDeleteTask(taskId); toast.dismiss(t.id) }}
            className="max-w-fit text-sm transform transition-all duration-500 text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-sm cursor-pointer"
          >
            Yes, delete it!
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="max-w-fit text-sm transform transition-all duration-500 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    ))
  }

  return (
    <section className='h-[calc(100vh-206px)]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-semibold'>General</h3>
        <div className='flex items-center gap-6'>
          <Link href='/addtask' className='flex items-center gap-[5px] px-3 py-2 rounded-sm text-sm text-white bg-[#3E3EE0] hover:bg-blue-500 transition-all duration-[400ms] cursor-pointer'>
            <Plus size={18} />
            <span>Add Task</span>
          </Link>
          <Select>
            <SelectTrigger className="w-36 rounded-sm cursor-pointer shadow-none">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectContent>
          </Select>
          <div className='flex items-center gap-[2px] text-xl hover:text-[#3E3EE0] cursor-pointer'>
            <CiFilter />
            <h4 className='text-base'>Filter</h4>
          </div>
          <Ellipsis className='cursor-pointer' />
        </div>
      </div>
      <div className='flex items-center gap-5 justify-between h-full mt-8 text-lg font-semibold'>
        <div className='flex-1 h-full p-4 rounded-sm overflow-hidden bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-cyan-400'>{pendingTasks.length ?? 0}</div>
            <h1>TO DO</h1>
          </div>
          {/* task cards */}
          <div className='max-h-full mt-4 space-y-4 scroll-smooth overflow-y-auto whitespace-nowrap snap-y snap-mandatory scrollbar-hide'>
            {
              isLoading ? (<div className='space-y-6'>
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
              </div>) : pendingTasks.map((task: TaskType, idx) => <TaskCard key={idx} task={task} handleWarning={handleWarning} />)
            }
          </div>
        </div>
        <div className='flex-1 h-full p-4 rounded-sm overflow-hidden bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-orange-400'>{inprogressTasks.length ?? 0}</div>
            <h1>IN PROGRESS</h1>
          </div>
          {/* task cards */}
          <div className='max-h-full mt-4 space-y-4 scroll-smooth overflow-y-auto whitespace-nowrap snap-y snap-mandatory scrollbar-hide'>
            {
              isLoading ? (<div className='space-y-6'>
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
              </div>) : inprogressTasks.map((task: TaskType, idx) => <TaskCard key={idx} task={task} handleWarning={handleWarning} />)
            }
          </div>
        </div>
        <div className='flex-1 h-full p-4 rounded-sm overflow-hidden bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-blue-400'>{reviewTasks.length ?? 0}</div>
            <h1>REVIEW</h1>
          </div>
          {/* task cards */}
          <div className='max-h-full mt-4 space-y-4 scroll-smooth overflow-y-auto whitespace-nowrap snap-y snap-mandatory scrollbar-hide'>
            {
              isLoading ? (<div className='space-y-6'>
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
              </div>) : reviewTasks.map((task: TaskType, idx) => <TaskCard key={idx} task={task} handleWarning={handleWarning} />)
            }
          </div>
        </div>
        <div className='flex-1 h-full p-4 rounded-sm overflow-hidden bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-green-400'>{completedTasks.length ?? 0}</div>
            <h1>DONE</h1>
          </div>
          {/* task cards */}
          <div className='max-h-full mt-4 space-y-4 scroll-smooth overflow-y-auto whitespace-nowrap snap-y snap-mandatory scrollbar-hide'>
            {
              isLoading ? (<div className='space-y-6'>
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
              </div>) : completedTasks.map((task: TaskType, idx) => <TaskCard key={idx} task={task} handleWarning={handleWarning} />)
            }
          </div>
        </div>
      </div>
    </section>
  );
}
