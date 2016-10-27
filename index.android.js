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
import Shader from './src/shader.js'
const { Surface } = require("gl-react-native"); // in React Native context
export default class VideodrommMobile extends Component {
  render() {
    return (
        <Surface width={511} height={341}>
          <Shader blue={0.5} />
        </Surface>
    );
  }
}

AppRegistry.registerComponent('VideodrommMobile', () => VideodrommMobile);
