import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { FilePond, registerPlugin,File} from "react-filepond";

//import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import Navbar from './container/navbar'
import FileTable from './components/filetable'
import Logs from './components/logs'

import firebase from 'firebase'
import MyStore from './config/store'

import Login from './container/login'
import { Provider,Consumer } from './config/context';
// Register the plugins
registerPlugin(FilePondPluginImagePreview);
class App extends Component {

  constructor(props) {
    super(props);
    this.storageRef = MyStore.storage().ref();
    this.databaseRef = MyStore.database().ref();
    this . state  = {
      files : [], // is used to store file upload information
      uploadValue :  0 , // Used to view the process. Upload
      filesMetadata : [], // Used to receive metadata from Firebase.
      rows :   [], // draw the DataTable
      messag:''
  }
}

  storageRef = MyStore.storage().ref();

  handleProcessing(fieldName, file, metadata, load, error, progress, abort) {
    // handle file upload here
    console.log(" handle file upload here");
    console.log(this.storageRef.child(file.name).fullPath);

    const fileUpload = file;
    
    const task = this.storageRef.child(file.name).put(fileUpload)

    task.on(`state_changed` , (snapshort) => {
        console.log(snapshort.bytesTransferred, snapshort.totalBytes)
        let percentage = (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
        //Process
        this.setState({
            uploadValue:percentage
        })
    } , (error) => {
        //Error
        this.setState({
            messag:`Upload error : ${error.message}`
        })
    } , () => {
        //Success
        this.setState({
            messag:`Upload Success`,
            picture: task.snapshot.downloadURL //เผื่อนำไปใช้ต่อในการแสดงรูปที่ Upload ไป
        })

        //Get metadata
        this.storageRef.child(file.name).getMetadata().then((metadata) => {
          // Metadata now contains the metadata for 'filepond/${file.name}'
          let downloadURL = ''
          this.storageRef.child(file.name).getDownloadURL().then( url =>{
            console.log(url)
            let metadataFile = { 
              name: metadata.name, 
              size: metadata.size, 
              contentType: metadata.contentType, 
              fullPath: metadata.fullPath,
              downloadURL:url
                       
          }

          //Process save metadata
  
          this.databaseRef.push({  metadataFile });
          })
         alert("Uploaded Successfully")

      }).catch(function(error) {
        console.log(error)
      });
    })
}
  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  render() {
    return (
      <Provider>
          <Consumer>
            {
              value=>{

                const {user} =value
                return(
                <div className="App container">

                   
                     
                        <FilePond
                          ref={ref => (this.pond = ref)}
                          files={this.state.files}
                          allowMultiple={true}
                          maxFiles={3}
                          server = {{process :  this . handleProcessing . bind ( this  )}}
                          oninit={() => this.handleInit()}
                        
                        >
                          { this.state.files.map(file=> (
                                <File key = {file} source = {file} />
                              ))}
                        </FilePond>
                        <main>
                          <section>
                            <FileTable
                            uid={user.uid}
                            />
                          </section>
                          <aside>
                            <Logs />
                          </aside>
                        </main>

                      </div>
                )
              }
            }
          </Consumer>
      </Provider>
    );
  }
}

export default App;
