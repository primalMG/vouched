import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import update from 'immutability-helper';

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      hidden: false,
      income: [{  
        amount: 45300,
        from_age: 30,
        to_age: 67,
        frequency: "annual",
        name: "Annual salary"
      }],
      expenditure: [{
        id: 0,
        amount: 1199,
        from_age: 30,
        to_age: 65,
        frequency: "monthly",
        name: "Mortgage"
      },
      {
        id: 1,
        amount: 1199,
        from_age: 30,
        to_age: 65,
        frequency: "monthly",
        name: "Bills"
      },
      {
        id: 2,
        amount: 1199,
        from_age: 30,
        to_age: 65,
        frequency: "monthly",
        name: "General spending"
      }
      ] 
  
     
    }
    this.newTab = this.newTab.bind(this);
    this.feedback = this.feedback.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
    this.handleChange = this.handleChange.bind(this)
  
  }

  newTab(){
    window.open('https://www.vouchedfor.co.uk/', '_blank')
  }

  handleChange(){

  }

  handleAmount(index, event){



  var data = [...this.state.expenditure];
  var id = data.findIndex(obj => obj.id === index);
  data[id].amount = event.target.value;
  this.setState({data})

    //todo local storage

    localStorage.setItem(data[id].amount, JSON.stringify(event.target. ))
    console.log(localStorage.setItem(data[id].amount, JSON.stringify(event.target.value)))
    localStorage.setItem(data[id].amount, event.target.valueta);
  }

  //todo local storage
  gettingLocalStorage(){
    for (let key in this.state.expenditure) {
     let obj = this.state.expenditure[key]
      if (localStorage.hasOwnProperty(obj.amount)) {
        let value = localStorage.getItem(obj.amount)
        console.log(value)
        try {
          value = JSON.parse(value)
          this.setState({ [obj.amount]: value})
        } catch (e) {

          this.setState({ [obj.amount]: value})
        }
      }
    }
  }

  feedback(){
    this.setState( {
      hidden: !this.state.hidden
    })
  }

  componentDidMount(){
    this.gettingLocalStorage();
  }

 

  render() {
    let incomeRows = this.state.income.map(details => {
      return <tbody key={details.name}>
      <tr>
        <td> {details.name}</td>
        <td>From Age</td>
        <td>To Age</td>
      </tr>
      <tr>
        <td><input value={details.amount} className="text" /></td>
        <td><input value={details.from_age} className="text" /></td>
        <td><input value={details.to_age} className="text" /></td>
      </tr>
      </tbody>
    })

 


      let expenditure = this.state.expenditure.map((details, index) => {
      return <tbody key={index}>
        <tr><td><h3>{details.name}</h3></td>
        <td>From Age</td>
        <td>To Age</td>
      </tr>
      <tr>
      <td><input value={details.amount} className="text" type="text" key={index} onChange={this.handleAmount.bind(this, index)}/></td>
      <td><input placeholder={details.from_age} className="text"  type="text" key={index}  onChange={this.handleChange.bind(this, index)}/></td>
      <td><input placeholder={details.to_age} className="text"  type="text" key={index} onChange={this.handleChange.bind(this, index)} /></td>
      </tr>
      </tbody>
    })

    let sliders = this.state.expenditure.map((details, index) =>{
      return <tbody key={index}>
      <tr><td>{details.name}</td>
      <td><input type="range" min={0} max={2000} key={index} defaultValue={details.amount} onChange={this.handleAmount.bind(this, index)}/></td>
      <td><h5>{details.amount}</h5></td>
      </tr>
      </tbody>
    })




    let value = this.state.expenditure.reduce((acc, val) => {
      console.log(acc + val.amount)
      let total = acc + val.amount
      // console.log(total)
      // let currentSavings = total - val.amount
      return total
    }, 0)

    const hidden = {
      display: this.state.hidden ? "none" : "block" 
    }

    const shown = {
      display: this.state.hidden ? "block" : "none"

    }
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
        <h3>Annual Income</h3>
             <table>{incomeRows}</table>
    
      <h2>Monthly Spending</h2>
      <table>{expenditure}</table>
        </div>
            

     
        <div className="container">
        <div className="header">

        
        <h2>SPEND LESS</h2>
          <h4>Try reducing your monthly spending to see how your forecast could improve!</h4>
          
          <table>{sliders}</table>
          
          <div>this means you save {value} per month</div> 
          <a target="_blank"><input type="button" className="saverButton" onClick={this.newTab} value="Find ways to Save" /></a>

          
          
          <div className="helpful">
          <h4>was this helpful?</h4>
            <input type="button" className="button" style={hidden} onClick={this.feedback} value="yes"/> 
            <input type="button" className="button" style={hidden} onClick={this.feedback} value="no"/>
            <h4 style={shown} >thank you for your feedback</h4>
          </div>
            
        
        </div>
          

        </div>
      </div>
    );
  }
}

export default App;
