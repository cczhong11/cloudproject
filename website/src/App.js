'use strict';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import SyntaxHighlighter from 'react-syntax-highlighter';
axios.defaults.headers.post["Content-Type"]="application/json"
export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.cars = {
        hatchback : ['Indica', 'Swift', 'Logan'],
        sedan : ['Indigo', 'Xuv', 'Accent'],
        van : ['Omni', 'Vagon-R', 'Bolero'],
      }; //refactor your cars data into key values
      this.state = {
        currentDropdown: this.cars.hatchback, //initially first selection 
        num:"1",
        code:" ",
        lang:[],
        language:"",
        time:"1",
        times:[]
      }
      //this.getData()
      this.getLang()
      
      this.changeModel = this.changeModel.bind(this);
      this.changeTime = this.changeTime.bind(this);
      this.getData = this.getData.bind(this);
    }

    changeModel(event){
      this.setState({ //changing state based on first selectbox value
        language: event.target.value,
        times:[]
      },()=>{ this.getTime();});
     
    }
    changeTime(event){
      this.setState({ //changing state based on first selectbox value
        time: event.target.value
      });
     
    }
    async getData(){
      const res = await axios.get('https://us-central1-leetcode-207514.cloudfunctions.net/demo?q='+this.state.num+"&lang="+this.state.language+"&time="+this.state.time);
      var result = await res;
      try{
        this.setState({
          code:result.data.code
        })
      }catch(err){
        console.error(err)
      }
      
   }
   async getLang(){
    const res = await axios.get('https://us-central1-leetcode-207514.cloudfunctions.net/demo?op=q&num='+this.state.num);
    var result = await res;
    try{
      this.setState({
        lang: result.data.data,
        language:result.data.data[0]
      },()=>{
        this.getTime()
      })
      
    }catch(err){
      console.error(err)
    }
    
 }
 async getTime(){
  const res = await axios.get('https://us-central1-leetcode-207514.cloudfunctions.net/demo?op=ql&num='+this.state.num+"&lang="+this.state.language);
  var result = await res;
  try{
    this.setState({
      times:result.data.data
    })
  }catch(err){
    console.error(err)
  }
  
}
    render() {
        return ( 
         <div>
         <h1>DEMO for question 1</h1>
          <label className = "control-label" > Language </label>
          <select id ="lang_avail" onChange = {this.changeModel}>
          {
            this.state.lang.map(item => {
              return <option key={item} value={item}>{item}</option>
            })          
          }
          </select>
          <label className="control-label">runtime</label >
          <select id="avail_time" onChange = {this.changeTime}>
          {
            this.state.times.map(item => {
              return <option key={item} value={item}>{item}</option>
            })          
          }
          </select>
          <button onClick={this.getData}>search</button>
          <br></br>
          
          <div style={{flex: 1, width: '50%'}}>
            <SyntaxHighlighter 
              style={require(`react-syntax-highlighter/dist/styles/hljs/vs`).default} 
              showLineNumbers={true}
              wrapLines={true}
              language={'c'}
              lineProps={(lineNumber) => ({
                style: { display: "block", cursor: "pointer" },
                onClick() {
                  alert(`Line Number Clicked: ${lineNumber}`);
                }
              })}
            >
              {this.state.code}
            </SyntaxHighlighter>
          
        </div>
         </div>
        )
    }
}
