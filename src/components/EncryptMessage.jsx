import React from 'react';
import { Header, Form, Icon, Message } from 'semantic-ui-react';
import './EncryptMessage.css';

const EncryptMessage = props => {
    const handleOnChangeMessage = event => {
      const message = event.target.value;
      props.handleMessageChange(message);
    }

    const handleDownloadClick = () => {
      props.downloadEncryptedImage();
    }
  
    const downloadIcon = <Icon name='cloud download' />;

    return(
        <div>
            <Header 
              as='h3' className='subtitle-header'
              content='Encrypt a message into an image' 
            />
            <Message
              header={props.encryptStatus.header}
              content={props.encryptStatus.message}
              color={props.encryptStatus.state}
            />
            <Form className='input-form'>
              <Form.Input 
                placeholder='Message'
                size='large' 
                onChange={handleOnChangeMessage}
              />
              <Form.Button 
                color='teal' size='large'
                icon={downloadIcon} 
                content='  Download'
                className='download-button' 
                onClick={handleDownloadClick}
              />
            </Form>
        </div>
    );
}

export default EncryptMessage;

/*
  encryptStatus: {
      state: 'success',
      header: 'Hide Your Message',
      message: 'Write a message and download your custom image.'
  }

  encryptStatus: {
      state: 'info',
      header: 'Hide Your Message',
      message: 'Write a message and download your custom image.'
  }

  encryptStatus: {
      state: 'error',
      header: 'Hide Your Message',
      message: 'Write a message and download your custom image.'
  }


*/