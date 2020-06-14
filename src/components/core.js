import React from 'react'
import { Icon } from 'react-icons-kit'
import upload from '../upload.svg'
import Output from './Output'
import { useHistory } from "react-router-dom";
import Footer from './Footer'

class Core extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeTab:0
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
        this.refs.fileUploader.click();
    }
    handleSubmit(){
        const history = useHistory();
        history.push("");
    }
render(){
    return(
        <div className="core-wrapper">
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
                    <form onSubmit={this.handleSubmit} action="/output" method="GET">
                        {this.state.activeTab==0 &&
                        <div id="upload">
                            <img src={upload} onClick={()=>this.uploadFileHandler()}/>
                            <h6>Upload a file with extension .mp3 or .wav</h6>
                            <br></br>
                            <input type="file"  ref="fileUploader" id="file"  style={{display: "none"}}/>

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
            <Footer background="add_background"></Footer>
        </div>
        
    );
}


}
export default Core;