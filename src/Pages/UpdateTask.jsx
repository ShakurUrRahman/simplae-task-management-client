import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
    const storedTask = useLoaderData();
    const [updatedTask, setUpdatedTask] = useState(storedTask)
    const navigate = useNavigate();

    const handleUpdateTask = event => {
        event.preventDefault()
        // console.log(updatedTask)
        fetch(`https://simple-task-management-server-side.vercel.app/mytask/${storedTask._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success("Task updated successfully")
                    navigate('/mytasks');
                }
            })
    }
    const handleTaskChange = event => {
        const value = event.target.value;
        const field = event.target.name;
        const newTask = { ...updatedTask }
        newTask[field] = value;
        setUpdatedTask(newTask);
    }

    return (
        <div className='mt-5'>
            <form onSubmit={handleUpdateTask} className="flex justify-center items-center flex-col gap-5">
                <input onChange={handleTaskChange} defaultValue={storedTask.name} type="text" name='name' required className="relative block w-36 appearance-none rounded-none rounded-b-md border border-gray-30
                0 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />

                <button type="submit" className="group relative w-36 flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;