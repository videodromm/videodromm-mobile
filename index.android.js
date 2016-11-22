/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
const GL = require("gl-react-native");
//const Shader = require('./src/shader.js');
//import Shader from './src/shader.js'
import HelloGL from "./src/HelloGL.js";
const { Surface } = require("gl-react-native"); // in React Native context
export default class VideodrommMobile extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Surface width={256} height={171} ref="helloGL">
            <HelloGL />
        </Surface>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
AppRegistry.registerComponent('VideodrommMobile', () => VideodrommMobile);
