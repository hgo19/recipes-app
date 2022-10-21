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
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route
          exact
          path="/meals/:id"
          render={ (props) => <MealRecipe { ...props } /> }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ MealInProgress }
        />
        <Route exact path="/drinks" component={ Drinks } />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <DrinkRecipe { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ DrinkInProgress }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipesProvider>

  );
}

export default App;
