// import libraries for making coponents
import React from 'react';
import { Text, View, Image, Platform, StatusBar } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';

//make a components
const Head = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <Header style={viewStyle}>
    <Left>
      <Image source={require('../img/AfrobeatIcon.png')} style={{width: 30, height: 30}}/>
    </Left>
      <View style= {styles.headerContainerText}>
        <Text style={textStyle}>{props.headerText}</Text>
      </View>
      <Right>
        <View style={{ padding: 5}}>
          <View style={styles.cartNo}>
            <Text style={{ color: 'white',
          fontWeight: 'bold'}}>{props.cart.length}</Text>
          </View>
          <Icon name= "md-cart" style={{ color: 'white'}} size={20} />
        </View>
      </Right>
    </Header>
  );
};


const styles = {
  viewStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: 'red',
    borderBottomColor: '#757575',
    heigth: 120,
    paddingBottom: 20,
  },
   textStyle: {
     fontSize: 15,
     color: '#657b83',
     fontFamily: "monospace",
     fontWeight: 'bold',

   },
   headerContainerText: {
     justifyContent: 'center',
     alignItems: 'center',
     marginLeft: 15,
   },
   cartNo: {
     position: 'absolute',
     height: 30,
     width:30,
     borderRadius: 15,
     backgroundColor:'rgba(95, 197, 123, 0.8)',
     right: 15,
     bottom: 15,
     alignItems: 'center',
     justifyContent: 'center',
     zIndex: 2000
   }
};

export default Head;
