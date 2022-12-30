import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthProvider';

const CompletedTask = () => {
    const { user } = useContext(AuthContext);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        fetch(`https://simple-task-management-server-side.vercel.app/completedtasks?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setCompletedTasks(data))
    }, []);

    const handleDeleteBtn = (id) => {
        console.log("delete btn clicked", id);
        const agree = window.confirm("do you want to delete thisAre you sure you want to delete this?");
        if (agree) {
            // console.log("delete this with id ", user._id);
            fetch(`https://adminui-app-server.vercel.app/task/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    const remainingTask = completedTasks.filter(
                        (singleTask) => singleTask._id !== id
                    );
                    setCompletedTasks(remainingTask);
                });
        }
    };

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
                            Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        completedTasks?.map((completedTask, i) =>
                            <tr key={completedTask._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4 w-4">
                                    <div className="flex items-center">
                                        {i + 1}
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={completedTask.image} alt="" />
                                </th>
                                <td className="py-4 px-6">
                                    {completedTask.name}
                                </td>
                                <td className="py-4 px-6">
                                    <button onClick={() => handleDeleteBtn(completedTask._id)} type="button" className="py-2 px-3 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className='flex justify-center items-center my-5'>
                <Link to='/mytasks'> <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-3 ">Not Completed</button></Link>
            </div>
        </div>
    );
};

export default CompletedTask;