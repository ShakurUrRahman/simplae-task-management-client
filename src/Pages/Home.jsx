import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Home = () => {
    const { register, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostKey);

    const handleAddTask = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const task = {
                        name: data.taskName,
                        image: imgData.data.url
                    }
                    fetch('http://localhost:5000/mytask', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`Task successfully added`)
                        })
                }
            })

    }

    return (
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6'>
            <div className="w-full max-w-md space-y-8">
                <div className='text-center text-3xl font-bold text-gray-900'>
                    <h2 className='text-2xl my-5'>Here I add my task</h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit(handleAddTask)}>
                    <div>
                        <input type="text" placeholder='Task Name' {...register('taskName', {
                            required: "Task name is required"
                        })} className="flex w-full items-center justify-center border border-b-4 p-3" />
                    </div>
                    <br />
                    <div>
                        <input type="file" {...register('image', {
                            required: "Picture is required"
                        })} />
                    </div>
                    <button className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
                        <input className='' value='Add Task' type="submit" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;