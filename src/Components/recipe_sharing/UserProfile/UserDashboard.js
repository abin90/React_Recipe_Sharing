import React from "react";
import Navbar from "../Navbar";
import Userdetails from "./Userdetails";
import UserRecipes from "./UserRecipes";

function UserDashboard() {
    return (
      <>
      <Navbar /><br/>
      <Userdetails/><br/>
      <UserRecipes/>
      
      </>
    );
  }
  
  export default UserDashboard;