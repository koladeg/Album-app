import * as React from 'react';
import { SafeAreaView, Platform, Text  } from 'react-native';
import AlbumList from './src/components/AlbumList';

export default class App extends React.Component {
  render() {
    return (
        <SafeAreaView style={styles.safeArea}>
          <AlbumList />
        </SafeAreaView>
    );
  }
}

const styles = {
  safeArea: {
    flex: 1,
  },
}
