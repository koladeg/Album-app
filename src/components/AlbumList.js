// import libraries for App
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions, View } from 'react-native';
import { Container } from 'native-base';
import Axios from 'axios';
import Head from './head';
import AlbumDetail from './AlbumDetail';
import AudioTab from './AudioTab';

import REACT_APP_INSTA_API_KEY from '../config_keys'

// components for app
const { height } = Dimensions.get("window");
const ACCESS_TOKEN = '6787209045.dafe93c.36d90099478342788a6e8ffe7730bf6a'

class AlbumList extends Component {
  state = {
    beats: [],
    currentBeatId: null,
   };

  componentWillMount() {
    Axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${REACT_APP_INSTA_API_KEY}`)
      .then(response => this.setState({ beats: response.data.data }));
  }
  setCurrentBeat = (beatId) => {
    this.setState({
      currentBeatId: beatId,
    });
  };
  unSetCurrentBeat = (beatId) => {
    this.setState({
      currentBeatId: null,
    });
  };
  renderAlbums() {
    return this.state.beats.map(beat => {
      if (typeof beat.videos != 'undefined')
      return <AlbumDetail key={beat.id} beat={beat} onItemPress={this.setCurrentBeat} />
    });
  }
  currentbeat = () => {
    return this.state.beats.find(
      (beat) => beat.id === this.state.currentBeatId
    );
  };

  render() {

    if (this.state.currentBeatId){
      return (
        <AudioTab beat={this.currentbeat()}
          onBack={this.unSetCurrentBeat} >
          <Head headerText={'Afrobeat Factory'} />
          <ScrollView>
            {this.renderAlbums()}
          </ScrollView>
        </AudioTab>
      );
    }
   return (
    <Container>
      <Head headerText={'Afrobeat Factory'} />
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    </Container>
    );
  }
}

export default AlbumList;
