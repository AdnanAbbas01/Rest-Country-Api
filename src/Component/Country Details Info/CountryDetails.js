import React, {Component} from "react";
import classes from './CountryDetails.module.css';
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import { withRouter } from "react-router";
import Spinner from "../Spinner/Spinner";

class CountryDetails extends Component {


    state = {
        country : null,
        name: null,
        darkMode : this.props.darkMode
    }
    
    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
         for(let param of query.entries()){
            this.setState({country: param[1]})
        console.log(param[0],param[1]); 
        }
        }

    componentDidMount () {
        axios.get(`https://restcountries.com/v3.1/name/${this.state.country}`)
        .then(res => {
            console.log(res);
          this.setState({
            name: res.data,
          })
       })
       .catch(error=>{
           
       })
    }

    backHandler = () => {
      this.props.history.push('/');
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
            console.log(this.state.name[0])
            return <button  className={classes.brdBtns}>{border}</button>
        })
    }
    }

   return (
    <div className={this.props.darkMode?[classes.detailsMain,classes.darkmode].join(' '):classes.detailsMain}>
    <Navbar clicked={() => this.props.setStateOfParent(this.props.darkMode)} darkMode ={this.props.darkMode}/>
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