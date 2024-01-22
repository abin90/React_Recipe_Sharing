import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import "../auth/Login/LoginForm.css";
import { useParams } from "react-router-dom";
import { setUserFromLocalStorage } from "../../Store/authSlice";

function EditRecipe() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [time, setTime] = useState('');
    const [difficulty, setDifficulty] = useState('');
    var navigate = useNavigate();
    var {recipeId}=useParams();
    var dispatch=useDispatch();
    var user = useSelector(store=>store.auth.user);

    useEffect(() => {
        dispatch(setUserFromLocalStorage());
    }, [dispatch]);

    // Fetch user data when user or token changes
    useEffect(() => {
        if (user && user.token) {
            const headers = {
                Authorization: `Bearer ${user.token}`,
            };
            axios.get(`http://127.0.0.1:8000/api/recipe/${recipeId}`, {
                headers}).then(response=>{
                setTitle(response.data.data.title);
                setIngredients(response.data.data.ingredients);
                setSteps(response.data.data.steps);
                setTime(response.data.data.cooking_time);
                setDifficulty(response.data.data.difficulty_level);
            })
        }
    }, [user]);

        
    function UpdateRecipe() {
        axios.patch(`http://127.0.0.1:8000/api/recipes/${recipeId}/edit`,{
            title: title,
            ingredients: ingredients,
            steps: steps,
            cooking_time:time,
            difficulty_level:difficulty,
        },{headers:{'Authorization':`Bearer ${user.token}`}}).then(response=>{
            alert(response.data.message);
        });
        navigate('/user/userdashboard')
    };
    return (<div>
        <Navbar />
        <div className="first-container">
      <div className="secondi-container"></div>
      <div className='thirdf-container'>
        <form className="myform" action="">
          <h1>Update Recipe</h1>
          <div className="inputb" title='Recipe title'>
              <input type="text" value={title} required
              onChange={(event)=>setTitle(event.target.value)}/>
          </div>
          <div className="inputb">
              <input type="text" value={ingredients} required 
              onChange={(event)=>setIngredients(event.target.value)}/>
         </div>
          <div className="inputb">
              <input type="text" value={steps} required
              onChange={(event)=>setSteps(event.target.value)} />
         </div>
         <div className="inputb">
              <input type="text" value={time} required
              onChange={(event)=>setTime(event.target.value)} />
         </div>
         <div className="inputb">
              <input type="text"  value={difficulty} required
              onChange={(event)=>{setDifficulty(event.target.value)}} />
         </div>
        <button className="btn btn-primary" onClick={UpdateRecipe}>Update</button>
        </form>
      </div>
    </div>
    </div>)
}

export default EditRecipe;