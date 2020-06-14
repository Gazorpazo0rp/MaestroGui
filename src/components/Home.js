import React from 'react';
import { Icon } from 'react-icons-kit'
import bg from '../bg.jpg'
import curve from '../curve2.png'
import guitar from '../guitarsvg.svg'
import drums from '../drumssvg.svg'
import bass from '../basssvg.svg'
import violin from '../violinsvg.svg'
import vocal from '../vocals2.svg'
import track from '../track.svg'
import logo from '../logo.png'
import network from '../network.svg'
import easy from '../easy.svg'
import fast from '../fast.svg'
import wave from '../wave.svg'
import hat from '../hat.svg'
import music_student from '../music_student.svg'
import remixer from '../dj.svg'
import composer from '../musician.svg'
import technician from '../audio-engineer.svg'
import {github} from 'react-icons-kit/icomoon/github'
import {signIn} from 'react-icons-kit/fa/signIn'
import * as Scroll from 'react-scroll';
import Footer from './Footer'

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            animate:"",
            endFirstAnimation:0,
            className:"hat animateHatonLoad"
        }
        this.handleScroll=this.handleScroll.bind(this)
        //  this.getHatClass= this.getHatClass.bind(this)
    }
    scrollTo() {
        var scroll     = Scroll.animateScroll;
        scroll.scrollTo(700);
      }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(event) {
        if (window.scrollY>900 && this.state.animate==""){
            this.setState({
                animate: "show"
            });
            
        }
    }
    updateHatState(){
        console.log(this.state.className)
        if(this.state.className=="hat animateHatonLoad" && this.state.endFirstAnimation==1){
            this.setState({className:"hat hatHoveringAnimation"})
        }
        else if(this.state.className=="hat animateHatonLoad" && this.state.endFirstAnimation==0){
            this.setState({endFirstAnimation:1})
        }
        if(this.state.className=="hat hatClickAnimation")
        {
            this.setState({className:"hat hatHoveringAnimation"})
        }
    }

    render(){
        return(
        <div className="home-wrapper" >

            <div className="home">
                <img className="bg-img" src={bg} alt="bg"/>
                
                <div className="section-one">
                    <div id="github">
                        <a>
                            <h6>View on Github &nbsp; <Icon icon={github} size="25"/></h6>
                        </a>
                    </div>
                    <div id="login">
                        <a>
                            <h6 >Login/Signup &nbsp; <Icon icon={signIn} size="25" /></h6>
                        </a>
                    </div>
                </div>
                <div className="section-two">
                    <a href="/"><img className="logo" src={logo} alt="logo icon"/></a>
                    <img  src={hat} alt="hat" 
                        onClick={()=>this.setState({className:"hat hatClickAnimation"})}
                        onAnimationEnd={()=>this.updateHatState()}
                        className={this.state.className}
                        
                    />
                    <table className=" conversions conversionsLeft" >
                        <tbody>
                            <tr>
                                <td>
                                    <img className="inst" src={track} />
                                </td>
                                <td>
                                    <img className="conversion"src={wave} />
                                </td>
                            </tr> 
                            
                        </tbody>
                    </table>
                    <h2>A NEW AI EXPERIENCE</h2>
                    <h3 style={{color:"rgb(231, 211, 24)"}}>AN OPEN SOURCE MUSIC STEMMING TOOL</h3>
                    <br></br>
                    <a href="/core"><button className=" draw-border-purple">Try it now</button></a>
                    <button className=" draw-border-purple" onClick={this.scrollTo}>Learn more</button>
                    <table className="conversions conversionsRight">
                        <tbody>
                            <tr>
                                <td>
                                    <img className="conversion"src={wave}/>
                                </td>
                                <td>
                                    <img className="inst" src={guitar}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img className="conversion"src={wave}/>
                                </td>
                                <td>
                                    <img className="inst" src={bass}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img className="conversion"src={wave}/>
                                </td>
                                <td>
                                    <img className="inst" src={drums}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img className="conversion"src={wave}/>
                                </td>
                                <td>
                                    <img className="inst" src={violin}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <img className="header-curve"src={curve} alt="cool curve"/>
            </div>
            <div className="section-three">
                <h1 >SUPPORTED EXPERIMENTALS</h1>
                <div className="instruments">
                    <div className="instrument">
                        <img src={vocal} alt="vocal"/>
                    </div>
                    <div className="instrument">
                        <img src={guitar} alt="guitar"/>
                    </div>
                    <div className="instrument">
                        <img src={drums} alt="drums"/>
                    </div>
                    <div className="instrument">
                        <img src={bass} alt="bass"/>
                    </div>
                    <div className="instrument">
                        <img src={violin} alt="violin"/>
                    </div>
                   
                </div>
                <h4>Play it on the browser, Or download it for free!</h4>
                <a href="/core" ><button className="draw-border-purple"> Start Converting</button></a>
            </div>
            <div className="section-four" >
                
                <div className="content">
                    <div className={"side left " + this.state.animate}>
                        <h4> Easy to use</h4>
                        <img src={easy} alt= "deep learning" />
                    </div>
                    <div className={"center " + this.state.animate}>
                        <h2> A DEEP LEARNING APPROACH</h2>
                        <img src={network} alt= "deep learning" />
                    </div>
                    <div className={"side right " + this.state.animate}>
                        <h4> Fast conversion</h4>
                        <img src={fast} alt= "deep learning" />
                    </div>

                </div>
            </div>
            <div className="section-five">
                <div className="borders">
                    <div className="horizontal_line"></div>
                    <div className="vertical_line"></div>
                </div>
                <div className="quarter ">
                    <h2>Music Students</h2>
                    <img src={music_student} alt="music srudent"/>
                    <h5>Generate your own backing track.</h5>
                </div>
                <div className="quarter ">
                    <h2>Composers </h2>
                    <img src={composer} alt="music srudent"/>
                    <h5>Try out new combinations.</h5>
                </div>
                <div className="quarter ">
                    <h2>Sound Engineers</h2>
                    <img src={technician} alt="music srudent"/>
                    <h5>Stemming is not an issue anymore.</h5>
                </div>
                <div className="quarter ">
                    <h2>Remixers </h2>
                    <img src={remixer} alt="music srudent"/>
                    <h5>It's never been easier!</h5>
                </div>
            </div>
            <Footer></Footer>

        </div>
        
        );
    }
}
export default Home;
