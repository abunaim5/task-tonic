'use client'
import getAxiosPublic from "@/lib/axiosPublic";
import { TaskListType, TaskType } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { use, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
    title: string;
    status: string;
    description: string;
    date: string;
};

type TaskId = {
    params: Promise<{ id: string }>
}

const EditTask = ({ params }: TaskId) => {
    const iClass = `w-full rounded-sm px-[14px] py-[10px] mt-2 border focus:outline-none`
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
    const axiosPublic = getAxiosPublic();
    const { id } = use(params);

    const { isLoading, data: task } = useQuery<TaskType>({
        queryKey: ['task'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/${id}`);
            return res.data;
        }
    });

    const { isSuccess, mutate } = useMutation({
        mutationFn: async (taskData: TaskListType) => {
            const res = await axiosPublic.put(`/tasks/${task?.id}`, taskData);
            return res;
        }
    });

    useEffect(() => {
        reset({
            title: task?.title,
            status: task?.status.toLowerCase(),
            description: task?.description,
            date: task?.due_date
        });
    }, [task, reset]);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
        const updateTask: TaskListType = {
            title: data.title,
            status: data.status,
            description: data.description,
            due_date: data.date
        }
        mutate(updateTask);
        // toast.success('New task added to the board!');
    };

    return (
        <section className='h-[calc(100vh-206px)]'>
            <h3 className='text-2xl font-semibold'>Update Task</h3>
            <form className='w-full content-center space-y-4 p-4 mt-8 h-full rounded-sm bg-[#F8F9FA]' onSubmit={handleSubmit(onSubmit)}>
                <div className='w-1/2 mx-auto space-y-4 p-4 shadow-sm rounded-sm bg-white'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='title'>Title <span className='text-red-500'>*</span></label>
                        <input
                            id='title'
                            className={`${iClass} ${errors.title ? 'border-red-500' : ''} ${errors.title ? 'focus:border-red-500' : 'focus:border-black'}`}
                            type='text'
                            {...register("title", { required: 'Please input task title!' })}
                            aria-invalid={errors.title ? 'true' : 'false'}
                            placeholder='title'
                            autoComplete='title'
                        />
                        {errors.title && (
                            <p className='text-red-500' role="alert">{errors.title.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='date'>Due Date <span className='text-red-500'>*</span></label>
                        <input
                            id='date'
                            className={`${iClass} ${errors.date ? 'border-red-500' : ''} ${errors.date ? 'focus:border-red-500' : 'focus:border-black'}`}
                            type='date'
                            {...register("date", { required: 'Please input due date!' })}
                            aria-invalid={errors.date ? 'true' : 'false'}
                            placeholder='https://'
                            autoComplete='date'
                        />
                        {errors.date && (
                            <p className='text-red-500' role="alert">{errors.date.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='status'>Status <span className='text-red-500'>*</span></label>
                        <select
                            id='status'
                            className={`${iClass} ${errors.status ? 'border-red-500' : ''} ${errors.status ? 'focus:border-red-500' : 'focus:border-black'}`}
                            {...register("status", { required: 'Please input product status!' })}
                            aria-invalid={errors.status ? 'true' : 'false'}
                            autoComplete='status'
                        >
                            <option value='pending'>Pending</option>
                            <option value='inprogress'>Inprogress</option>
                            <option value='review'>Review</option>
                            <option value='completed'>Completed</option>
                        </select>
                        {errors.status && (
                            <p className='text-red-500' role="alert">{errors.status.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='description'>Description <span className='text-red-500'>*</span></label>
                        <textarea
                            id='description'
                            className={`${iClass} ${errors.description ? 'border-red-500' : ''} ${errors.description ? 'focus:border-red-500' : 'focus:border-black'}`}

                            {...register("description", { required: 'Please input task description!' })}
                            aria-invalid={errors.description ? 'true' : 'false'}
                            placeholder='description'
                            autoComplete='description'
                        />
                        {errors.description && (
                            <p className='text-red-500' role="alert">{errors.description.message}</p>
                        )}
                    </div>
                    <input className='w-full cursor-pointer py-[10px] rounded-sm bg-black hover:bg-gray-900 text-white' type="submit" value='Submit' />
                </div>
            </form>
        </section>
    );
};

export default EditTask;