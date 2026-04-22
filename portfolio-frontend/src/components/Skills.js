import React, { useState } from "react";
import "./Skills.css";

function Skills() {
  const [open, setOpen] = useState(false);

  const technicalSkills = [
    { name: "JavaScript / ES6", level: 55 },
    { name: "React.js", level: 49 },
    { name: "Node.js / Express", level: 43 },
    { name: "Python", level: 60 },
    { name: "HTML5 / CSS3", level: 65 },
    { name: "MongoDB", level: 55 },
    { name: "Git & GitHub", level: 50 },
    { name: "Data Structures", level: 51 }
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>

        {/* Center Button */}
        <div className="skills-toggle-wrapper">
          <button
            className="skills-toggle-btn"
            onClick={() => setOpen(!open)}
          >
            {open ? "Hide Skills ▲" : "Show Skills ▼"}
          </button>
        </div>

        {/* Skills Grid */}
        <div className={`skills-grid ${open ? "show" : ""}`}>
          {technicalSkills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percent">{skill.level}%</span>
              </div>

              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: skill.level + "%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;