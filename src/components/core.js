import React from 'react'
import axios from 'axios'
import { Redirect } from "react-router";
import upload from '../upload.svg'
import Footer from './Footer'

class Core extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeTab:0,
            redirectToOuptputPage:false,
            loading:false
        
        };
        this.changeTab = this.changeTab.bind(this);
        this.uploadFileHandler = this.uploadFileHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    changeTab(tabId) {
        this.setState({
            activeTab:tabId
        });
    }
    uploadFileHandler(e) {
        this.fileUpload.click();
        
    }
    handleSubmit(e){
        e.preventDefault()
        localStorage.setItem('songName',this.fileUpload.files[0].name.split('.')[0])
        this.setState({
            loading:true
        })
        var submissionId=Math.floor(Math.random() * 100000000) + 1;
        const file = this.fileUpload.files[0]
        const formData = new FormData();
        if(file===undefined) {
            this.setState({
                error:"You must upload a file"
            })
            return
        }
        formData.append("track", file);
        formData.append("submissionId", submissionId);
        localStorage.setItem('submissionId',submissionId)
        axios.post(`http://localhost:5000/convert`,formData)
      .then(res => {
        // localStorage.setItem('Track', res.data);
        this.setState({
            redirectToOuptputPage:true
        })
      }).catch(err=>{
          console.log(err)
      })
        
    }
render(){
    if(this.state.redirectToOuptputPage===true) return <Redirect push to="/output"></Redirect>
    return(
        
        <div className="core-wrapper">
           {this.state.loading==true &&
                    <div  className={ this.state.loading==true ?"loader" : "loader loader_finished"}>
                    <h2>Your track is being processed, Please hold.</h2>
                    <div className="loader_container">
                        <div className="dot dot-1"></div>
                        <div className="dot dot-2"></div>
                        <div className="dot dot-3"></div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"/>
                        </filter>
                    </defs>
                    </svg>
                    </div>
                }
            {this.state.error!==undefined &&
            <div>error</div>}
            {this.state.loading==false &&

            <div className="upload-wrapper">
                <div className="source">
                    { this.state.activeTab==0  
                    ? <button className="active" onClick={()=>this.changeTab(0)}>Import from device</button>
                    : <button className="" onClick={()=>this.changeTab(0)}>Import from device</button>
                    }
                    { this.state.activeTab==1
                    ? <button className="active"onClick={()=>this.changeTab(1)}>Import from youtube</button>
                    : <button className=""onClick={()=>this.changeTab(1)}>Import from youtube</button>
                    }
                </div>
                <div className="upload-widget">
                    <form onSubmit={e=>this.handleSubmit(e)} action="/output" method="GET">
                        {this.state.activeTab==0 &&
                        <div id="upload">
                            <img src={upload} onClick={()=>this.uploadFileHandler()}/>
                            <h6>Upload a file with extension .mp3 or .wav</h6>
                            <br></br>
                            <input type="file"   ref={(ref) => this.fileUpload  = ref} id="file"  style={{display: "none"}}/>

                        </div>
                        }
                        {this.state.activeTab==1 &&
                        <div id="youtube">
                            <span>
                                <input className="basic-slide" id="name" type="text"  /><label for="name">URL</label>
                            </span>
                        </div>
                        }
                        <input type="submit" className="green-button" value="Start Conversion"/>
                    </form>
                </div>
            </div>
            }
            <Footer background="add_background"></Footer>
        </div>
        
    );
}


}
export default Core;