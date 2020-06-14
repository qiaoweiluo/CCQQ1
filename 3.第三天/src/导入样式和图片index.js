import React from 'react';
import ReactDOM from 'react-dom';
import  './main.css';
import mypic from './8630c7e9046666aa39fb2e5270b73527.jpg';
// PWA技术 取代app
// import * as serviceWorker from './serviceWorker';

class App extends React.Component{
    render(){
        return (
           <div>
               <h1>你好</h1>
               <img src= { mypic } alt=""/>
           </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

