import React from 'react';
import axios from 'axios';
import { Header, Icon, Segment, Grid, Divider } from 'semantic-ui-react';
import ImageUpload from './components/ImageUpload';
import EncryptMessage from './components/EncryptMessage';
import DecryptMessage from './components/DecryptMessage';
import './App.css';

export default class App extends React.Component {
  state = {
    image: null,
    message: '',
    encryptStatus: {
      state: 'info',
      header: 'Hide Your Message',
      message: 'Write a message and download your custom image.'
    },
    decryptStatus: {
      color: 'grey',
      header: 'Find Your Message',
      message: 'Try to find a message in the uploaded image.',
      icon: 'search',
      isLoading: false
    },
  };

  handleImageChange = file => {
    this.setState({
      image: file
    });
  }

  handleMessageChange = msg => {
    this.setState({
      message: msg
    });
  }

  downloadEncryptedImage = () => {
    const formData = new FormData();
    formData.append('message', this.state.message);
    formData.append('image', this.state.image);

    axios.post('http://localhost:4000/encode', formData).then(response => {
      var link = document.createElement('a');
      link.download = 'encoded.png';
      link.href = 'http://localhost:4000/encoded-image';
      link.target = '_blank';
      link.click();
    }).catch(error => console.log(error));
  }

  findHiddenMessage = () => {
    this.setState({
      decryptStatus: {
        color: 'info',
        header: 'Loading',
        message: 'We are finding the message, please wait.',
        icon: 'circle notched',
        isLoading: true
      }
    });
    const formData = new FormData();
    formData.append('image', this.state.image);

    axios.post('http://localhost:4000/decode', formData).then(response => {
      this.setState({
        decryptStatus: {
          color: 'success',
          header: 'Message Decoded',
          message: response.data.decodedMessage,
          icon: 'unlock',
          isLoading: false
        }
      });
    }).catch(error => console.log(error));
  }

  render() {
    const unlockIcon = <Icon name='unlock alternate' />;
    return (
      <div className='app' >
        <Header 
          as='h2' icon={unlockIcon} 
          content='LSB Algorithm for Steganography' 
        />
        <br/>
        <Segment placeholder className='container-segment'>
          <ImageUpload 
            handleImageChange={this.handleImageChange}
          />
          <Grid columns={3} relaxed='very' stackable>
            <Grid.Column textAlign='center' width='7'>
              <EncryptMessage 
                handleMessageChange={this.handleMessageChange}
                downloadEncryptedImage={this.downloadEncryptedImage}
                encryptStatus={this.state.encryptStatus}
              />
            </Grid.Column>
            <Grid.Column width='2'>
              <Divider vertical>Or</Divider>
            </Grid.Column>
            <Grid.Column textAlign='center' width='7'>
              <DecryptMessage 
                icon={unlockIcon}
                decryptStatus={this.state.decryptStatus}
                findHiddenMessage={this.findHiddenMessage}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    );
  }
}
