
import React from 'react'

import audio from "../vocals.wav"
import audio2 from "../other.wav"
import audio3 from "../bass.wav"
import audio4 from "../drums.wav"
import { Icon } from 'react-icons-kit'
import {ic_play_circle_filled} from 'react-icons-kit/md/ic_play_circle_filled'
import {ic_pause_circle_filled} from 'react-icons-kit/md/ic_pause_circle_filled'
import {volume_2} from 'react-icons-kit/ikons/volume_2'
import {volume_off} from 'react-icons-kit/ikons/volume_off'
import {cloudDownload} from 'react-icons-kit/icomoon/cloudDownload'
import WaveSurfer from 'wavesurfer.js';
import guitar from '../guitarsvg.svg'
import drums from '../drumssvg.svg'
import bass from '../basssvg.svg'
import vocal from '../vocals2.svg'
import Footer from './Footer'

let ctx, center_x, center_y, radius, x_end, y_end, bar_height;
const width = window.innerWidth;
const height = window.innerHeight;
const bars = 555;
const bar_width = 1;
radius = 0;
center_x = width / 2;
center_y = height / 2;

class Output extends React.Component{
    constructor(props){
        super(props)
        this.canvas = React.createRef()
        var x="'"+String(this.cursorPosition)+"px'"
        this.state={
            loading:true,
            displayOutput:false,
            playing:false,
            playerWidth:800,
            playerHeight:200,
            volume0:false,
            volume1:false,
            volume2:false,
            volume3:false,
            status:0,
            cursorPosition:0,
            muted_instruments:[false,false,false,false],
            audiosLoaded:false,
            playRate:"1x"

        }
        this.wavesurferArray=new Array(4)
        this.play_pause=this.play_pause.bind(this)
        this.volumeHandler=this.volumeHandler.bind(this)
        this.updateVolume=this.updateVolume.bind(this)
        this.updateCursor=this.updateCursor.bind(this)
        this.toggle_mute=this.toggle_mute.bind(this)
        this.updatePlayRate=this.updatePlayRate.bind(this)
    }
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    componentDidMount(){
        var waveOptions={
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple',
            cursorColor:"rgb(86, 68, 117)",
            cursorWidth:1,
            autoCenter: true,
            barHeight:2,
            barMinHeight:2,
            hideScrollbar:true,
            barRadius:2,
            barWidth:2,
            height:100,
            interact:false,
            normalize:true,
            fillParent:true,
        }
        this.timeout = setTimeout(
            function(){
               this.setState({
                   loading:false
               })
               this.setState({
                   displayOutput:true,
                   audiosLoaded:true
               });
               }.bind(this),
           8000,
       );
        this.wavesurferArray[0] = WaveSurfer.create(waveOptions);
        this.wavesurferArray[0].load(audio)
        waveOptions.container='#waveform1'
        this.wavesurferArray[1] = WaveSurfer.create(waveOptions);
        this.wavesurferArray[1].load(audio2)
        waveOptions.container='#waveform2'
        this.wavesurferArray[2] = WaveSurfer.create(waveOptions);
        this.wavesurferArray[2].load(audio3)
        waveOptions.container='#waveform3'
        this.wavesurferArray[3] = WaveSurfer.create(waveOptions);
        this.wavesurferArray[3].load(audio4)
        //this function handles key click
        document.body.addEventListener('keydown',function(event){
            event.preventDefault()
            var currentTime=this.wavesurferArray[0].getCurrentTime()
            var duration= this.wavesurferArray[0].getDuration()
            
            if(event.key == "ArrowRight"){
                currentTime+=5
                for(var i=0;i<4;i++){
                    var seekto=Math.min(currentTime/duration,1)
                    this.wavesurferArray[i].seekTo(seekto);
                }
            }
            else if (event.key=="ArrowLeft"){
                currentTime-=5
                for(var i=0;i<4;i++){
                    var seekto=Math.max(currentTime/duration,0)
                    this.wavesurferArray[i].seekTo(seekto);
                }
            }
            else if (event.key==" "){
                
                this.play_pause()
            }
            else{
                console.log(event.key)
            }
        }.bind(this))
    }
    componentWillUnmount(){
        clearTimeout(this.timeout)
    }
    play_pause(){
        var guitar= document.getElementById("guitarPlayer")
        var violin= document.getElementById("violinPlayer")
        var drums= document.getElementById("drumsPlayer")
        var bass= document.getElementById("bassPlayer")
        
        if (this.state.playing==false){
            for(var i=0;i<4;i++){
                this.wavesurferArray[i].play();
            }
            this.setState({status:1})
        }
        else{
            for(var i=0;i<4;i++){
                this.wavesurferArray[i].pause();
            }
            this.setState({status:2})
        }
        this.setState({playing: ! this.state.playing},)
    }
    volumeHandler(show,id){
        this.setState({
            [id]:show
        })
    }
    updateVolume(elementId){
        var element= document.getElementById("volume_bar_"+elementId)
        var waveName="wavesurfer"+elementId
        this.wavesurferArray[elementId].setVolume(element.value/100)
        if(element.value==0 ){
            var muted=this.state.muted_instruments
            muted[elementId]=true
            this.setState({
            muted_instruments:muted
        })
        }
        else{
            var muted=this.state.muted_instruments
            muted[elementId]=false
            this.setState({
            muted_instruments:muted
            })
        }
    }
    toggle_mute(elementId){
        var element= document.getElementById("volume_bar_"+elementId)
        var waveName="wavesurfer"+elementId
        if(this.wavesurferArray[elementId].getVolume()>0){
            this.wavesurferArray[elementId].setVolume(0)
            element.value=0
        }
        else{
            this.wavesurferArray[elementId].setVolume(1)
            element.value=100
            
        }
        var muted=this.state.muted_instruments
        muted[elementId]=!muted[elementId]
        this.setState({
            muted_instruments:muted
        })
    }
    getPos(el) {
        // yay readability
        for (var lx=0, ly=0;
             el != null;
             lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return lx;
    }
    updateCursor(event){
        var element=document.getElementById("waveform").firstChild
        var waveformWidth=element.offsetWidth 
        var start_offset=this.getPos(element)
        var click_offset=event.clientX
        var ratio=(click_offset- start_offset)/waveformWidth
        for(var i=0;i<4;i++){
            this.wavesurferArray[i].seekTo(ratio)
        }
    }
    updatePlayRate(event){
        var rate= parseFloat(event.target.id.replace('x',''))
        this.setState({playRate:event.target.id})
        console.log(rate)
        for(var i=0;i<4;i++){
            this.wavesurferArray[i].setPlaybackRate(rate)
        }
    }
    render(){
        return(
            <div className="output_and_loader_wrapper">

                {this.state.displayOutput==false &&
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
                <div className={this.state.displayOutput==false ?"output-wrapper" :"output-wrapper output-wrapper-loaded"}
                    onKeyDown={this.handleKeyPress}>          
                    <div className="output-only-container">        
                        <div id="player_header">
                            <h2> { this.state.playing==false ?<Icon className="icon play-icon" icon={ic_play_circle_filled} size="100" onClick={()=>this.play_pause()}/>
                                :<Icon className="icon pause-icon" icon={ic_pause_circle_filled} size="100" onClick={()=>this.play_pause()}/>}
                            </h2>
                            <div className="text">
                            <h2>A classic education - NightOwl</h2>
                            <h4 id="playing" className={ this.state.status==0 ? "playing" : ""}>Click to play</h4>
                            <h4 id="playing" className={ this.state.status==1 ? "playing" : ""}>playing</h4>
                            <h4 id="paused" className={ this.state.status==2 ? "paused" : ""}>Paused</h4>
                            </div>
                            <div className="playbackSpeed">
                                <h5>Playback rate</h5>
                               <button className={this.state.playRate=="0.5x" ? "speed active" : "speed"} id="0.5x" onClick={(e)=>this.updatePlayRate(e)}>0.5x </button>
                               <button className={this.state.playRate=="0.75x" ? "speed active" : "speed"} id="0.75x" onClick={(e)=>this.updatePlayRate(e)}>0.75x </button>
                               <button className={this.state.playRate=="1x" ? "speed active" : "speed"} id="1x" onClick={(e)=>this.updatePlayRate(e)}>1x </button>
                               <button className={this.state.playRate=="1.25x" ? "speed active" : "speed"} id="1.25x" onClick={(e)=>this.updatePlayRate(e)}>1.25x </button>
                               <button className={this.state.playRate=="1.5x" ? "speed active" : "speed"} id="1.5x" onClick={(e)=>this.updatePlayRate(e)}>1.5x </button>
                            </div>
                        </div>
                        <div className="instrument_player">
                            <div id="cursor" style={{left:this.state.cursorPosition}}>
                            </div>
                            <div 
                                onMouseEnter={() => this.volumeHandler(true,"volume0")}
                                onMouseLeave={() => this.volumeHandler(false,"volume0")} 
                                className={this.state.volume0 ? "volume_wrapper active": "volume_wrapper"}
                                >
                                { this.state.muted_instruments[0]==false?
                                <Icon icon={volume_2} className="icon" size="30" onClick={()=>this.toggle_mute(0)}></Icon>
                                :<Icon icon={volume_off} className="icon" size="38" onClick={()=>this.toggle_mute(0)}></Icon>
                            }
                                <input onClick={()=>this.updateVolume(0)} id="volume_bar_0"className="volume_bar" type="range" min="1" max="100" />
                            </div>
                            <div className="waveContainer">
                                <div id="waveform" className="waveform" onClick={(e)=>this.updateCursor(e)}>
                            </div>
                            </div>
                            
                            <img className="output_inst" src={vocal} />
                            <Icon icon={cloudDownload} className="download_stem" size="50"></Icon>
                        </div>
                        <div className="instrument_player">
                            <div  
                                onMouseEnter={() => this.volumeHandler(true,"volume1")}
                                onMouseLeave={() => this.volumeHandler(false,"volume1")} 
                                className={this.state.volume1 ? "volume_wrapper active": "volume_wrapper"}
                                >
                                { this.state.muted_instruments[1]==false?
                                <Icon icon={volume_2} className="icon" size="30" onClick={()=>this.toggle_mute(1)}></Icon>
                                :<Icon icon={volume_off} className="icon" size="38" onClick={()=>this.toggle_mute(1)}></Icon>
                            }
                                <input id="volume_bar_1" onClick={()=>this.updateVolume(1)}className="volume_bar" type="range" min="1" max="100" />
                            </div>
                            <div className="waveContainer">
                                <div id="waveform1" className="waveform" onClick={(e)=>this.updateCursor(e)}>
                                </div>
                            </div>
                            <img className="output_inst" src={guitar} />
                            <Icon icon={cloudDownload} className="download_stem" size="50"></Icon>
                        </div>
                        <div className="instrument_player">
                            <div  
                                onMouseEnter={() => this.volumeHandler(true,"volume2")}
                                onMouseLeave={() => this.volumeHandler(false,"volume2")} 
                                className={this.state.volume2 ? "volume_wrapper active": "volume_wrapper"}
                                >
                                { this.state.muted_instruments[2]==false?
                                <Icon icon={volume_2} className="icon" size="30" onClick={()=>this.toggle_mute(2)}></Icon>
                                :<Icon icon={volume_off} className="icon" size="38" onClick={()=>this.toggle_mute(2)}></Icon>
                            }
                                <input id="volume_bar_2" onClick={()=>this.updateVolume(2)}className="volume_bar" type="range" min="1" max="100" />
                            </div>
                            <div className="waveContainer">
                                <div id="waveform2" className="waveform" onClick={(e)=>this.updateCursor(e)}>
                                </div>
                            </div>
                            
                            <img className="output_inst" src={bass} />
                            <Icon icon={cloudDownload} className="download_stem" size="50"></Icon>
                        </div>
                        <div className="instrument_player">
                            <div  
                                onMouseEnter={() => this.volumeHandler(true,"volume3")}
                                onMouseLeave={() => this.volumeHandler(false,"volume3")} 
                                className={this.state.volume3 ? "volume_wrapper active": "volume_wrapper"}
                                >
                                { this.state.muted_instruments[3]==false?
                                    <Icon icon={volume_2} className="icon" size="30" onClick={()=>this.toggle_mute(3)}></Icon>
                                    :<Icon icon={volume_off} className="icon" size="38" onClick={()=>this.toggle_mute(3)}></Icon>
                                }
                                <input id="volume_bar_3"className="volume_bar"onClick={()=>this.updateVolume(3)} type="range" min="1" max="100" />
                            </div>
                            <div className="waveContainer">
                                <div id="waveform3" className="waveform" onClick={(e)=>this.updateCursor(e)}>
                                </div>
                            </div>
                            <img className="output_inst" src={drums} />
                            <Icon icon={cloudDownload} className="download_stem" size="50"></Icon>
                        </div>
                    </div>  
                    <Footer 
                background="add_background"></Footer>
                </div>
                

            </div>
        );
    }
}

export default Output;