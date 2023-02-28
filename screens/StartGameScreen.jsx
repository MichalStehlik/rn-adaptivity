import { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import MainButton from '../components/ui/MainButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import Card from '../components/ui/Card';
import InfoText from '../components/ui/InfoText';

const StartGameScreen = ({onPickNumber}) => {
    const [enteredNumber, setEnteredNumber] = useState('');

    const numberInputHandler = (enteredText) => {
        setEnteredNumber(enteredText);
    }
    
    const resetInputHandler = () => {
        setEnteredNumber('');
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);
    
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
          Alert.alert(
            'Invalid number!',
            'Number has to be a number between 1 and 99.',
            [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
          );
          return;
        }
    
        onPickNumber(chosenNumber);
    }

    return (
        <ScrollView style={styles.screen}>
        <View style={styles.rootContainer}>
          <Title>Guess My Number</Title>
          <Card>
            <InfoText>
              Enter a Number
            </InfoText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <MainButton onPress={resetInputHandler}>Reset</MainButton>
              </View>
              <View style={styles.buttonContainer}>
                <MainButton onPress={confirmInputHandler}>Confirm</MainButton>
              </View>
            </View>
          </Card>
        </View>
        </ScrollView>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
        flex: 1,
  },
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});