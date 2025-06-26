'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useTasks from "@/lib/useTasks";
import { Ellipsis, Plus, SquarePen, Trash2 } from "lucide-react";
import { CiFilter } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { IoMdArrowUp } from "react-icons/io";

export default function Home() {
  const [tasks, isTasksLoading] = useTasks();
  console.log(tasks)

  return (
    <section className='h-[calc(100vh-206px)]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-semibold'>General</h3>
        <div className='flex items-center gap-6'>
          <button className='flex items-center gap-[5px] px-3 py-2 rounded-sm text-sm text-white bg-[#3E3EE0] hover:bg-blue-500 transition-all duration-[400ms] cursor-pointer'>
            <Plus size={18} />
            <span>Add Task</span>
          </button>
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
        <div className='flex-1 h-full p-4 rounded-sm bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-cyan-400'>2</div>
            <h1>TO DO</h1>
          </div>
          {/* task cards */}
          <div className='mt-4'>
            {/* card */}
            <div className='p-4 space-y-3 text-base font-normal rounded-sm shadow-sm bg-white'>
              <div className='flex items-center justify-between'>
                <h4 className='text-lg'>Task Name</h4>
                <div className='flex items-center gap-2 text-red-500'>
                  <IoMdArrowUp size={20} />
                  <span>High</span>
                </div>
              </div>
              <Badge>Pending</Badge>
              <div className='space-x-3'>
                <span>Due date:</span>
                <span>6/11/2025</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='space-x-2'>
                  <Button variant='ghost' size="icon" className="size-8 rounded-sm cursor-pointer">
                    <FaRegEye />
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
          </div>
        </div>
        <div className='flex-1 h-full p-4 rounded-sm bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-orange-400'>2</div>
            <h1>IN PROGRESS</h1>
          </div>
        </div>
        <div className='flex-1 h-full p-4 rounded-sm bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-blue-400'>2</div>
            <h1>REVIEW</h1>
          </div>
        </div>
        <div className='flex-1 h-full p-4 rounded-sm bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-green-400'>2</div>
            <h1>DONE</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
