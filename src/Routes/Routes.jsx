import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Login from "../Pages/Authentication/Login"
import SignUp from "../Pages/Authentication/SignUp"
import CompletedTask from "../Pages/CompletedTask"
import Home from "../Pages/Home"
import MyTask from "../Pages/MyTask"
import UpdateTask from "../Pages/UpdateTask"
import PrivateRoute from "./PrivateRoute"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Home></Home></PrivateRoute>
            },
            {
                path: '/mytasks',
                element: <PrivateRoute><MyTask></MyTask></PrivateRoute>
            },
            {
                path: '/completedtasks',
                element: <PrivateRoute><CompletedTask></CompletedTask></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/update/:id',
                element: <UpdateTask></UpdateTask>,
                loader: ({ params }) => fetch(`https://simple-task-management-server-side.vercel.app/update/${params.id}`)
            }
        ]
    }
])