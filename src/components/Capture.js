// React Native Example to Take Screenshot Programmatically
// https://aboutreact.com/take-screenshot-programmatically/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

// import CaptureScreen
import {captureScreen} from 'react-native-view-shot';

const App = () => {
  const [imageURI, setImageURI] = useState(
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
  );
  const [savedImagePath, setSavedImagePath] = useState('');

  const takeScreenShot = () => {
    // To capture Screenshot
    captureScreen({
      // Either png or jpg (or webm Android Only), Defaults: png
      format: 'png',
      height: 50,
      // Quality 0.0 - 1.0 (only available for jpg)
      quality: 0.8, 
      result: 'base64'
    }).then(
      //callback function to get the result URL of the screnshot
      (uri) => {
        
        setSavedImagePath(uri);
        setImageURI(uri);
      },
      (error) => console.error('Oops, Something Went Wrong', error),
    );
  };
  

  return (
      <View style={styles.container}>
        <Image
          source={{uri: `data:image/png;base64,${savedImagePath}`}}
          style={{
            width: 200,
            height: 500,
            resizeMode: 'contain',
          }}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={takeScreenShot}>
          <Text style={styles.buttonTextStyle}>
            Take Screenshot
          </Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>
          {
            savedImagePath ?
            `Saved Image Path\n ${savedImagePath}` : ''
          }
        </Text>
      </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    padding: 10,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
});