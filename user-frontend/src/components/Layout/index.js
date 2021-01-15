import React from "react";
import MenuHeader from "../MenuHeader";
import Header from "../Header";
import "./index.scss";

function Layout(props) {
  return (
    <>
      <Header />
      <MenuHeader />
      {props.children}
    </>
  );
}

export default Layout;
