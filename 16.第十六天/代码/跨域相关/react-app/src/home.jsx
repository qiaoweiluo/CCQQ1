import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            aList:[]
        }
    }
 
    componentDidMount(){
        axios.get('/api/news').then(dat=>{
            this.setState({
                 aList:dat.data.body
            })
        })
    }
 
     render() {
         return (
             <ul>
                 {
                     this.state.aList.map(item=>(
                         <li key={item.id}>{ item.title }</li>
                     ))
                 }
             </ul>
         );
     }
 }

 export default Home;