import React from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <section className={styles["home-section"]}></section>
    </div>
  );
};

export default Home;
