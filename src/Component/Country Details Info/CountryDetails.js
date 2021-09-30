import React, {Component} from "react";
import classes from './CountryDetails.module.css';
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import { withRouter } from "react-router";
import Spinner from "../Spinner/Spinner";
// import { Component } from "react/cjs/react.production.min";

class CountryDetails extends Component {

    
    state = {
        country : null,
        name: null,
        darkMode: false
    }
    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
         for(let param of query.entries()){
            if(param[0] == 'darkMode'){
               this.setState({darkMode:param[1]})
            } 
            else{
            this.setState({country: param[1]})
            }
         }
         console.log(this.state.darkMode);
        }

    componentDidMount () {
        axios.get(`https://restcountries.com/v3.1/name/${this.state.country}`)
        .then(res => {
          this.setState({
            name: res.data,
          })
       })
    }

    backHandler = () => {
      this.props.history.push('/');
    }

    darkModeHandler = () => {
        this.setState({darkMode:!this.state.darkMode});
      }

render(){
    let nativeName = [];
    let currencies = [];
    let languages = [];
    let borders = null;

    if(this.state.name){
        for(let key in this.state.name[0].name.nativeName){
            nativeName.push(this.state.name[0].name.nativeName[key])
        }
        for(let key in this.state.name[0].currencies){
            currencies.push(this.state.name[0].currencies[key])
        }
        for(let key in this.state.name[0].languages){
            languages.push(this.state.name[0].languages[key])
        }
        if(this.state.name[0].borders){
        borders = this.state.name[0].borders.map(border => {
            return <button className={classes.brdBtns}>{border}</button>
        })
    }
        console.log(nativeName,currencies);
    }


   return (
     <div className={this.state.darkMode?[classes.detailsMain,classes.darkmode].join(' '):classes.detailsMain}>
        <Navbar clicked={this.darkModeHandler} darkMode ={this.state.darkMode}/>
        <div className={classes.btn}>
        <button className={classes.back} onClick={this.backHandler}>Back</button>
        </div>
        {this.state.name?<div className={classes.detailData}>
          <div className={classes.imgDetail}>
            <img src={this.state.name[0].flags.png} alt="" className={classes.img} />
          </div>
          <div className={classes.details}>
              <div className={classes.info}>
                  <p>Native Name: <span>{nativeName[0].official}</span></p>
                  <p>top Level Domain: <span>{this.state.name[0].tld}</span></p>
              </div>
              <div className={classes.info}>
                  <p>Population: </p>
                  <p>Currencies: <span>{currencies[0].name}</span></p>
              </div><div className={classes.info}>
                  <p>Region: <span>{this.state.name[0].region}</span></p>
                  <p>Languages: <span>{languages.join(', ')}</span></p>
              </div>
              <p>Sub Region:<span> {this.state.name[0].subregion}</span></p>
              <p>Capital: <span>{this.state.name[0].capital}</span></p>
              <div className={classes.border}>
              <p>Countries: </p>
              {borders}
          </div>
          </div>
         
        </div>
        :<Spinner />}
       </div>
   
   )
}
}

export default withRouter(CountryDetails);