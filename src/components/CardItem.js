import React from 'react';
import { View } from 'react-native';

const CardItem = (props) => {
  return (
    <View style={style.containerStyle}>
    {props.children}
    </View>
  );
};

const style = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    paddingHorizontal: 5,
    flex: 1,

  }

};

export default CardItem;
