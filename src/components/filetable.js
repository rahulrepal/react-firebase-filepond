import React,{Component} from 'react'
import MyStore from '../config/store'


class filetable extends Component{

    constructor(props){
        super(props);
        this.storageRef = MyStore.storage().ref();
        this.databaseRef = MyStore.database().ref();


        this.state={
            myFiles:[]
        }
    }

    componentDidMount(){
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
        })
    }

    deleteFile=(name,key)=>{

        console.log(name,key)
        this.storageRef.child(name).delete().then( ()=>{
            this.databaseRef.child(key).remove().then(()=>{
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
        })
    }
    render(){

        const files = this.state.myFiles.map( myfile =>(
            <ul>
            <li>Name : {myfile.name}</li>
            <li>contentType : {myfile.contentType}</li>
            <li><a class="text_blue" href={myfile.downloadURL} target="_blank">Download</a></li>
            <li><a class="btn_delete"onClick={this.deleteFile.bind(this,myfile.name,myfile.key)}>Delete</a></li>
            </ul>
            
        ))
        return(
            <div>
                M Table
                {files}
            </div>
        )
    }
}

export default filetable;