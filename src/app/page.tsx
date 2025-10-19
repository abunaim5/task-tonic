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
import { useMemo, useState } from "react";
import useDroppingTask from "@/lib/useDropTask";
import { cn } from "@/lib/utils";

export default function Home() {
  const { tasks, isLoading, refetch } = useTasks();
  const [sortDate, setSortDate] = useState<'asc' | 'desc'>('asc');
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const dateA = new Date(a.due_date).getTime();
      const dateB = new Date(b.due_date).getTime();
      return sortDate === 'asc' ? dateA - dateB : dateB - dateA;
    })
  }, [tasks, sortDate]);

  const pendingTasks = sortedTasks.filter(task => task.status.toLowerCase() === 'pending');
  const inprogressTasks = sortedTasks.filter(task => task.status.toLowerCase() === 'inprogress');
  const reviewTasks = sortedTasks.filter(task => task.status.toLowerCase() === 'review');
  const completedTasks = sortedTasks.filter(task => task.status.toLowerCase() === 'completed');
  const axiosPublic = getAxiosPublic();

  // drag and drop logic for task progress change
  const handleTaskStatusChange = async (taskId: string, newStatus: string) => {
    const res = await axiosPublic.put(`/tasks/${taskId}`, { status: newStatus });
    if (res.status === 200) {
      toast.success(`Task moved to ${newStatus}`);
      refetch();
    }
  }
  const { isOver: isOverPending, dropRef: dropPending } = useDroppingTask({
    status: 'pending',
    onDropTask: handleTaskStatusChange
  });
  const { isOver: isOverInprogress, dropRef: dropInprogress } = useDroppingTask({
    status: 'inprogress',
    onDropTask: handleTaskStatusChange
  });
  const { isOver: isOverReview, dropRef: dropReview } = useDroppingTask({
    status: 'review',
    onDropTask: handleTaskStatusChange
  });
  const { isOver: isOverCompleted, dropRef: dropCompleted } = useDroppingTask({
    status: 'completed',
    onDropTask: handleTaskStatusChange
  });

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
          <Select value={sortDate} onValueChange={(value) => setSortDate(value as 'asc' | 'desc')}>
            <SelectTrigger className="w-fit rounded-sm cursor-pointer shadow-none">
              <SelectValue placeholder="Sort by Due Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Earliest First</SelectItem>
              <SelectItem value="desc">Latest First</SelectItem>
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
          <div ref={el => { dropPending(el) }} className={cn('h-full mt-4 space-y-4 scroll-smooth overflow-y-auto whitespace-nowrap snap-y snap-mandatory scrollbar-hide rounded-sm', isOverPending ? 'bg-cyan-100' : '')}>
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
          <div ref={el => { dropInprogress(el) }} className={cn('h-full mt-4 space-y-4 scroll-smooth overflow-y-auto whitespace-nowrap snap-y snap-mandatory scrollbar-hide rounded-sm', isOverInprogress ? 'bg-orange-100' : '')}>
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
          <div ref={el => { dropReview(el) }} className={cn('h-full mt-4 space-y-4 scroll-smooth overflow-y-auto whitespace-nowrap snap-y snap-mandatory scrollbar-hide rounded-sm', isOverReview ? 'bg-blue-100' : '')}>
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
          <div ref={el => { dropCompleted(el) }} className={cn('h-full mt-4 space-y-4 scroll-smooth overflow-y-auto whitespace-nowrap snap-y snap-mandatory scrollbar-hide rounded-sm', isOverCompleted ? 'bg-green-100' : '')}>
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
