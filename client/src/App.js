import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/home"
import DogDetails from "./Components/DogDetails/Details";
import FormAddDog from "./Components/Form/form";




function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/dog-detail/:id">
            <DogDetails />
          </Route>
          <Route exact path="/dog">
            <FormAddDog />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
