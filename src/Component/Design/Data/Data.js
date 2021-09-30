import React from "react";
import classes from './Data.module.css';

const data = (props) => {
    return(
        <div className={props.darkMode?[classes.country,classes.darkmode].join(' '):classes.country} onClick={props.clicked}>
          <div className={classes.imgMain}>
              <img src={props.src} alt='img' className={classes.img} />
          </div>
          <div className={classes.countryDetails}>
            <h2>{props.countryName}</h2>
            <p>Population: <span>{props.population}</span></p>
            <p>Capital: <span>{props.capital}</span></p>
            <p>Region: <span>{props.region}</span></p>
          </div>
        </div>
    )
}

export default data;