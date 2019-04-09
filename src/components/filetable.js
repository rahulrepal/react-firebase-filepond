import React,{Component} from 'react'
import MyStore from '../config/store'


class filetable extends Component{

    constructor(props){
        super(props);
        this.storageRef = MyStore.storage().ref();
        this.databaseRef = MyStore.database().ref();

        //this.componentDidMount = this.componentDidMount.bind(this);
        this.state={
            myFiles:[]
        }
    }
state={
        myFiles:this.props.myFiles
    }

   
    // componentDidMount=()=>{
    //     const id =this.props.uid
    //     this.databaseRef.child(id).on('value',snap=>{

    //         let myArr=[]

    //         console.log(snap.val())
    //         for(const key in snap.val()){
    //             myArr.push(Object.assign({},snap.val()[key].metadataFile,{key:key}));
    //             console.log(snap.val()[key].metadataFile);
    //         }

    //         if(snap.val()!=null){
    //             this.setState({
    //                 myFiles:myArr
    //             })
    //         }
    //     })
    // }

    deleteFile=(name,key)=>{

        console.log(name,key)
        this.storageRef.child(name).delete().then( ()=>{
            this.databaseRef.child(this.props.uid).child("files").child(key).remove().then(()=>{
                console.log("deleted")
                this.databaseRef.on('value',snap=>{

                    let myArr=[]
        
                    console.log(snap.val())
                    for(const key in snap.val()){
                        myArr.push(Object.assign({},snap.val()[key].metadataFile,{key:key}));
                        console.log(snap.val()[key].metadataFile);
                    }
        
                    if(snap.val()!=null){
                        this.setState({
                            myFiles:myArr
                        })
                    }
                    else{
                        this.setState({
                            myFiles:[]
                        })
                    }
                })
            })
            this.databaseRef.child(this.props.uid).child("log").push().set({
                action:`${name} deleted`,
                timestamp:new Date()
              });
        })
    }
    render(){

        const setIcon=(type)=>{
            if(type.includes("image"))
            {return <img src="static/asset/image.png" height="50px" />}
            else
            {return <img src="static/asset/docs.png"  height="50px" />}
        }
        const files = this.props.myFiles.map( myfile =>(
          
            <div  className="myFile">
                <div>{setIcon(myfile.contentType)}</div>
                <div className="info"> 
                    <h4>{myfile.name}</h4>
                    <p>{myfile.contentType}</p>
                    <div className="icons">
                    <a class="text_blue download" href={myfile.downloadURL} target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a>
                    <a class="btn_delete delete"onClick={this.deleteFile.bind(this,myfile.name,myfile.key)}><i class="fa fa-trash" aria-hidden="true"></i></a>
                    </div>
                    
                </div>
            </div>
            
        ))
        return(
            <div>
              
                {files}
            </div>
        )
    }
}

export default filetable;