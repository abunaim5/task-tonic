'use client';
import { useDrop } from "react-dnd";

interface UseDropTaskProps {
    status: string;
    onDropTask: (taskId: string, newStatus: string) => void;
}

const useDroppingTask = ({ status, onDropTask }: UseDropTaskProps) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'TASK',
        drop: (item: { id: string, status: string }) => {
            if (item.status !== status) {
                onDropTask(item.id, status)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }))

    return { isOver, dropRef }
};

export default useDroppingTask;