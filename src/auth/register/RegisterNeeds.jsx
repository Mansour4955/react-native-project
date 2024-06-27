import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../../redux/registerSlice'; // Update this import according to your project structure
import Toast from 'react-native-toast-message';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RegisterNeeds = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [selectedNeeds, setSelectedNeeds] = useState(Array(6).fill(false));

  const dispatch = useDispatch();
  const currentStep = useSelector(state => state.currentStep); // Adjust according to your state structure

  const toggleRecording = async () => {
    if (!recording) {
      try {
        const path = await audioRecorderPlayer.startRecorder();
        setRecording(true);
        console.log('Recording started at:', path);
      } catch (err) {
        console.error('Error starting recording:', err);
      }
    } else {
      try {
        const audioData = await audioRecorderPlayer.stopRecorder();
        setRecording(false);
        setAudioURL(audioData.path);
        console.log('Recording stopped, audio data:', audioData);
      } catch (err) {
        console.error('Error stopping recording:', err);
      }
    }
  };

  const resetRecording = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      setAudioURL(null);
      setRecording(false);
    } catch (err) {
      console.error('Error resetting recording:', err);
    }
  };

  const handleCheckboxChange = (index) => {
    const newSelectedNeeds = [...selectedNeeds];
    newSelectedNeeds[index] = !newSelectedNeeds[index];
    setSelectedNeeds(newSelectedNeeds);
  };

  const handleNext = () => {
    const atLeastOneSelected = selectedNeeds.some(need => need);
    if (atLeastOneSelected) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      Toast.show({
        type: 'error',
        text1: 'You must at least choose one need',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        {['Need 1', 'Need 2', 'Need 3', 'Need 4', 'Need 5', 'Need 6'].map((need, index) => (
          <TouchableOpacity
            key={index}
            style={styles.checkbox}
            onPress={() => handleCheckboxChange(index)}
          >
            <View style={styles.checkboxBox}>
              {selectedNeeds[index] && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.checkboxLabel}>{need}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.audioContainer}>
        <Text style={styles.label}>Record Audio about your needs (optional)</Text>
        <Button
          onPress={toggleRecording}
          title={recording ? 'Stop Recording' : 'Start Recording'}
          color="#007bff"
        />
        {audioURL && (
          <Button
            onPress={resetRecording}
            title="Reset Recording"
            color="#dc3545"
          />
        )}
      </View>

      {audioURL && (
        <View style={styles.audioPlayerContainer}>
          <Text style={styles.label}>Recorded Audio:</Text>
          <Text>{audioURL}</Text>
          {/* Add your audio playback component here */}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button onPress={handleNext} title="Next" color="#007bff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  audioContainer: {
    marginBottom: 20,
  },
  audioPlayerContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#007bff',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RegisterNeeds;
