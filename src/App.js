import './App.css';
import CountryDetails from './Component/Country Details Info/CountryDetails';
import Main from './Container/DataHandler/Main';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch,Redirect } from 'react-router';
import Navbar from './Component/NavBar/Navbar';

function App() {
  return (
  
    <Switch>
      <Route path='/' exact component={Main} />
      <Route path='/country' component={CountryDetails} />
    </Switch>
   
  );
}

export default App;
