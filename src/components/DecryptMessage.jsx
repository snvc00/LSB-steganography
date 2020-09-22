import React from 'react';
import { Header, Button, Message, Icon } from 'semantic-ui-react';
import './DecryptMessage.css';

// circle notched loading, comment alternate outline and unlock
const DecryptMessage = props => {
  const handleDecryptMessageOnClick = () => {
    props.findHiddenMessage();
  }

  return(
    <div>
      <Header 
        as='h3' className='subtitle-header'
        content='Decrypt a message inside an image'
      />
      <Message 
        icon 
        color={props.decryptStatus.color}
      >
        <Icon 
          name={props.decryptStatus.icon}
          loading={props.decryptStatus.isLoading}
        />
        <Message.Content>
          <Message.Header className='msg-header'>{props.decryptStatus.header}</Message.Header>
          {props.decryptStatus.message}
        </Message.Content>
      </Message>
      <Button 
        color='orange' size='large' 
        icon={props.icon} 
        content='  Decrypt Message'
        className='decrypt-button'
        onClick={handleDecryptMessageOnClick}  
      />
    </div>
  );
}

export default DecryptMessage;