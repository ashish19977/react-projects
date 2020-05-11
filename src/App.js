import React from 'react';
import './App.css';
import CommentComponent from './CommentComponent'

class App extends React.Component{
  constructor(){
    super()
    this.state={
      searchvalue:"",
      loadingmessage:"",
      info:null,
      found:"",
    }
    this.handlechange=this.handlechange.bind(this)
    this.handleclick=this.handleclick.bind(this)
      this.fetchdata=this.fetchdata.bind(this)
  }

handlechange(e){
    this.setState({searchvalue:e.target.value})
}

handleclick(city){
  if(city!=="")
this.fetchdata(city)
else
alert("Enter a City Name")
}

fetchdata=(city)=>{
  this.setState({loadingmessage:"Searching City Name ..."})
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=20480b401406258c390ff1cf3600d60a')
    .then(res => res.json())
    .then(
      (result) => {
       if(result.cod!==200){
       this.setState({found:"no"})
      this.setState({loadingmessage:"City Name not found"})
      }
       if(result.cod===200){
       this.setState({found:"yes"})
      }
       this.setState({loadingmessage:""})
        this.setState({info:result})
          console.log(this.state.info)
      },
      (error) => {
        this.setState({loadingmessage:"Check Network Connection!!!"})
       console.log("error")
       
      }
    )
}


  render() {
    let d="";
    if (this.state.info !== null) {
      if (this.state.info.cod !== "404") {
        let sunRise = new Date(parseInt(this.state.info.sys.sunrise + "005")).toString().substring(16, 21)
        let sunSet=new Date(parseInt(this.state.info.sys.sunset+"005")).toString().substring(16,21)  
      d=<div id="sbkabap-div"><h5>{this.state.info.name} , {this.state.info.sys.country} ,{new Date().toString().substring(4,21)}</h5>
      <div id="second-div">
        <div id="p">{(this.state.info.main.temp-273).toFixed(2)}&#176; C   ~</div>
        <div id="q">
     <p>Weather : <span className="span1">{this.state.info.weather[0].main}</span>
     <br/>Wind : <span className="span1">{this.state.info.wind.speed} Km/h</span></p>
     <p>Humidity : <span className="span1">{this.state.info.main.humidity} %</span>
     <br/>Pressure  : <span className="span1">{this.state.info.main.pressure} Pa</span></p>
     <p>Max Temp  : <span className="span1">{(this.state.info.main.temp_max-273).toFixed(2)}&#176; C</span>
     <br/>Min Temp : <span className="span1">{(this.state.info.main.temp_min-273).toFixed(2)}&#176; C</span></p>
     <p>Sunrise  : <span className="span1">{sunRise}</span>
     <br/>Sunset  : <span className="span1">{sunSet}</span></p>
     </div></div>
     <CommentComponent/>
     </div>
    }}

    if(this.state.found==="no")
    {
      return(<><h1 id="heading">Weather App</h1><div id="main-div"><div id="searchbar-div">
      <input type="text" placeholder="Search City" id="searchbar" onChange={this.handlechange}></input>
      <button id="search-button" onClick={()=>this.handleclick(this.state.searchvalue)}>Search</button>
      </div><div className="city-not-found-div">City Name not found</div>
      </div></>)
    }
    else{
    return(<><h1 id="heading">Weather App</h1><div id="main-div"><div id="searchbar-div">
      <input type="text" placeholder="Enter City Here ..." id="searchbar" onChange={this.handlechange}></input>
      <button className="comment-buttons" onClick={()=>this.handleclick(this.state.searchvalue)}>Search</button>
      </div><div className="city-not-found-div">{this.state.loadingmessage}</div>
     {d}
      </div>
      </>)}
  }
}


export default App;
