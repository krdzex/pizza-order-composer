import './App.css';
import Header from './components/Header';
import IngiredientsPopUp from './components/IngiredientsPopUp';
import Pizza from './components/Pizza';
import { useSelector } from 'react-redux';
import Cart from './components/Cart';
import Order from './components/Order';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  const popUpOpener = useSelector(state => state.popUpReducer)
  const ordered = useSelector(state => state.orderReducer)
  return (
    <div className="App">
      <Header />
     
      
      {ordered.isOrdered ? <Order /> :  <div className="middleOfScreen">
        <Pizza />
        <Cart />
      </div>}  
      {popUpOpener.ingredients && (<IngiredientsPopUp />)}
      {popUpOpener.signin && (<Signin/>)}
      {popUpOpener.signup && ( <Signup />)}
     
    </div>
  );
}

export default App;
