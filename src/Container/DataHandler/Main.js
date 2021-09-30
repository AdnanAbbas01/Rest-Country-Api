import React, { Component } from "react";
import axios from "axios";
import classes from './Main.module.css';

import Data from "../../Component/Design/Data/Data";
import Design from "../../Component/Design/Design";
import Navbar from "../../Component/NavBar/Navbar";
import Spinner from "../../Component/Spinner/Spinner";
import { Route, withRouter } from "react-router";
import CountryDetails from "../../Component/Country Details Info/CountryDetails";

class Main extends Component{
    
    state = {
        data: null,
        spinner: false,
        countryClick: null,
        darkMode: false
    }

    componentDidMount = () => {
      this.setState({spinner:true});
      axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
          this.setState({
              data : res.data,
              spinner: false
          })
      })
    } 
    
    filterCountry = (event) =>{
      this.setState({spinner:true});
      axios.get(`https://restcountries.com/v3.1/region/${event.target.innerHTML.toLowerCase()}`)
      .then(res=>{
        this.setState({
          data: res.data,
          spinner:false
        })
      })
    }

    searchCountry = (event) => {
      this.setState({spinner:true});
      axios.get(`https://restcountries.com/v3.1/name/${event.target.value.toLowerCase()}`)
      .then(res => {
        this.setState({
          data: res.data,
          spinner:false
        })
      })
    }

    secondPageHandler = (countryName) => {
      let queryParam = [];
      queryParam.push(encodeURIComponent('country')+'='+encodeURIComponent(countryName));
      queryParam.push(encodeURIComponent('darkMode')+'='+encodeURIComponent(this.state.darkMode));
      const queryString = queryParam.join('&');
      this.props.history.push({
        pathname: '/country',
        search: '?'+queryString
      })
    }

    darkModeHandler = () => {
      this.setState({darkMode:!this.state.darkMode});
    }

    setStateOfParent = (newState) => {
      this.setState({darkMode:!newState});
    }

    render(){
       let data = null;
        if(this.state.data){
          data = this.state.data.map((value,index)=>{
            if(index < 10){
            return <Data darkMode = {this.state.darkMode} 
            key={value.name.official}
            countryName = {value.name.official}
            region={value.region} 
            capital = {value.capital}
            src = {value.flags.png}
            clicked={()=>this.secondPageHandler(value.name.official)}/>
            }
          })
        }
      return(
          <div className={this.state.darkMode?[classes.colorChange,classes.main].join(' '):null}> 
           <Navbar clicked={this.darkModeHandler} darkMode={this.state.darkMode}/>
           <Design clicked={this.filterCountry}
           changed = {this.searchCountry}
           darkMode={this.state.darkMode}/>
           {this.state.spinner ? 
             <Spinner />
          :<div className={classes.data}>
            {data}
          </div>}
          <Route path='/country' render={()=> <CountryDetails darkMode={this.state.darkMode} setStateOfParent={this.setStateOfParent}/>} />
           </div>
      )
    }
}

export default withRouter(Main);