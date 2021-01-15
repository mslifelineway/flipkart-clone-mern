import "./App.scss";
import {Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import ProductListPage from "./containers/ProductListPage";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:slug" component={ProductListPage} />
      </Switch>
    </>
  );
}

export default App;
