import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ellipsis, Plus } from "lucide-react";
import { CiFilter } from "react-icons/ci";

export default function Home() {

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
            <SelectTrigger className="w-36 rounded-sm cursor-pointer">
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
        <div className='flex-1 h-full p-3 rounded-sm bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-cyan-400'>2</div>
            <h1>TO DO</h1>
          </div>
        </div>
        <div className='flex-1 h-full p-3 rounded-sm bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-orange-400'>2</div>
            <h1>IN PROGRESS</h1>
          </div>
        </div>
        <div className='flex-1 h-full p-3 rounded-sm bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-blue-400'>2</div>
            <h1>REVIEW</h1>
          </div>
        </div>
        <div className='flex-1 h-full p-3 rounded-sm bg-[#F8F9FA]'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-green-400'>2</div>
            <h1>DONE</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
