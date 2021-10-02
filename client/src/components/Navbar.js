import { SvgIcon } from "@material-ui/core";
import React from "react";
import {} from "react-router-dom";
import styles from "./Navbar.module.css";
// import { useStyles } from "../customStyles";
import {
  Search,
  HomeOutlined,
  GroupOutlined,
  SupervisedUserCircleOutlined,
} from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import { ReactComponent as Logo } from "./logo.svg";

const Navbar = () => {
  // const classes = useStyles();
  return (
    <>
      <nav>
        <div className={styles["navbar"]}>
          <div className={styles["nav-left"]}>
            <SvgIcon component={Logo} />
            <div className={styles["search"]}>
              <Search />
              <InputBase
                placeholder="Search Facebook"
                inputProps={{
                  "aria-label": "search",
                  style: {},
                }}
              />
            </div>
          </div>
          <div className={styles["nav-center"]}>
            <HomeOutlined fontSize="large" htmlColor="#65676B" />
            <GroupOutlined fontSize="large" htmlColor="#65676B" />
            <SupervisedUserCircleOutlined
              fontSize="large"
              htmlColor="#65676B"
            />
          </div>
          <div className={styles["nav-right"]}>
            <SvgIcon component={Logo} />
            <Search />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
