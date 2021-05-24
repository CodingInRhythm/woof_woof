import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Animator, ScrollContainer, ScrollPage, batch, FadeOut, MoveIn, MoveOut, Sticky } from "react-scroll-motion";
import "./Splash.css"
import github_alex from "../../images/creator_photos/github_alex.png"
import github_brent from "../../images/creator_photos/github_brent.jpg"
import slack_nurs from "../../images/creator_photos/slack_nurs.jpg"
import linkedin_zane from "../../images/creator_photos/linkedin_zane.jpg"
import js from "../../images/technologies/js_logo.png"
import python from "../../images/technologies/python_logo.png"
import flask from "../../images/technologies/flask_logo.png"
import postgres from "../../images/technologies/postgres_logo.png"
import react from "../../images/technologies/react_logo.png"
import docker from "../../images/technologies/docker_logo.png"


const SlideUp = batch(MoveIn(0,1000),MoveOut(0, -200), Sticky(), FadeOut(1, 0.8))

function Splash(){  
  const scrollToPage2 = () => {
    window.scrollTo({
      top: 1950, 
      behavior: 'smooth' 
    })
  }
  const scrollToPage3 = () => {
    window.scrollTo({
      top: 3850, 
      behavior: 'smooth' 
    })
  }

  const onScroll = () => {
    if (window.scrollY >= 1950){
      document.getElementById("scroll-btn").onclick = scrollToPage3
    }
    if (window.scrollY < 1950){
      document.getElementById("scroll-btn").onclick = scrollToPage2
    }
    if(window.scrollY > 1000 && window.scrollY < 2900){
      document.getElementById("splash_container").classList.add("splash_container-middle")
      document.getElementById("splash_container").classList.remove("splash_container-last")
    }
    if(window.scrollY < 1000){
      document.getElementById("splash_container").classList.remove("splash_container-middle")
    }
    if(window.scrollY > 2900){
      document.getElementById("splash_container").classList.add("splash_container-last")
      document.getElementById("splash_container").classList.remove("splash_container-middle")
    }
    if(window.scrollY > 3600){
      document.getElementById("scroll-btn").classList.add("hidden")
    }
    if(window.scrollY < 3600){
      document.getElementById("scroll-btn").classList.remove("hidden")
    }
    console.log(window.scrollY)
  }

  window.addEventListener('scroll', onScroll)

  useEffect(() => {
    document.getElementById("scroll-btn").onclick = scrollToPage2
  }, [])

  return (
    <div className="splash_container" id="splash_container">
      <nav className="splash_nav">
        <h1 className="nav_title">slack</h1>
        <div className="splash_nav-right">
          <Link to="/login"><div className="splash_nav-link signin_btn">Sign In</div></Link>
          <Link to="/sign-up"><div className="splash_nav-link tryout_btn">Try for free</div></Link>
        </div>
      </nav>
      <nav className="splash_scrolling_nav">
        <h1 className="splash_scolling_nav_title">slack</h1>
        <div className="splash_scrolling_nav-right">
        <Link to="/login"><div className="splash_scrolling_signin">Sign In</div></Link>
          <Link to="/sign-up"><div className="splash_scrolling_tryout">Try for free</div></Link>
        </div>
      </nav>
      <button className="scroll-btn" id="scroll-btn">Continue</button>
      <ScrollContainer className="splash_scroll_container">
        <ScrollPage page={0}>
          <Animator animation={SlideUp}>
            <div className="splash_main-1 splash_page">
              <h1 className="splash_main-1-text">Here is an amazing 
                <span className="splash_main-1-text-highlight"> Slack clone</span>
                ! Want to check it out?</h1>
              <Link to="/sign-up"><div className="splash_tryout_btn">Try for free</div></Link>
              {/*Replace image with something more appropriate*/}
              <img className="splash_img" src="https://i.pcmag.com/imagery/reviews/07td46ju7p6lLVb0QGwc5VF-6.1569479844.fit_scale.size_1028x578.jpg" alt="slack" />
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={1}>
          <Animator animation={SlideUp}>
            <div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={SlideUp}>
            <div className="splash_main-2 splash_page">
              <div className="splash_main-2-left">
                <h2>This project was build with some fun technologies</h2>
              </div>
              <div className="splash_main-2-right">
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" id="js_logo"><img src={js} class="splash-logo" alt="js-logo"/></a>
                <a href="https://docs.python.org/3/" id="python_logo"><img src={python} class="splash-logo" alt="python-logo"/></a>
                <a href="https://docs.docker.com/" id="docker_logo"><img src={docker} class="splash-logo" alt="docker-logo"/></a>
                <a href="https://reactjs.org/" id="react_logo"><img src={react} class="splash-logo" alt="react-logo"/></a>
                <a href="https://flask.palletsprojects.com/en/2.0.x/" id="flask_logo"><img src={flask} class="splash-logo" alt="flask-logo"/></a>
                <a href="https://www.postgresql.org/" id="postgres_logo"><img src={postgres} class="splash-logo" alt="postgres-logo"/></a>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={3}>
          <Animator animation={SlideUp}>
            <div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={4}>
        <Animator animation={SlideUp}>
            <div className="splash_main-3 splash_page">
              <h2>Created By</h2>
              <div className="splash_main-3-creator" id="creator-nurs">
                <img src={slack_nurs} alt="nurs-profile"></img>
                <h3>Nurs Asanov</h3>
                <a href="https://github.com/nasanov">GitHub</a>
              </div>
              <div className="splash_main-3-creator" id="creator-alex">
                <img src={github_alex} alt="alex-profile"></img>
                <h3>Alex Clough</h3>
                <a href="https://github.com/CodingInRhythm">GitHub</a>
              </div>
              <div className="splash_main-3-creator" id="creator-brent">
                <img src={github_brent} alt="brent-profile"></img>
                <h3>Brent Arimoto</h3>
                <a href="https://github.com/brentarimoto">GitHub</a>
              </div>
              <div className="splash_main-3-creator" id="creator-zane">
                <img src={linkedin_zane} alt="zane-profile"></img>
                <h3>Zane Preudhomme</h3>
                <a href="https://github.com/zpreudhomme">GitHub</a>
              </div>
            </div>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
      <br/>
      {/* <footer className="splash_footer">Hey I'm footer</footer> */}
    </div>
  )
}

export default Splash