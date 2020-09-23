import React from 'react';
import axios from 'axios';
import { Header, Icon, Segment, Grid, Divider } from 'semantic-ui-react';
import ImageUpload from './components/ImageUpload';
import EncodeMessage from './components/EncodeMessage';
import DecodeMessage from './components/DecodeMessage';
import DisclaimerNotification from './components/DisclaimerNotification';
import './App.css';

export default class App extends React.Component {
  state = {
    image: null,
    message: '',
    encodeStatus: {
      color: 'grey',
      header: 'Hide Your Message',
      message: 'Write a message and download your custom image.',
      icon: 'info',
      isLoading: false
    },
    decodeStatus: {
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

  downloadEncodedImage = () => {
    if (!this.state.image) {
      this.setMissingImageException('encodeStatus');
      return;
    }

    const imageType = this.state.image.type ? this.state.image.type : null;

    if (imageType !== 'image/jpeg' && imageType !== 'image/png') {
      this.setMissingImageException('encodeStatus');
      return;
    }

    if (this.state.message.length < 1 || this.state.message.length > 128) {
      this.setInvalidMessageException();
      return;
    }

    this.setState({
      encodeStatus: {
        color: 'info',
        header: 'Loading',
        message: 'We are hidding the message, please wait.',
        icon: 'circle notched',
        isLoading: true
      }
    });

    const formData = new FormData();
    formData.append('message', this.state.message);
    formData.append('image', this.state.image);

    axios.post('http://localhost:4000/encode', formData).then(response => {
      var link = document.createElement('a');
      link.download = 'encoded.png';
      link.href = 'http://localhost:4000/encoded-image';
      link.target = '_blank';
      link.click();
      
      this.setState({
        encodeStatus: {
          color: 'success',
          header: 'Message Encoded',
          message: 'Please download the image in the new tab.',
          icon: 'lock',
          isLoading: false
        }
      });
    }).catch(error => {
      this.handleRequestError('encodeStatus', error);
    });
  }

  findHiddenMessage = () => {
    if (!this.state.image) {
      this.setMissingImageException('decodeStatus');
      return;
    }

    this.setState({
      decodeStatus: {
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
        decodeStatus: {
          color: 'success',
          header: 'Message Decoded',
          message: response.data.decodedMessage,
          icon: 'unlock',
          isLoading: false
        }
      });
    }).catch(error => {
      this.handleRequestError('decodeStatus', error);
    });
  }

  setMissingImageException = exceptionTarget => {
    var updatedState = this.state;
    updatedState[exceptionTarget] = {
      color: 'error',
      header: 'Error',
      message: 'Please, load a valid image first',
      icon: 'x',
      isLoading: false
    }

    this.setState(updatedState);
  }

  handleRequestError = (exceptionTarget, error) => {
    var updatedState = this.state;
    updatedState[exceptionTarget] = {
      color: 'error',
      header: 'Error',
      message: error.toString() + ', please try again.',
      icon: 'x',
      isLoading: false
    }

    this.setState(updatedState);
  }

  setInvalidMessageException = () => {
    this.setState({
      encodeStatus: {
        color: 'error',
        header: 'Error',
        message: 'Remember, the length of your message goes from 1 to 128 characters.',
        icon: 'x',
        isLoading: false
      }
    });
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
              <EncodeMessage 
                handleMessageChange={this.handleMessageChange}
                downloadEncodedImage={this.downloadEncodedImage}
                encodeStatus={this.state.encodeStatus}
              />
            </Grid.Column>
            <Grid.Column width='2'>
              <Divider vertical>Or</Divider>
            </Grid.Column>
            <Grid.Column textAlign='center' width='7'>
              <DecodeMessage 
                icon={unlockIcon}
                decodeStatus={this.state.decodeStatus}
                findHiddenMessage={this.findHiddenMessage}
              />
            </Grid.Column>
          </Grid>
          <DisclaimerNotification />
        </Segment>
      </div>
    );
  }
}
