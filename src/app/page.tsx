'use client';
import TaskCard from "@/components/TaskCard/TaskCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import useTasks from "@/lib/useTasks";
import { TaskType } from "@/types/types";
import { Ellipsis, Plus } from "lucide-react";
import Link from "next/link";
import { CiFilter } from "react-icons/ci";

export default function Home() {
  const { tasks, isLoading } = useTasks();
  const pendingTasks = tasks.filter(task => task.status.toLowerCase() === 'pending');
  const inprogressTasks = tasks.filter(task => task.status.toLowerCase() === 'inprogress');
  const reviewTasks = tasks.filter(task => task.status.toLowerCase() === 'review');
  const completedTasks = tasks.filter(task => task.status.toLowerCase() === 'completed');

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
              isLoading ? (<div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full bg-white" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] bg-white" />
                  <Skeleton className="h-4 w-[200px] bg-white" />
                </div>
              </div>) : pendingTasks.map((task: TaskType, idx) => <TaskCard key={idx} task={task} />)
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
              isLoading ? (<div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>) : inprogressTasks.map((task: TaskType, idx) => <TaskCard key={idx} task={task} />)
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
              isLoading ? (<div>Loading...</div>) : reviewTasks.map((task: TaskType, idx) => <TaskCard key={idx} task={task} />)
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
              isLoading ? (<div>Loading...</div>) : completedTasks.map((task: TaskType, idx) => <TaskCard key={idx} task={task} />)
            }
          </div>
        </div>
      </div>
    </section>
  );
}
