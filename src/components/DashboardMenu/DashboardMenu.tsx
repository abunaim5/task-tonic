// 'use client';
import Link from "next/link";
import { MdOutlineInsertChart, MdOutlineSettings } from "react-icons/md";
import { CircleUser, Inbox, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

const DashboardMenu = () => {
    const linkCls = 'flex items-center gap-[5px] px-[15px] py-[10px] rounded-sm hover:text-white hover:bg-[#3E3EE0] transition-all duration-[400ms]'
    const pathname = usePathname();

    return (
        <nav>
            <div className='w-64 h-screen p-4 bg-[#F8F9FA]'>
                <h1 className='text-2xl font-bold'>TaskTonic</h1>
                <div className='mt-10 space-y-2'>
                    <Link href='/' className={`${linkCls} ${pathname === '/' ? 'text-white bg-[#3E3EE0] font-semibold' : ''}`}>
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href='/' className={`${linkCls} `}>
                        <CircleUser size={18} />
                        <span>Profile</span>
                    </Link>
                    <Link href='/' className={`${linkCls} `}>
                        <MdOutlineInsertChart size={18} />
                        <span>Report</span>
                    </Link>
                    <Link href='/' className={`${linkCls} `}>
                        <Inbox size={18} />
                        <span>Inbox</span>
                    </Link>
                    <Link href='/' className={`${linkCls} `}>
                        <MdOutlineSettings size={18} />
                        <span>Setting</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default DashboardMenu;