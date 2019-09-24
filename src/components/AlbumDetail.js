//import libraries for particular albums
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon, Right, Left } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import Card from './Card';
import CardItem from './CardItem';

// the component of this module
const AlbumDetail = ({ beat, onItemPress } ) => {
  handlePress = () => {
    onItemPress(beat.id)
  }
  let thumbnail= beat.user.profile_picture
  let imageUri = beat.images.standard_resolution.url
  let username = beat.user.full_name
  let title = beat.caption.text.split('|')[0].replace(/\W/g, '')
  let genre = beat.caption.text.replace(/./g, "|").split('|')[1].replace(/\W/g, '')
  return (
    <LinearGradient
     colors ={ [ '#131414', '#424545' ]}
     style={{ flex: 1 }}
     start={{ x: 0, y: 0 }}
     end={{ x: 1, y: 1 }}
    >
    <Card>
      <CardItem>
        <View style={styles.thumbnailContainerStyle}>
          <TouchableOpacity style={{padding: 10}} onPress={this.handlePress}>
            <Icon name= "md-play" style={{ color: 'red'}}  />
          </TouchableOpacity>
          <Image
            style={styles.thumbnailStyle}
            source={{ uri: imageUri }}
          />
        </View>
        <View style={styles.headerTextStyle}>
          <Text style={{ color: '#657b83', fontSize: 11, fontFamily: "monospace"}}>
            Title : <Text style={{ color: '#268bd2', fontWeight: 'bold' }}> {title} </Text>
          </Text>
        </View>
        <Right>
          <Icon name= "md-cart" style={{ color: 'red'}} />
        </Right>
      </CardItem>
    </Card>
    </LinearGradient>
  );
};
const styles = {
  headerTextStyle: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  thumbnailStyle: {
    height: 70,
    width: 70,
    borderRadius: 10
  },
  thumbnailContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRigth: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

// exporting album details to rest of the app
export default AlbumDetail;
