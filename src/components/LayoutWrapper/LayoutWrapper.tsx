'use client'
import { FaRegBell } from "react-icons/fa";
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MdOutlineSettings } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='flex'>
            <DashboardMenu />
            <div className='flex-1'>
                <div className='w-full flex items-center justify-between px-8 py-4 border-b-2 border-[#F8F9FA]'>
                    <label htmlFor='search' className='flex items-center gap-2 w-1/3 px-[14px] py-[10px] group rounded-sm bg-[#F3F4F6] focus-within:border-black'>
                        <input
                            id='search'
                            name='search'
                            className='rounded-none w-full text-sm focus:outline-none'
                            placeholder="Search"
                            autoComplete='search'
                            // onChange={handleSearch}
                        />
                        <IoSearchOutline className='text-lg' />
                    </label>
                    <div className='flex items-center gap-4 text-2xl text-gray-500'>
                        <MdOutlineSettings />
                        <FaRegBell />
                        <Avatar className='w-10 h-10'>
                            <AvatarImage sizes='' src="https://github.com/leerob.png" alt="@leerob" />
                            <AvatarFallback>LR</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default LayoutWrapper;