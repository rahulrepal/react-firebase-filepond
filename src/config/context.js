import React,{Component} from 'react';
import firebase from 'firebase';
import MyStore from './store'

const Context=React.createContext();

const reducer = (state,action)=>{
     
    switch(action.type){
        
        default:
        return state;
    }
}
export class Provider extends Component{

    constructor(){
        super()

       
    this.database=MyStore.database().ref();
    this.authStateListner();
    }
       
      authStateListner=()=>{
        MyStore.auth().onAuthStateChanged((user)=>{
             if(user){
                 this.setState({user:user});

             }
             else{
                 this.setState({user:null})
             }
         })
      }

      componentDidMount(){

    
      
        

          
      }
    state={
      
        user:{},
    
   

        dispatch:action=>{
            this.setState(state=>reducer(state,action))
        }

    }

    render(){
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;