import React from "react";

import Footer from "./Footer.jsx";
import Navbar from "./Navber.jsx";

import {Toaster} from "react-hot-toast";

const MasterLayout = (props) => {
  return <div className="bg-light">
  <Navbar/>
    {props.children}
    <Toaster position="bottom-center"/>
    <Footer/>
  </div>;
};

export default MasterLayout;
