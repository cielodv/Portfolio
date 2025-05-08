import React, { useState } from 'react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const projects = [
    { id: 1, name: 'Calculator', link: '/calculator/index.html' },
    { id: 2, name: 'To-Do List', link: '/todo' },
    { id: 3, name: 'Array Objects', link: '/array_objects/index.html' },
    { id: 4, name: 'Loop', link: '/loop/index.html' },
  ];

  const styles = {
    body: {
      margin: 0,
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f9f9f9',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1f1f1f',
      padding: '1rem 2rem',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    navLinks: {
      listStyle: 'none',
      display: 'flex',
      gap: '1.5rem',
      margin: 0,
      padding: 0,
    },
    navLink: {
      textDecoration: 'none',
      color: 'white',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
    },
    navLinkHover: {
      color: '#4CAF50',
    },
    sectionWithBackground: {
      backgroundImage: 'url("/background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      padding: '8rem 2rem',
      minHeight: '120vh',
      textAlign: 'center',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '2rem',
      borderRadius: '12px',
      display: 'inline-block',
      maxWidth: '800px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    profilePic: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid white',
      marginBottom: '1rem',
    },
    footer: {
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#1f1f1f',
      color: 'white',
    },
    contactItem: {
      fontSize: '1.2rem',
      margin: '1rem 0',
    },
    icon: {
      marginRight: '0.5rem',
    },
    link: {
      color: '#fff',
      textDecoration: 'underline',
      fontWeight: '500',
      transition: 'color 0.3s ease',
    },
    projectCard: {
      backgroundColor: '#333',
      padding: '1rem',
      margin: '1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      color: '#fff',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
      textDecoration: 'none',
      width: 'calc(25% - 2rem)',
      boxSizing: 'border-box',
    },
    projectContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1rem',
      padding: '1rem 0',
    },
  };

  const handleNavLinkHover = (e, isHovering) => {
    if (isHovering) {
      e.target.style.color = styles.navLinkHover.color;
    } else {
      e.target.style.color = 'white';
    }
  };

  return (
    <div style={styles.body}>
      <nav style={styles.navbar}>
        <h1>Maria Cielo Villastique</h1>
        <ul style={styles.navLinks}>
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <li key={section}>
              <span
                style={styles.navLink}
                onClick={() => setActiveSection(section)}
                onMouseEnter={(e) => handleNavLinkHover(e, true)}
                onMouseLeave={(e) => handleNavLinkHover(e, false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {activeSection === 'home' && (
        <header style={styles.sectionWithBackground}>
          <div style={styles.overlay}>
            <img src="/profile.jpg" alt="Maria Cielo Villastique" style={styles.profilePic} />
            <h2>Maria Cielo Villastique</h2>
            <p>My Portfolio</p>
          </div>
        </header>
      )}

      {activeSection === 'about' && (
        <section style={styles.sectionWithBackground}>
          <div style={styles.overlay}>
            <h2>About Me</h2>
            <p>
              I'm Maria Cielo Villastique, 23 years old, a third-year student pursuing a Bachelor of Science in Information Technology.
              I have a passion for web development and enjoy building websites that are both functional and user-friendly.
              I'm always eager to learn new technologies and improve my skills in the tech field.
            </p>
          </div>
        </section>
      )}

      {activeSection === 'projects' && (
        <section style={styles.sectionWithBackground}>
          <div style={styles.overlay}>
            <h2>Projects</h2>
            <div style={styles.projectContainer}>
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.projectCard}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <h3>{project.name}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contact' && (
        <section style={styles.sectionWithBackground}>
          <div style={styles.overlay}>
            <h2>Contact</h2>
            <div style={styles.contactItem}>
              <span style={styles.icon}>🐙</span>
              <a href="https://github.com/cielodv" style={styles.link} target="_blank" rel="noopener noreferrer">
                github.com/cielodv
              </a>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.icon}>💼</span>
              <a href="https://linkedin.com/in/cielo-villastique-789390322?utm_source=share_via&utm_content=profile&utm_medium=android_app" style={styles.link} target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.icon}>📧</span>
              <a href="mailto:cielobaati@gmail.com" style={styles.link}>
                cielobaati@gmail.com
              </a>
            </div>
          </div>
        </section>
      )}

      <footer style={styles.footer}>
        <p>&copy; 2025 Maria Cielo Villastique. All rights reserved.</p>
      </footer>
    </div>
  );
}