import getAxiosPublic from './axiosPublic';
import { useQuery } from '@tanstack/react-query';

const useTasks = () => {
    const axiosPublic = getAxiosPublic();

    const { isLoading: isTasksLoading, data: tasks = [] } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tasks');
            return res.data;
        }
    });

    return [tasks, isTasksLoading]
};

export default useTasks;