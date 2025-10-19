import { TaskType } from './../types/types';
import getAxiosPublic from './axiosPublic';
import { useQuery } from '@tanstack/react-query';

const useTasks = () => {
    const axiosPublic = getAxiosPublic();

    const { isLoading, data, refetch } = useQuery<TaskType[]>({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tasks');
            return res.data;
        }
    });

    const tasks = data ?? []

    return { tasks, isLoading, refetch };
};

export default useTasks;