import React, { useState } from 'react';
import { Header, Icon, Segment, Grid, Form, Button, Divider, Message } from 'semantic-ui-react';
import './App.css';

function App() {
  const unlockIcon = <Icon name='unlock alternate' />;
  const downloadIcon = <Icon name='cloud download' />;
  const uploadIcon = <Icon name='upload' />;

  return (
    <div className='app' >
      <Header 
        as='h2' icon={unlockIcon} 
        content='LSB Algorithm for Steganography' 
      />
      <Segment placeholder>
        <Segment placeholder >
              <div className="input-image">
                <Icon name='file image outline' size='huge' />
              </div>
              <Button primary icon={uploadIcon} content='  Upload Image' />
        </Segment>
        <Grid columns={3} relaxed='very' stackable>
          <Grid.Column textAlign='center' width='7'>
            <Header 
              as='h3' className='subtitle-header'
              content='Encrypt a message into an image' 
            />
            
            <Form className='input-form'>
              <Form.Input placeholder='Message' size='large' />
              <Form.Button color='teal' size='large' icon={downloadIcon} content='  Download' />
            </Form>
          </Grid.Column>
          <Grid.Column width='2'>
            <Divider vertical>Or</Divider>
          </Grid.Column>
          <Grid.Column textAlign='center' width='7'>
            <Header 
              as='h3' className='subtitle-header'
              content='Decrypt a message inside an image'
            />
            <Button color='orange' size='large' icon={unlockIcon} content='  Decrypt Message'/>
            <Message icon>
              <Icon name='circle notched' loading />
              <Message.Content>
                <Message.Header>Wait a second </Message.Header>
                We are fetching that content for you.
              </Message.Content>
            </Message>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}

export default App;
