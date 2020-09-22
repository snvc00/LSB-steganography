import React from 'react';
import { Header, Form, Icon, Message } from 'semantic-ui-react';
import './EncodeMessage.css';

const EncodeMessage = props => {
    const handleOnChangeMessage = event => {
      const message = event.target.value;
      props.handleMessageChange(message);
    }

    const handleDownloadClick = () => {
      props.downloadEncodedImage();
    }
  
    const downloadIcon = <Icon name='cloud download' />;

    return(
        <div>
            <Header 
              as='h3' className='subtitle-header'
              content='Encode a message into an image' 
            />
            <Message 
              icon 
              color={props.encodeStatus.color}
            >
              <Icon 
                name={props.encodeStatus.icon}
                loading={props.encodeStatus.isLoading}
              />
              <Message.Content>
                <Message.Header className='msg-header'>{props.encodeStatus.header}</Message.Header>
                {props.encodeStatus.message}
              </Message.Content>
            </Message>
            <Form className='input-form'>
              <Form.Input 
                placeholder='Message'
                size='large' 
                onChange={handleOnChangeMessage}
              />
              <Form.Button 
                color='teal' size='large'
                icon={downloadIcon} 
                content='  Encode Message'
                className='download-button' 
                onClick={handleDownloadClick}
              />
            </Form>
        </div>
    );
}

export default EncodeMessage;