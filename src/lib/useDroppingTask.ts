import { useDrop } from "react-dnd";

interface DroppingTaskProps {
    handleTaskStatusChange: (id: string, status: string) => void;
}

const useDroppingTask = ({ handleTaskStatusChange }: DroppingTaskProps) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'TASK',
        drop: (item: { id: string, status: string }) => {
            if (item.status !== item.status) {
                handleTaskStatusChange(item.id, item.status)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }))

    return { isOver, dropRef }
};

export default useDroppingTask;