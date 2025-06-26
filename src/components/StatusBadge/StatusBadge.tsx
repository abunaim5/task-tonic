import { Badge } from "../ui/badge";

const StatusBadge = ({ status }: { status: string }) => {
    const colorMap: Record<string, string> = {
        pending: 'bg-cyan-200 text-cyan-800 hover:bg-cyan-300',
        inprogress: 'bg-orange-200 text-orange-800 hover:bg-orange-300',
        'in-progress': 'bg-orange-200 text-orange-800 hover:bg-orange-300',
        'in_progress': 'bg-orange-200 text-orange-800 hover:bg-orange-300',
        review: 'bg-blue-200 text-blue-800 hover:bg-blue-300',
        completed: 'bg-green-200 text-green-800 hover:bg-green-300'
    };

    return (
        <Badge className={`${colorMap[status.toLowerCase()] || 'bg-gray-200 text-gray-800'} max-w-fit rounded-sm cursor-pointer`}>
            {status.toLowerCase()}
        </Badge>
    );
};

export default StatusBadge;