import React from 'react'
import MyStore from '../config/store'
const navbar =(props) =>{

    const Name=String(props.name).split(" ");
    const Fname=Name[0];
    const logMeOut=()=>{
        MyStore.auth().signOut();
    }
    return(
        <nav>
           <div className="user">
           <img src={props.img} className="rounded-circle" style={{width:'45px',border:'3px solid white',borderRadius:'25px'}} align="middle"/>
                <span style={{padding:'1rem'}}>Hello, {Fname}</span>
                <button className="logout" onClick={logMeOut}>
                Log Out
           </button>
           </div>
        
        </nav>
    )
}

export default navbar;