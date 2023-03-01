import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, FlatList, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InfoText from '../components/ui/InfoText';
import MainButton from '../components/ui/MainButton';
import Title from '../components/ui/Title';
import GuessLogItem from '../components/game/GuessLogItem';

let minBoundary = 1;
let maxBoundary = 100;

const generateRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
}

export const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InfoText style={styles.instructionText}>
          Higher or lower?
        </InfoText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </MainButton>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </MainButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </MainButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </MainButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  ); 
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});