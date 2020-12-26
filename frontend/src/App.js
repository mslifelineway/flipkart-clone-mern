import "./App.css";
import { Route } from "react-router-dom";
// import Layout from "./components/Layout";
import Switch from "react-bootstrap/esm/Switch";
import Home from "./container/Home";
import SignIn from "./container/Signin";
import SignUp from "./container/Signup";
import PrivateRoute from "./components/HOC/private-route";
import { isUserLoggedIn } from "./actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductsPage from "./container/Products";
import OrdersPage from "./container/Orders";
import CategoryPage from "./container/Category";
function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  //useEffect() is like componentDidMount()
  useEffect(() => {
    if (!auth.authenticate)
      dispatch(isUserLoggedIn())
  })

  return (
    <>

      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/categories" component={CategoryPage} />
        <PrivateRoute path="/products" exact component={ProductsPage} />
        <PrivateRoute path="/orders" exact component={OrdersPage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </>
  );
}

export default App;
