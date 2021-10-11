import './App.css';
import Header from './components/Header';
import IngiredientsPopUp from './components/IngiredientsPopUp';
import Pizza from './components/Pizza';
import { useSelector } from 'react-redux';
import Cart from './components/Cart';
import Order from './components/Order';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { useTransition, animated } from "react-spring";

import OrderHistory from './components/OrderHistory';

function App() {
  const popUpOpener = useSelector(state => state.popUpReducer)
  const ordered = useSelector(state => state.orderReducer)
  const history = useSelector(state => state.orderHistory)

  const transition = useTransition(popUpOpener.signin, {
    from: { x: 800, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -800, y: 0, opacity: 0 },
  })

  const transition2 = useTransition(popUpOpener.signup, {
    from: { x: 800, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -800, y: 0, opacity: 0 },
  })

  const transitions3 = useTransition(popUpOpener.ingredients, {
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-40px)" }
  });


  return (
    <div className="App">
      <Header />
      {history.open ? <div className="middleOfScreen orderHistory"><OrderHistory /></div> : ordered.isOrdered ? <Order /> : <div className="middleOfScreen">
        <Pizza />
        <Cart />
      </div>}
      {transitions3((style, item) =>
        item && (<div className="popUpIngredients"><animated.div style={style}><IngiredientsPopUp /></animated.div> </div>))}
      {transition((style, item) =>
        item && (<div className="popUpIngredients"><animated.div style={style}><Signin /></animated.div> </div>))}
      {transition2((style, item) =>
        item && (<div className="popUpIngredients"><animated.div style={style}><Signup /></animated.div> </div>))}
    </div>
  );
}

export default App;
