'use strict';
import React, {
    Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import crypto from 'crypto';
import SyntaxHighlighter from 'react-syntax-highlighter';
axios.defaults.headers.post["Content-Type"] = "application/json"

export default class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                num: "1",
                code: " ",
                lang: [],
                language: "",
                time: "1",
                times: [],
                showResult: false,
                questiontext:"",
                have_question:true
            }
            //this.getData()
            
            

            this.changeModel = this.changeModel.bind(this);
            this.changeTime = this.changeTime.bind(this);
            this.getData = this.getData.bind(this);
            this.onClick = this.onClick.bind(this)
        }

        changeModel(event) {
            this.setState({ //changing state based on first selectbox value
                language: event.target.value,
                times: [],
                code: ""
            }, () => {
                this.getTime();
            });

        }
        changeTime(event) {
            this.setState({ //changing state based on first selectbox value
                time: event.target.value,
                code: ""
            });

        }
        async getData() {
            var key = crypto.createCipheriv('aes-128-cbc', process.env.REACT_APP_CRED,process.env.REACT_APP_IV);
            var string = key.update('q=' + this.state.num + "&lang=" + this.state.language + "&time=" + this.state.time, 'utf8', 'hex');
            string+=key.final('hex')
            const res = await axios.get('https://us-central1-leetcode-207514.cloudfunctions.net/question?request='+string, {
                'timeout': 5000
            });
            var result = await res;
            try {
                this.setState({
                    code: result.data.code
                })
            } catch (err) {
                console.error(err)
            }
        }

        async getLang() {
          var key = crypto.createCipheriv('aes-128-cbc', process.env.REACT_APP_CRED,process.env.REACT_APP_IV);
          var string = key.update('op=q&num=' + this.state.num, 'utf8', 'hex');
            string+=key.final('hex')
            const res = await axios.get('https://us-central1-leetcode-207514.cloudfunctions.net/question?request=' + string);
            var result = await res;
            try {
                this.setState({
                    lang: result.data.data,
                    language: result.data.data[0]
                }, () => {
                    this.getTime()
                })

            } catch (err) {
                console.error(err)
            }

        }

        async getIn() {
          var key = crypto.createCipheriv('aes-128-cbc', process.env.REACT_APP_CRED,process.env.REACT_APP_IV);
          var string = key.update('op=in&num=' + this.state.num, 'utf8', 'hex');
          string+=key.final('hex');
          
            const res = await axios.get('https://us-central1-leetcode-207514.cloudfunctions.net/question?request='+string);
            var result = await res;
            try {
                this.setState({
                    have_question: result.data.data,
                    code: " "
                })
                

            } catch (err) {
                console.error(err)
            }

        }

        async getQuestion() {
          var key = crypto.createCipheriv('aes-128-cbc', process.env.REACT_APP_CRED,process.env.REACT_APP_IV);
          var string = key.update('op=question&num=' + this.state.num, 'utf8', 'hex');
          string+=key.final('hex')
            const res = await axios.get('https://us-central1-leetcode-207514.cloudfunctions.net/question?request=' + string);
            var result = await res;
            try {
                this.setState({
                    questiontext: result.data.data
                }
            )
               
            } catch (err) {
                console.error(err)
            }

        }
        async getTime() {
          var key = crypto.createCipheriv('aes-128-cbc', process.env.REACT_APP_CRED,process.env.REACT_APP_IV);
          var string = key.update('op=ql&num=' + this.state.num + "&lang=" + this.state.language, 'utf8', 'hex');
          string+=key.final('hex')
            const res = await axios.get('https://us-central1-leetcode-207514.cloudfunctions.net/question?request='+string);
            var result = await res;
            try {
                this.setState({
                    times: result.data.data,
                    time: result.data.data[0]
                })
            } catch (err) {
                console.error(err)
            }

        }
        async search(){
            await this.getIn();
            if(this.state.have_question===true){
            this.getLang();
            this.getQuestion();
            }
        }
        
        onChangedSearch(event) {
            let text = event.target.value;
            let newText = '';
            let numbers = '0123456789';

            for (var i = 0; i < text.length; i++) {
                if (numbers.indexOf(text[i]) > -1) {
                    newText = newText + text[i];
                } else {
                    // your call back function
                    alert("please enter numbers only");
                }
            }
            
            this.setState({
                num: newText,
                showResult:false
            });
        }
        onClick() {
            this.setState({
                showResult: true
            },()=>{
                this.search();
            })
            
        }
        render(){
            return (<div>
                <div  class="searchbar">
              <h1>Leetcode question solutions </h1>
              <input type="text" 
             pattern="[0-9]*"
             onInput={this.onChangedSearch.bind(this)}
             value={this.state.num} 
              />
              <button onClick={this.onClick}>search</button>
              </div>
              {this.state.showResult?this.renderSearch():null}
              </div>
              )
            }
              renderSearch() {
                  if(this.state.have_question===false){
                      return <div><b>Cannot find solutions in the database.</b></div>
                  }else{
                    var questionStyle = {
                        margin: '0%',
                        width: '100%',
                        height:this.state.questiontext.split("\n").length * 15+'px'
                    };
                  
                  return ( 
                   <div>
                       <div  class="searchbar">
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
                    <button onClick={this.getData}>get</button>
                    </div>
                    <br></br>
                    <div id="question_text">
                    <textarea id="question-text-area" name="textarea" style={questionStyle} value={this.state.questiontext}   > </textarea>
                    </div>
                    <div style={{flex: 1, width: '100%'}}>
                      <SyntaxHighlighter 
                        style={require(`react-syntax-highlighter/dist/styles/hljs/vs`).default} 
                        showLineNumbers={true}
                        wrapLines={true}
                        language={this.state.language}
                        lineProps={(lineNumber) => ({
                          style: { display: "block", cursor: "pointer" },
                          
                        })}
                      >
                        {this.state.code}
                      </SyntaxHighlighter>
                    
                  </div>
                   </div>
                )
            }
        }
    }