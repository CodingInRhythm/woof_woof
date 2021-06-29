/*************************** REACT IMPORTS ***************************/
import React from 'react'

/*************************** OTHER FILE IMPORTS ***************************/

import github_alex from "../../../images/creator_photos/github_alex.png"
import github_brent from "../../../images/creator_photos/github_brent.jpg"
import slack_nurs from "../../../images/creator_photos/slack_nurs.jpg"
import linkedin_zane from "../../../images/creator_photos/linkedin_zane.jpg"

import './About.css'


/*************************** COMPONENTS ***************************/
const About = ()=>{
    return(
        <div className='about__div'>
            <h2 className='about__header'>Developers</h2>
            <h2 className='about__repo'><a href="https://github.com/CodingInRhythm/woof_woof" target="_blank" rel="noopener noreferrer">(WoofWoof Repo)</a></h2>
            <div className="about_main-3-creator" id="about-nurs">
                <img src={slack_nurs} alt="nurs-profile"></img>
				<a href='https://nasanov.github.io/' target="_blank" rel="noopener noreferrer"><h3>Nurs Asanov</h3></a>
                <div className="about_main-3-links">
                    <a href="https://www.linkedin.com/in/nursultan-asanov/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    <a href="https://github.com/nasanov"><i className="fab fa-github"></i></a>
                </div>
            </div>
            <div className="about_main-3-creator" id="about-alex">
                <img src={github_alex} alt="alex-profile"></img>
                <h3>Alex Clough</h3>
                <div className="about_main-3-links">
                    <a href="https://www.linkedin.com/in/alex-clough-710546200/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    <a href="https://github.com/CodingInRhythm"><i className="fab fa-github"></i></a>
                </div>
            </div>
            <div className="about_main-3-creator" id="about-brent">
                <img src={github_brent} alt="brent-profile"></img>
                <a href='https://brentarimoto.github.io/' target="_blank" rel="noopener noreferrer"><h3>Brent Arimoto</h3></a>
                <div className="about_main-3-links">
                    <a href="https://www.linkedin.com/in/brent-arimoto/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    <a href="https://github.com/brentarimoto" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                </div>
            </div>
            <div className="about_main-3-creator" id="about-zane">
                <img src={linkedin_zane} alt="zane-profile"></img>
                <a href='https://zpreudhomme.github.io/' target="_blank" rel="noopener noreferrer"><h3>Zane Preudhomme</h3></a>
                <div className="about_main-3-links">
                    <a href="https://www.linkedin.com/in/zane-preudhomme-4473a8128/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    <a href="https://github.com/zpreudhomme"><i className="fab fa-github"></i></a>
                </div>
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default About;
