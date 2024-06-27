import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, Alert } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RegisterNeeds = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

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

  const handleNext = () => {
    // Handle navigation or state changes after recording
  };

  return (
    <View style={styles.container}>
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
