import React,{useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

/* class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            iNum:10
        }
    }

    fnAdd=()=>{
        this.setState(state=>({iNum:state.iNum+1}))
    }

    render(){
        return (
            <div>
                <p>{ this.state.iNum }</p>
                <input type="button" value="递增" onClick={ this.fnAdd } />
            </div>
        )
    }
} */

function App(){
    const [iNum,setInum] = useState(10);
    const [aList,setAlist] = useState([]);

    useEffect(()=>{
        // console.log('start');
        // setInum(20);
        axios.get('/data.json').then(dat=>{
            //console.log( dat );
            setAlist( dat.data )
        })

    });

    return (
        <div>
            <p>{ iNum }</p>
            <input type="button" value="递增" onClick={()=>setInum( iNum +1 ) } />
            <ul>
            {
                aList.map((item,i)=><li key={i}>{ item }</li>)
            }
            </ul>
        </div>
    )
}


ReactDOM.render(<App />,document.getElementById('root'));