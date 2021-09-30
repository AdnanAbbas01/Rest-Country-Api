import React from "react";
import classes from './Design.module.css';
import Data from "./Data/Data";
const design = (props) => {
    return (
        <div className={props.darkMode?[classes.designMain,classes.darkmode].join(' '):classes.designMain}>
          <div className={classes.inpfilter}>
            <input type='text' 
            className={classes.input} 
            onChange={props.changed}
            placeholder='Search for a country'/>
            <div className={classes.menu}>
             <div className={classes.btndiv}>
              <button className={classes.drop}>Filter by region</button>
              </div>
              <div className={classes.dropdown}>
              <ul>
                  <li onClick={props.clicked}>Africa</li>
                  <li onClick={props.clicked}>America</li>
                  <li onClick={props.clicked}>Asia</li>
                  <li onClick={props.clicked}>Europe</li>
                  <li onClick={props.clicked}>Ocenia</li>
              </ul>
              </div>
            </div>
          </div>
          
        </div>
    )
}

export default design;