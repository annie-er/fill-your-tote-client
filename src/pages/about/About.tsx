import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-title">My story</div>
      <div className="about-content">
        <div className="about-image">
          <img src="/assets/me.png" alt="Me" />
        </div>
        <div className="about-text">
          <h1>Hi!</h1>
          <p>
            I'm Annie, a second-year student studying Computer Science at the University of Toronto. I enjoy creating visual stories on tote bags in my free time.
          </p>
          
          <p>
            I launched Fill your tote! in June of 2023 through Summer Company, in hopes of designing creative and fun tote bags for people to wear!
            My work revolves around friendship, human emotion, and love.
          </p>
          
          <p>
            I'm always looking for new ideas and collaborations, so reach out if you have anything in mind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;