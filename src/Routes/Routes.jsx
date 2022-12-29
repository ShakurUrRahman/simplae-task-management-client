import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Login from "../Pages/Authentication/Login"
import SignUp from "../Pages/Authentication/SignUp"
import CompletedTask from "../Pages/CompletedTask"
import Home from "../Pages/Home"
import MyTask from "../Pages/MyTask"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/mytasks',
                element: <MyTask></MyTask>
            },
            {
                path: '/completedtasks',
                element: <CompletedTask></CompletedTask>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
])