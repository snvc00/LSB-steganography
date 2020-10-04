import React from 'react';
import { Header, Button, Message, Icon } from 'semantic-ui-react';
import './DecodeMessage.css';

const DecodeMessage = props => {
  const handleDecodeMessageOnClick = () => {
    props.findHiddenMessage();
  }

  return(
    <div>
      <Header 
        as='h3' className='subtitle-header'
        content='Decode a message inside an image'
      />
      <Message 
        icon 
        color={props.decodeStatus.color}
      >
        <Icon 
          name={props.decodeStatus.icon}
          loading={props.decodeStatus.isLoading}
        />
        <Message.Content>
          <Message.Header className='msg-header'>{props.decodeStatus.header}</Message.Header>
          {props.decodeStatus.message}
        </Message.Content>
      </Message>
      <Button 
        color='orange' size='large' 
        icon={props.icon} 
        content='  Decode Message'
        className='decode-button'
        onClick={handleDecodeMessageOnClick}  
      />
    </div>
  );
}

export default DecodeMessage;