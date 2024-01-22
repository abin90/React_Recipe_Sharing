import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import Eachrecipe from './Eachrecipe';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



function AdminRecipe(){
    const [recipes, setRecipes] = useState([]);
    const {userId}=useParams();
    var user = useSelector(store=>store.auth.user);
    function fetchRecipes(){
        if (!user || !user.token) {
            // If user or user.token is not defined, do not proceed with the request
            return;
        }
        const headers = {
            'Authorization': `Bearer ${user.token}`
        };
        axios.get(`http://127.0.0.1:8000/api/${userId}/recipes`,{headers})
        .then(response=>{
            setRecipes(response.data);
        })
    };
    useEffect(()=>{
        fetchRecipes()
    },[]);
    return(
        <><Navbar/>
        <br/>
        <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3><strong>Recipes</strong></h3>
                    </div>
                </div>
                <div className="row">
                    {recipes.map(recipe => (
                        <Eachrecipe key={recipe.id} recipe={recipe} refresh={fetchRecipes} />
                    ))}
                </div>
            </div>
        </>
    )
}
export default AdminRecipe;