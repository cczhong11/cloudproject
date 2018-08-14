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
const map={"742":"743",
"743":"744",
"744":"745",
"745":"746",
"746":"747",
"747":"748",
"748":"749",
"749":"750",
"750":"751",
"751":"752",
"752":"753",
"753":"754",
"754":"755",
"755":"756",
"756":"757",
"757":"759",
"758":"760",
"759":"761",
"760":"762",
"761":"763",
"762":"767",
"763":"768",
"764":"769",
"765":"770",
"766":"777",
"767":"778",
"768":"779",
"769":"780",
"770":"781",
"771":"782",
"772":"785",
"773":"787",
"774":"788",
"775":"790",
"776":"791",
"777":"793",
"778":"794",
"779":"795",
"780":"796",
"781":"797",
"782":"798",
"783":"799",
"784":"800",
"785":"801",
"786":"802",
"787":"803",
"788":"804",
"789":"805",
"790":"806",
"791":"807",
"792":"808",
"793":"809",
"794":"810",
"795":"811",
"796":"812",
"797":"813",
"798":"814",
"799":"815",
"800":"818",
"801":"819",
"802":"820",
"803":"821",
"804":"822",
"805":"823",
"806":"824",
"807":"825",
"808":"826",
"809":"827",
"810":"828",
"811":"829",
"812":"830",
"813":"831",
"814":"832",
"815":"833",
"816":"834",
"817":"835",
"818":"836",
"819":"837",
"820":"839",
"821":"841",
"822":"842",
"823":"843",
"824":"851",
"825":"852",
"826":"853",
"827":"854",
"828":"855",
"829":"856",
"830":"857",
"831":"858",
"832":"861",
"833":"862",
"834":"863",
"835":"864",
"836":"866",
"837":"867",
"838":"868",
"839":"869",
"840":"870",
"841":"871",
"842":"872",
"843":"873",
"844":"874",
"845":"875",
"846":"876",
"847":"877",
"848":"878",
"849":"879",
"850":"880",
"851":"881",
"852":"882",
"853":"883",
"854":"884",
"855":"885",
"856":"886",
"857":"887",
"858":"888",
"859":"889"};

export default class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                num: "1",
                realnum:"1",
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
            var string = key.update('q=' + this.state.realnum + "&lang=" + this.state.language + "&time=" + this.state.time, 'utf8', 'hex');
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
          var string = key.update('op=q&num=' + this.state.realnum, 'utf8', 'hex');
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
          var string = key.update('op=in&num=' + this.state.realnum, 'utf8', 'hex');
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
          var string = key.update('op=ql&num=' + this.state.realnum + "&lang=" + this.state.language, 'utf8', 'hex');
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
            var mapvalue = newText;
            if(newText in map){
                mapvalue = map[newText];
            }
            
            this.setState({
                num: newText,
                realnum:mapvalue,
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