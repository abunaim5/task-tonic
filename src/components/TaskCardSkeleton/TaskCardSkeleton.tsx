import { Skeleton } from "../ui/skeleton";

const TaskCardSkeleton = () => {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-white" />
            <Skeleton className="h-4 w-full bg-white" />
            <Skeleton className="h-4 w-full bg-white" />
            <div className='flex items-center justify-between gap-4'>
                <Skeleton className="h-8 flex-1 bg-white" />
                <Skeleton className="h-8 w-8 rounded-full bg-white" />
            </div>
        </div>
    );
};

export default TaskCardSkeleton;