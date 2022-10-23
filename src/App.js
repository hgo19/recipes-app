import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';

import Login from './pages/Login';
import Meals from './pages/Meals';
import MealRecipe from './pages/MealRecipe';
import MealInProgress from './pages/MealInProgress';
import Drinks from './pages/Drinks';
import DrinkRecipe from './pages/DrinkRecipe';
import DrinkInProgress from './pages/DrinkInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/recipes-app" component={ Login } />
        <Route exact path="/recipes-app/meals" component={ Meals } />
        <Route
          exact
          path="/recipes-app/meals/:id"
          render={ (props) => <MealRecipe { ...props } /> }
        />
        <Route
          exact
          path="/recipes-app/meals/:id/in-progress"
          component={ MealInProgress }
        />
        <Route exact path="/recipes-app/drinks" component={ Drinks } />
        <Route
          exact
          path="/recipes-app/drinks/:id"
          render={ (props) => <DrinkRecipe { ...props } /> }
        />
        <Route
          exact
          path="/recipes-app/drinks/:id/in-progress"
          component={ DrinkInProgress }
        />
        <Route exact path="/recipes-app/profile" component={ Profile } />
        <Route exact path="/recipes-app/done-recipes" component={ DoneRecipes } />
        <Route exact path="/recipes-app/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipesProvider>

  );
}

export default App;
