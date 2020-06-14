import React from 'react'
import { Icon } from 'react-icons-kit'

import {facebookSquare} from 'react-icons-kit/fa/facebookSquare'
import {github} from 'react-icons-kit/icomoon/github'
import {twitterSquare} from 'react-icons-kit/fa/twitterSquare'
import {linkedinSquare} from 'react-icons-kit/fa/linkedinSquare'

class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeTab:0
        };
    }
    render(){
        return(
        <div id="footer"className={this.props.background}>
            <div className="navigate">
                <h3>Navigate</h3>
                <br></br>
                <h5><a href="/core">Convert</a></h5>
                <h5><a href="/">About Us</a></h5>
                <h5><a href="/">Docs</a></h5>
            </div>
            <div className="social">
            <Icon icon={facebookSquare} size="50"/>
            <Icon icon={github} size="50"/>
            <Icon icon={twitterSquare} size="50"/>
            <Icon icon={linkedinSquare} size="50"/>


            </div>
            <div className="contact-us">
                <h3>Contact Us</h3>
                <br></br>
                <h5><a href="#">Maestro@gmail.com</a></h5>
            </div>
            <div className="rights">
            &copy; 2020 Maestro. All rights Reserved.
            </div>
        </div>)
    }
}
export default Footer