import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image,
  Slider,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default class AudioTab extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isScrollEnabled: false,
    mute: false,
    shouldPlay: true,
  }
  handlePlayAndPause = () => {
    this.setState((prevState) => ({
       shouldPlay: !prevState.shouldPlay
    }));
  }

  handleVolume = () => {
   this.setState(prevState => ({
     mute: !prevState.mute,
   }));
 }
  componentWillMount() {
    this.scrollOffset = 0

    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 80 })

    this.panResponder = PanResponder.create({

      onMoveShouldSetPanResponder:(evt, gestureState) => {

        if((this.state.isScrollEnabled && this.scrollOffset <= 0 &&
          gestureState.dy > 0) || !this.state.isScrollEnabled && gestureState.dy < 0){
            return true;
          } else {
            return false;
          }
      },
      onPanResponderGrant:(evt, gestureState) => {
        this.animation.extractOffset()
      },
      onPanResponderMove:(evt, gestureState) => {
        this.animation.setValue({x:0, y: gestureState.dy})

      },
      onPanResponderRelease:(evt, gestureState) => {
        if(gestureState.moveY > SCREEN_HEIGHT - 120)
        {
          Animated.spring( this.animation.y,{
            toValue: 0,
            tension: 1
          }).start()
        }
        else if (gestureState.moveY < 120)
         {
           Animated.spring( this.animation.y,{
             toValue: 0,
             tension: 1
           }).start()
        }
        else if(gestureState.dy < 0)
        {
          this.setState({
            isScrollEnabled : true
          });
          Animated.spring(this.animation.y,{
            toValue: -SCREEN_HEIGHT + 120,
            tension: 1
          }).start()
        }
        else if (gestureState.dy > 0)
        {
          this.setState({
            isScrollEnabled : false
          });
          Animated.spring(this.animation.y,{
            toValue: SCREEN_HEIGHT - 120,
            tension: 1
          }).start()

        }

      }
    })
  }
  render() {
    const { beat, onBack } = this.props;
    const VID_WIDTH = SCREEN_WIDTH - 200;
    const VID_HEIGHT = SCREEN_HEIGHT - 200;
    let title = beat.caption.text.split('|')[0].replace(/\W/g, '');
    let imageUri = beat.images.standard_resolution.url;
    let videoUri = beat.videos.standard_resolution.url;
    let artist = artist
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    }
    animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [200, 32],
      extrapolate: "clamp"
    })
    animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    })
    animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_WIDTH / 2 - 100, 10],
      extrapolate: "clamp"
    })
    animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_HEIGHT / 2 , 90],
      extrapolate: "clamp"
    })
    animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    })
    animatedBackgroundColor = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: ['rgba(0,0,0,0.5)', 'white'],
      extrapolate: "clamp"
    })

    return (
      <Animated.View style={{ flex: 1, backgroundColor:
         animatedBackgroundColor }}>
         <View style={{ flex:1}}>
          {this.props.children}
         </View>
        <Animated.View {... this.panResponder.panHandlers}
        style={[animatedHeight, {
          position: 'absolute',
          left: 0,
          right: 0,
          height: SCREEN_HEIGHT,
          backgroundColor:'white',
          zIndex: 10,
        }]}>
        <ScrollView
          scrollEnabled={this.state.isScrollEnabled}
          scrollEventThrottle={16}
          onScroll={event=>{
            this.scrollOffset = event.nativeEvent.contentOffset.y
          }}
        >
          <Animated.View
            style={{ height: animatedHeaderHeight, borderTopWidth: 1, borderTopColor:"#febe5e5",
            flexDirection: 'row', alignItems: 'center'}}
          >
            <View style={{ flex:4, flexDirection: 'row', alignItems: 'center'}}>
              <Animated.View style={{
                height: animatedImageHeight,
                width: animatedImageHeight,
                marginLeft: animatedImageMarginLeft,
                opacity: animatedSongDetailsOpacity
              }}>
                <Video
                  source={{ uri: videoUri }}
                  shouldPlay={this.state.shouldPlay}
                  resizeMode={Video.RESIZE_MODE_COVER}
                  style={{ marginVertical: 16,
                  width: VID_WIDTH + 50,
                  height: VID_WIDTH + 50,
                  borderRadius: 10,
                 }}
                  isMuted={this.state.mute}
                />
              </Animated.View>
              <Animated.View style={{ opacity: animatedSongTitleOpacity, marginLeft: -25}}>
                <Image style={styles.thumbnailStyle}
                  source={{ uri: imageUri }}
                />
              </Animated.View>
              <Animated.Text style={{ opacity: animatedSongTitleOpacity, fontSize: 18, paddingLeft: 10}}>
                {title}
              </Animated.Text>
            </View>
            <Animated.View style={{ opacity: animatedSongTitleOpacity, flex: 1, flexDirection: 'row',
              justifyContent: 'space-around'}}>
              <TouchableOpacity onPress={onBack}>
                <Ionicons name="md-square" size={30}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handlePlayAndPause}>
                <Ionicons name={this.state.shouldPlay ? "md-pause" : "md-play"} size={32} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <Animated.View style={{
            height: animatedHeaderHeight,
            opacity: animatedSongDetailsOpacity
          }}>
            <View style= {{ flex: 1, alignItems: 'center', justifyContent: "flex-end"}}>
              <Text style={{ fontWeight: 'bold', fontSize: 22}}>
                {artist} (Live)
              </Text>
              <Text style={{ fontSize: 18, color: '#fa95ed' }} >
                {title}
              </Text>
            </View>
            <View style={{
              flex: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}>
              <TouchableOpacity onPress={onBack}>
                <Ionicons name="md-arrow-dropdown-circle" size={40} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handlePlayAndPause}>
                <Ionicons name={this.state.shouldPlay ? "md-pause" : "md-play"} size={50} />
              </TouchableOpacity>
                <Ionicons name="md-cart" size={40} />
            </View>
          </Animated.View>

        </ScrollView>

        </Animated.View>

      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  thumbnailStyle: {
    height: 50,
    width: 50,
    borderRadius: 10,
  }
});
