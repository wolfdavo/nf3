import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import HeroImg from './assets/herobg.jpeg';
import { Colors } from './assets/colors';
import jsonp from 'jsonp';
import queryString from 'query-string';

const Styles = styled.div`
max-width: 100vw;
overflow: hidden;

.heroImg {
  position: fixed;
  min-height: 100vh;
  min-width: 100vw;
  z-index: -2;
  opacity: 0.3;
}

.heroWrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
}

.mainText {
  color: ${Colors.white};
  text-align: center;
  font-family: 'Bebas Neue';
  font-size: 3em;
  text-shadow: 4px 4px ${Colors.dark};
}

.smallText {
  color: #f3f3f3;
  font-family: 'Pacifico';
  margin-top: 0px;
  text-shadow: 2px 2px ${Colors.pink};
}

.heroInput {
  display: flex;
  box-sizing: border-box;
  max-width: 400px;
  width: 100%;
  height: 60px;
  margin: 5px 20px;
  border: none;
  padding: 0px 20px;
  border-radius: 10px;
  background-color: #000000cc;
  color: ${Colors.white};
  font-size: 30px;
  font-family: 'Bebas Neue';
  &:focus {
    outline: none;
  }
}

.heroBtn {
  max-width: 400px;
  width: 100%;
  height: 60px;
  margin: 5px 20px;
  border: none;
  padding: 0px;
  border-radius: 10px;
  color: ${Colors.white};
  font-family: 'Bebas Neue';
  text-shadow: 2px 2px ${Colors.dark};
  font-size: 1.5rem;
  background: rgb(195,55,100);
  background: linear-gradient(90deg, rgba(195,55,100,1) 0%, rgba(29,38,113,1) 100%);  
  transition: 0.2s ease-in-out;
  &:hover { 
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  }
}

@media only screen and (max-width: 600px) {
  .mainText {
    font-size: 2rem;
  }
}
`;

const subscribeToNewsLetter = (formData, successCallback) => {
  jsonp(`https://nf3festival.us5.list-manage.com/subscribe/post-json?u=b994958f918f9febee6dbc209&amp;id=3cd2da403e&${queryString.stringify(formData)}`, { param: 'c' }, (err, data) => {
    if (data?.result === "error") {
      switch (data?.msg) {    
        case "0 - Please enter a value":
          alert("Please enter your email")
          break;
        case "0 - An email address must contain a single @":
          alert("Invalid email")
          break;
        default:
          if (String(data?.msg).includes("is already subscribed to list")) {
            alert("You're already on the list!")
          }
          else {
            alert("Something went wrong. Please make sure your email is correct and try again.")
          }
          break;
      }
    } else successCallback()
  });
}

function App() {
  const [email, setEmail] = useState("");
  const [btnText, setBtnText] = useState("Stay in the loop")
  const [subbed, setSubbed] = useState(false);
  return (
    <Styles>
      <img src={HeroImg} alt="festival" className="heroImg"/>
      <div className="heroWrapper">
        <h1 className="mainText">Introducing NF3, the world's first art festival <br/> celebrating creativity on the blockchain.</h1>
        <h2 className="smallText">Coming 2022</h2>
        <input 
          placeholder="Enter email" 
          className="heroInput" 
          type="email"
          autoCapitalize="off" 
          autoCorrect="off"
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}/>
        <button 
          onClick={()=>subscribeToNewsLetter({EMAIL: email}, ()=>{
            setSubbed(true);
            setBtnText(()=>(<span>You're on the list 🔥</span>)) 
          })} 
          className="heroBtn"
          disabled={subbed}>{btnText}</button>
      </div>
    </Styles>
  );
}

export default App;
