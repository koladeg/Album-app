// import libraries for making coponents
import React from 'react';
import { Text, View } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';

//make a components
const Head = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <Header style={viewStyle}>
      <Left style={{flexDirection: 'row'}}>
        <Icon name = "md-menu" style={{ color: 'white' }} />
      </Left>
      <View style= {styles.headerContainerText}>
        <Text style={textStyle}>{props.headerText}</Text>
      </View>
      <Right>
        <Icon name= "md-cart" style={{ color: 'white'}} />
      </Right>
    </Header>
  );
};


const styles = {
  viewStyle: {
    backgroundColor: 'red',
    borderBottomColor: '#757575',
    heigth: 120,
  },
   textStyle: {
     fontSize: 20,
     color: '#657b83',
     fontFamily: "monospace",
     fontWeight: 'bold',

   },
   headerContainerText: {
     justifyContent: 'center',
     alignItems: 'center',
   },
};

export default Head;
