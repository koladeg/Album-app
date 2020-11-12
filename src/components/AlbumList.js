// import libraries for App
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import Axios from 'axios';
import Head from './head';
import AlbumDetail from './AlbumDetail';
import AudioTab from './AudioTab';

import { API_KEY } from '../config_keys'

// components for app
const { height } = Dimensions.get("window");
const ACCESS_TOKEN = '6787209045.dafe93c.120546725a06496f9a5f9d9884d655e5'

class AlbumList extends Component {
  state = {
    beats: [],
    currentBeatId: null,
    cart:[],
    modalVisible: false,
    isLoading: true,
   };

  componentWillMount() {
    Axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${ACCESS_TOKEN}`)
      .then(response => this.setState({ beats: response.data.data, isLoading: false }));
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
  setCart = (beatId) => {
    var track = beatId;
    var arr = this.state.cart;
    arr.push(track);
    this.setState({cart: arr});
  };
  setModalVisible= (visible) => {
    this.setState({modalVisible: visible});
  }
  renderAlbums() {
    return this.state.beats.map(beat => {
      if (typeof beat.videos != 'undefined')
      return <AlbumDetail key={beat.id} beat={beat}
        onItemPress={this.setCurrentBeat}
        onCartPress={this.setCart}
       />
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
          onBack={this.unSetCurrentBeat}
          onCartPress={this.setCart}
          >
          <Head headerText={'Afrobeat Factory'}  cart={this.state.cart}/>
          <ScrollView>
            {this.renderAlbums()}
          </ScrollView>
        </AudioTab>
      );
    }
   return this.state.isLoading? (
     <Container>
       <Head headerText={'Afrobeat Factory'} cart={this.state.cart}/>
       <View style={styles.container}>
         <ActivityIndicator size= "large" color="grey" />
       </View>
     </Container>
     ):(
    <Container>
      <Head headerText={'Afrobeat Factory'} cart={this.state.cart}/>
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AlbumList;
