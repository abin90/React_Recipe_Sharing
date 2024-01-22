import React from "react";

function Eachactivity(props) {
  const { recipe } = props;
  const { user } = recipe;

  return (
    <div className="col-md-4 mb-3 d-flex">
      <div className="card flex-fill bg-light">
        <div className="card-body d-flex flex-column">
          <p className="mb-2"><strong>{user.name}</strong></p>
          <h5 className="card-title mb-3">{recipe.title}</h5>
          <p className="mb-2">Ingredients: {recipe.ingredients}</p>
          <p className="mb-2">Steps: {recipe.steps}</p>
          <p className="mb-2">Cooking Time: {recipe.cooking_time} minutes</p>
          <p className="mb-2">Difficulty: {recipe.difficulty_level}</p>
        </div>
      </div>
    </div>
  );
}

export default Eachactivity;
