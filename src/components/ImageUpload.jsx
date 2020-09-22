import React, { useState, createRef } from 'react';
import { Segment, Button, Icon, Message } from 'semantic-ui-react';
import './ImageUpload.css';

const ImageUpload = props => {
  const inputRef = createRef();
  const [ iconName, setIconName ] = useState('images outline');
  const [ messageColor, setMessageColor ] = useState('grey');
  const [ message, setMessage ] = useState('.PNG or .JPG Image');

  const handleChange = event => {
    const file = event.target.files[0];
    if (!file) {
      setIconName('images outline');
      setMessageColor('grey');
      setMessage('.PNG or .JPG Image');
      return;
    }
    props.handleImageChange(file);
    setIconName('check');
    setMessageColor('success');
    setMessage('Image Uploaded');
  }

  return(
    <Segment placeholder className='image-upload-container' >
      <div className='input-image'>
      <Message
        icon={iconName}
        color={messageColor}
        header={message}
      />
      </div>
       <Button
        labelPosition='left'
        icon={<Icon name='upload' />} 
        content='  Upload Image'
        onClick={() => inputRef.current.click()}
        primary
      />
      <input
        ref={inputRef}
        type="file"
        accept='image/*'
        hidden
        onChange={handleChange}
      />
    </Segment>
  );
}

export default ImageUpload;