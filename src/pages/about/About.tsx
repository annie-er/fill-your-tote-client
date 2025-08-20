import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-image">
        <img src="../images/profile.jpg" alt="About me" />
      </div>
      <div className="about-text">
        <h1>Annie Rong</h1>
        <p>
          Annie Rong is a second-year student studying Computer Science at the University of Toronto. She is based in Richmond Hill, creating visual stories
          on tote bags in her free time.  

          She launched Fill your tote! in June of 2023, in hopes of designing creative and fun tote bags for people to wear! Her work revolves around friendship, 
          human emotion, and love. 

          Selected clients: Richmond Hill Fire Services, Cozy Grotto, Mr. Surprise.  

          Unimportant note: Annie is a hopeless cat lover... 
        </p>
      </div>
    </div>
  );
};

export default About;
