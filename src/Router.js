import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginForm from "./Components/auth/Login/LoginForm";
import SignupForm from "./Components/auth/Register/SignupForm";
import AdminDashboard from "./Components/recipe_sharing/Admin/AdminDashboard";
import AdminRecipe from "./Components/recipe_sharing/Admin/AdminRecipe";
import UserDashboard from "./Components/recipe_sharing/UserProfile/UserDashboard";
import EditUserdetails from "./Components/recipe_sharing/UserProfile/EditUserdetails";
import Activityfeed from "./Components/recipe_sharing/Activityfeed";
import CreateRecipe from "./Components/recipe_sharing/CreateRecipe";
import EditRecipe from "./Components/recipe_sharing/EditRecipe";



const Router=createBrowserRouter([
    {path: '/', element: <App />},
    {path: '/register', element: <SignupForm />},
    {path: '/login', element: <LoginForm />},
    {path: '/admin', element: <AdminDashboard />},
    {path: '/admin/:userId/recipes', element: <AdminRecipe />},
    {path: '/user/userdashboard', element: <UserDashboard />},
    {path: '/user/edit/profile', element: <EditUserdetails />},
    {path: '/edit/:recipeId/recipe', element: <EditRecipe />},
    {path: '/create/recipe', element: <CreateRecipe />},
    {path: '/activity', element:<Activityfeed />},
])
export default Router;