import "./App.scss";
import { Route } from "react-router-dom";
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
import { getInitialData } from "./actions";
import ProductDetails from "./container/Products/product-details";
function App() {
  const auth = useSelector((state) => state.auth);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  //useEffect() is like componentDidMount() and componentDidMount()
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
      if (category.categories.length < 1) dispatch(getInitialData());
    }
    // console.log("categories: " + JSON.stringify(category.categories))
    // if (category.categories.length < 1) dispatch(getInitialData());
  });

  return (
    <>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/categories" component={CategoryPage} />
        <PrivateRoute path="/products" component={ProductsPage} />
        <PrivateRoute path="/orders" component={OrdersPage} />
        <PrivateRoute
          path={`/product/:id/details`}
          component={ProductDetails}
        />
      </Switch>
    </>
  );
}

export default App;
