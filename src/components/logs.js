import React from 'react'

const logs =(props) =>{

    const mylogs = props.myLogs.map( log =>(
        <p className="log">{log}</p>
    ))
    return(
        <div className="logs">
        <h3>Logs</h3>
            {mylogs}
     
        </div>
    )
}

export default logs;