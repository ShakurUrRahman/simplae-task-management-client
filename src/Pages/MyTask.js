import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const MyTask = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/mytask')
            .then(res => res.json())
            .then(data => setTasks(data))
    }, []);

    const handleDeleteTask = task => {
        const proceed = window.confirm('Are you sure you want to delete this task?')
        if (proceed) {
            fetch(`http://localhost:5000/mytask/${task._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        // refetch();
                        toast.success(`${task.name} deleted successfully`)
                    }
                })
        }
    }
    return (

        <div className="shadow-md sm:rounded-lg lg:mx-20">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            Serial
                        </th>
                        <th scope="col" className="p-4">
                            Picture
                        </th>
                        <th scope="col" className="p-4">
                            Name                        </th>
                        <th scope="col" className="py-3 px-6">
                            Update
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Complete
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks?.map((task, i) =>
                            <tr key={task._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4 w-4">
                                    <div className="flex items-center">
                                        {i + 1}
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={task.image} alt="" />
                                </th>
                                <td className="py-4 px-6">
                                    {task.name}
                                </td>
                                <td className="py-4 px-6">
                                    <button type="button" className="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>

                                </td>
                                <td className="py-4 px-6">
                                    <button type="button" className="py-2 px-3 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Complete</button>
                                </td>
                                <td className="py-4 px-6">
                                    <button onClick={() => handleDeleteTask(task)} type="button" className="py-2 px-3 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>


    );
};

export default MyTask;