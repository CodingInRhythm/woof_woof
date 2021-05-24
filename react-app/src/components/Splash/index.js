import React from 'react';
import { Link } from 'react-router-dom';
import { Animator, ScrollContainer, ScrollPage, batch, Fade,Zoom, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn, ZoomOut } from "react-scroll-motion";
import "./Splash.css"
import LogoutButton from '../auth/LogoutButton'
const FadeUp = batch(Fade(.1,1), Move(), Sticky(50))

function Splash(){
  return (
    <div classname="splash_container">
      <nav className="splash_nav">
        <h1 className="nav_title">Slack</h1>
        <div className="splash_nav-right">
          <Link to="/login" className="splash_nav-link signin_btn">Sign In</Link>
          <Link to="/sign-up" className="splash_nav-link tryout_btn">Try Out</Link>
        </div>
      </nav>
      <ScrollContainer className="splash_scroll_container">
        <ScrollPage page={0}>
          <Animator animation={FadeUp}>
            <div className="splash_main-1">
              <h3>Here is an amazing Slack clone!</h3><br/>
              <h4>Want to check it out?</h4>
              <Link to="/sign-up">Try Out</Link>
			  <LogoutButton />
              <img className="splash_img" src="https://i.pcmag.com/imagery/reviews/07td46ju7p6lLVb0QGwc5VF-6.1569479844.fit_scale.size_1028x578.jpg" alt="slack" />
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={1}>
          <Animator animation={FadeUp}>
            <div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={FadeUp}>
            <div className="splash_main-2">
              <h2>I'm Page 2!!!</h2>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={3}>
          <Animator animation={FadeUp}>
            <div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={4}>
        <Animator animation={FadeUp}>
            <div className="splash_main-3">
              <h2>I'm Page 3!!!</h2>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={5}>
          <Animator animation={FadeUp}>
            <div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage page={6}>
        <Animator animation={FadeUp}>
            <div className="splash_main-4">
              <h2>I'm Page 4!!!</h2>
            </div>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </div>
  )
}

export default Splash
