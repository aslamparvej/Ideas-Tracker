import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../lib/context/user";

import Ideas from "./Ideas";
import Footer from "../components/footer/Footer";
import LandingPage from "./LandingPage";
import Projects from "./Projects";
import Loading from "./Loading";

const Home = () => {
  const user = useUser();
  
  return (
    <>
      <div className="home-container">
        {!user.current ? <LandingPage /> : <Projects />}
      </div>
    </>
  );
};

export default Home;
