import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import "../auth/Login/LoginForm.css";

function CreateRecipe() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [time, setTime] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [tags, setTags] = useState('');
    var navigate = useNavigate();
    var user = useSelector(store=>store.auth.user);
   
    function addRecipe() {
        const headers = {
            'Authorization': `Bearer ${user.token}`
        };
        axios.post('http://127.0.0.1:8000/api/recipes/create',{
            title: title,
            ingredients: ingredients,
            steps: steps,
            cooking_time:time,
            difficulty_level:difficulty,
            tags:tags
        },{headers}).then(
                navigate('/user/userdashboard')
        );
    };
    return (<div>
        <Navbar />
        <div className="first-container">
            <div className="secondi-container"></div>
                <div className='thirdf-container'>
                    <form className="myform" action="">
                    <h1>Create Recipe</h1>
                    <div className="inputb" title='Recipe title'>
                        <input type="text" placeholder="Title" required
                        onInput={(event)=>setTitle(event.target.value)}/>
                    </div>
                    <div className="inputb">
                        <input type="text" placeholder="Ingredients" required 
                        onInput={(event)=>setIngredients(event.target.value)}/>
                    </div>
                    <div className="inputb">
                        <input type="text" placeholder="Steps" required
                        onInput={(event)=>setSteps(event.target.value)} />
                    </div>
                    <div className="inputb">
                        <input type="text" placeholder="Cooking time in minutes" required
                        onInput={(event)=>setTime(event.target.value)} />
                    </div>
                    <div className="inputb">
                        <input type="text" placeholder="Difficulty level: Easy, Medium or Difficult" required
                        onInput={(event)=>setDifficulty(event.target.value)} />
                    </div>
                    <div className="inputb">
                        <input type="text" placeholder="Tags" required
                        onInput={(event)=>setTags(event.target.value)} />
                    </div>
                    <button className="btn btn-primary" onClick={addRecipe}>Add Recipe</button>
                    </form>
                </div>
            </div>
        </div>)
}

export default CreateRecipe;