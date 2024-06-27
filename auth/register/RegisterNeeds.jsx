import React, {useState, useRef} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {RiMicFill} from 'react-icons/ri'; // Not supported in React Native
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentStep} from '../../redux/registerSlice';
import {ToastAndroid} from 'react-native'; // For toast messages (Android-specific)
import {Audio} from 'expo-av'; // For audio recording and playback in Expo

const needs = [
  {id: 1, label: 'Housing'},
  {id: 2, label: 'Education'},
  {id: 3, label: 'Healthcare'},
  {id: 4, label: 'Employment'},
  {id: 5, label: 'Transportation'},
  {id: 6, label: 'Food Security'},
  {id: 7, label: 'Legal Assistance'},
  {id: 8, label: 'Mental Health Services'},
  {id: 9, label: 'Childcare'},
  {id: 10, label: 'Social Support'},
];

const RegisterNeeds = () => {
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const [recording, setRecording] = useState(false);
  const [audioRecording, setAudioRecording] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const {currentStep} = useSelector(state => state.register);
  const dispatch = useDispatch();

  const audioRecorder = useRef(new Audio.Recording());

  const handleCheckboxChange = (value, checked) => {
    if (checked) {
      setSelectedNeeds(prevSelected => [...prevSelected, value]);
    } else {
      setSelectedNeeds(prevSelected =>
        prevSelected.filter(item => item !== value),
      );
    }
  };

  const toggleRecording = async () => {
    if (!recording) {
      try {
        await audioRecorder.current.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        );
        await audioRecorder.current.startAsync();
        setRecording(true);
      } catch (err) {
        console.error('Error starting recording:', err);
      }
    } else {
      try {
        await audioRecorder.current.stopAndUnloadAsync();
        const uri = audioRecorder.current.getURI();
        setAudioRecording(audioRecorder.current);
        setAudioURL(uri);
        setRecording(false);
      } catch (err) {
        console.error('Error stopping recording:', err);
      }
    }
  };

  const resetRecording = () => {
    if (audioRecording) {
      audioRecording.stopAndUnloadAsync();
      setAudioURL(null);
      setRecording(false);
    }
  };

  const handleNext = () => {
    if (selectedNeeds.length === 0) {
      ToastAndroid.show(
        'You must select at least one need.',
        ToastAndroid.LONG,
      );
    } else {
      dispatch(setCurrentStep(currentStep + 1));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Select Your Needs</Text>
        <View style={styles.checkboxes}>
          {needs.map(need => (
            <View key={need.id} style={styles.checkboxItem}>
              <Text>{need.label}</Text>
              <TextInput
                style={styles.checkboxInput}
                type="checkbox"
                value={need.label}
                onChange={e =>
                  handleCheckboxChange(need.label, e.nativeEvent.target.checked)
                }
                checked={selectedNeeds.includes(need.label)}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.audioContainer}>
        <Text style={styles.label}>
          Record Audio about your needs (optional)
        </Text>
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
          <Audio
            source={{uri: audioURL}}
            useNativeControls
            style={{width: '100%'}}
          />
        </View>
      )}

      {recording && (
        <View style={styles.recordingInfo}>
          <Text>
            Recording Time:{' '}
            {audioRecorder.current.getStatusAsync().durationMillis / 1000}{' '}
            seconds
          </Text>
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
  checkboxContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  checkboxInput: {
    marginLeft: 10,
  },
  audioContainer: {
    marginBottom: 20,
  },
  audioPlayerContainer: {
    marginBottom: 20,
  },
  recordingInfo: {
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default RegisterNeeds;
