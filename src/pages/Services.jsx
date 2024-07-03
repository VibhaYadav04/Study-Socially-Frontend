import React from 'react';
import Base from "../components/Base";
import userContext from "../context/userContext";

const Services = () => {
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
    color: '#4caf50'
  };

  const subHeaderStyle = {
    fontSize: '1.5em',
    color: '#ff7043'
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
            <h1 style={headerStyle}>Services</h1>
            <h2 style={subHeaderStyle}>
              Welcome: {object.user.login && object.user.data.name}
            </h2>
            <p style={textStyle}>
              Our platform allows you to create and manage your blogs easily. Follow these steps to get started:
            </p>
            <ol style={listStyle}>
              <li style={listItemStyle}><strong>Log In:</strong> First, you need to sign in to your account. If you don't have an account, you can sign up.</li>
              <li style={listItemStyle}><strong>Create a Note:</strong> Once signed in, login to upload notes.</li>
              <li style={listItemStyle}><strong>Write Your Post:</strong> Compose your note in the editor provided. Make sure to provide detailed and valuable information.</li>
              <li style={listItemStyle}><strong>Add an Image:</strong> Upload an image that represents the content of your note.</li>
              <li style={listItemStyle}><strong>Choose a Subject:</strong> Select the appropriate subject for your note from the available options.</li>
              <li style={listItemStyle}><strong>Post It:</strong> Once you're satisfied with your note, click on the 'Create Notes' button to publish it.</li>
              <li style={listItemStyle}><strong>Update if Needed:</strong> You can always go back and update your notes if necessary.</li>
            </ol>
            <p style={textStyle}>
              Our goal is to provide a user-friendly platform that makes it easy for you to share your knowledge and insights with others.
            </p>
          </div>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default Services;
