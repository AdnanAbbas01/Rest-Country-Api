import React from "react";
import classes from './Navbar.module.css';

const navbar = (props) => {
    return(
        <nav className={props.darkMode?[classes.nav,classes.darkmode].join(' '):classes.nav}>
          <h1>Where in the world</h1>
          <button className={classes.darkmodeBtn} onClick={props.clicked}>Dark Mode</button>
        </nav>
    )
}

export default navbar;