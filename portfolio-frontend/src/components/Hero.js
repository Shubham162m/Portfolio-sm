import React from "react";
import "./Hero.css";

function Hero() {
  const studentName = "Modi Shubham";
  const studentBranch = "Computer Science & Engineering";
  const studentYear = "4th Year (7th Semester)";
  const studentCollege = "B.Tech, GUNI Mehsana";

  return (
    <section className="hero" id="home">
      <div className="hero-container">

        <div className="hero-image">
                <img 
                  src="/assets/fly.jpeg" 
                  alt="Shubham" 
                  className="hero-avatar" 
                />        
                </div>

        <div className="hero-content">
          <h1 className="hero-greeting">Hello, I'm</h1>
          <h2 className="hero-name">{studentName}</h2>

          <p className="hero-branch">{studentBranch}</p>
          <p className="hero-year">{studentYear}</p>
          <p className="hero-college">{studentCollege}</p>

           

          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Contact Me
            </a>
            <a href="#projects" className="btn btn-secondary">
              View Projects
            </a>
          </div>
        </div>
               <div class="hero-about">
                <h2>About Me</h2>
                <p>
                  I am Shubham, a B.Tech Computer Science student with a strong interest
                  in web development and data mining. I enjoy building responsive web
                  applications and exploring data to extract meaningful insights.
                </p>
              </div>
      </div>
      
    </section>
  );
}

export default Hero;