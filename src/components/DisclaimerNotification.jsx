import React from 'react';
import { Icon, Message } from 'semantic-ui-react';
import './DisclaimerNotification.css';

const DisclaimerNotification = () => {
  return(
    <div className='disclaimer-and-info-container'>
      <Message 
        className='disclaimer'
        icon 
        color='warning'
      >
        <Icon name='warning' />
        <Message.Content>
          <Message.Header className='msg-header'>Disclaimer</Message.Header>
          This application does not have warranty, and does not host images,
          all the uploaded images are deleted intantly. Created for educational
          purposes.
        </Message.Content>
      </Message>
      <Message 
        className='other-info'
        icon 
        color='info'
      >
        <Icon name='github square' />
        <Message.Content>
          <Message.Header className='msg-header'>About</Message.Header>
          Need to report some bugs? &nbsp; Want to contribute? &nbsp; 
          <a href="https://github.com/snvc00/lsb-steganography">Checkout the repository</a>
        </Message.Content>
      </Message>  
    </div>
  );
}

export default DisclaimerNotification;