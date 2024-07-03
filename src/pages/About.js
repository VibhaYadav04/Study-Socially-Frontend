import React from 'react';
import Base from "../components/Base";
import userContext from "../context/userContext";

const About = () => {
  const containerStyle = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    maxWidth: '900px',
    width: '90%',
    margin: '40px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#333'
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '2.5em',
    marginBottom: '30px',
    color: '#800080'  // Purple color
  };

  const subHeaderStyle = {
    fontSize: '1.5em',
    color: '#800080'  // Purple color
  };

  const textStyle = {
    fontSize: '1.1em',
    lineHeight: '1.6',
    color: '#555'
  };

  const listStyle = {
    fontSize: '1.1em',
    lineHeight: '1.6',
    color: '#555',
    paddingLeft: '20px'
  };

  const listItemStyle = {
    marginBottom: '10px'
  };

  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
          <div style={containerStyle}>
            <h1 style={headerStyle}>About Us</h1>
            <h2 style={subHeaderStyle}>
              Welcome: <span>{object.user.login && object.user.data.name}</span>
            </h2>
            <p style={textStyle}>
              We are building a website where teachers can convey knowledge and  share their notes. Students can clear their doubt in the discussions.  Our blog covers various computer science subjects, including:
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}><strong>Database Management Systems (DBMS):</strong> Detailed notes on database design, SQL, normalization, transactions, and more.</li>
              <li style={listItemStyle}><strong>Object-Oriented Programming (OOP):</strong> Comprehensive notes on OOP concepts, principles, design patterns, and programming languages.</li>
              <li style={listItemStyle}><strong>Networking:</strong> Extensive notes on network protocols, models, communication, security, and more.</li>
              <li style={listItemStyle}><strong>Java:</strong> Notes on Java and some of in-depth concept like SpringBoot.</li>
              <li style={listItemStyle}><strong>Operating Systems (OS):</strong> In-depth notes on OS concepts, processes, threads, memory management, file systems, and more.</li>
            </ul>
            <p style={textStyle}>
              Our mission is to provide high-quality study materials that help students understand complex concepts with ease. Join us in creating a rich resource for learners everywhere.
            </p>
          </div>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default About;
