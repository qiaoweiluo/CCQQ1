import React from 'react';
import {HashRouter,Route } from 'react-router-dom'
import Home from './home'


class App extends React.Component {   
     render() {
         return (
            <HashRouter>
                <Route path="/home" component={ Home } />
            </HashRouter>
         );
     }
 }

 export default App;