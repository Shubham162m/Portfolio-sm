import React from "react";
import "./Projects.css";

function Projects() {
  const projects = [

        {
      id: 0,
      title: "Gujarat - Scheme List",
      description: "Student Schemes , Farmers Schemes",
      tech: ["React - Front End Only"],
      github: "#",
      live: "#"
    },
    // {
      
    //   id: 1,
    //   title: "E-Commerce Dashboard",
    //   description: "Dashboard to manage products, orders and analytics.",
    //   tech: ["React", "Node", "MongoDB"],
    //   github: "#",
    //   live: "#"
    // },
    // {
    //   id: 2,
    //   title: "Weather App",
    //   description: "Shows live weather using API.",
    //   tech: ["JS", "API", "CSS"],
    //   github: "#",
    //   live: "#"
    // },
    
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>

        <div className="projects-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.id}>
              
              <h3>{p.title}</h3>
              <p>{p.description}</p>

              <div className="tech-list">
                {p.tech.map((t, i) => (
                  <span key={i} className="tech-tag">{t}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={p.github} className="project-link github">GitHub</a>
                <a href={p.live} className="project-link live">Live</a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;