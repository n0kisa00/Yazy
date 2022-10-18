import React, { useState, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../styles/style'
import { Row, Grid } from 'react-native-easy-grid';

let board = [];
let board2 = [];
const NBR_OF_DICES = 5;
const NBR_OF_POINTS = 6;
const NBR_OF_THROWS = 3;

export default function App() {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [icon, setIcon] = useState('#995c00');
  const [icon2, setIcon2] = useState('#995c00');
  const [icon3, setIcon3] = useState('#995c00');
  const [icon4, setIcon4] = useState('#995c00');
  const [icon5, setIcon5] = useState('#995c00');
  const [icon6, setIcon6] = useState('#995c00');
  const [selectedDice, setSelectedDice] = useState(new Array(NBR_OF_DICES).fill(false));
  const [pointsPut, setPointsPut] = useState(true);
  const [firstThrow, setFirstThrow] = useState(true);
  const [bonus, setBonus] = useState(63);
  const [bonusText, setBonusText] = useState("You are " + bonus + " points away from bonus")
  const [result1, setResult1] = useState(0);
  const [result2, setResult2] = useState(0);
 
  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <MaterialCommunityIcons
        name={board[i]}
        key={"row" + i}
        size={50}
        color={chooseDieColor(i)}
        onPress={() => handleSelect(i)}>
      </MaterialCommunityIcons>
    );
  }

  const row2 = [];
  for (let i = 0; i < NBR_OF_POINTS; i++) {
    row2.push(
      <Grid>
        <Row style={styles.row}>{result1}</Row>
        <MaterialCommunityIcons
          name={board2[i]}
          key={"row2" + i}
          size={50}
          color={chooseNumberColor(i)}
          onPress={() => handlePressNumber(i)}>
        </MaterialCommunityIcons>
      </Grid>
    );
  }

  const handlePressNumber = (number) => {
    if (nbrOfThrowsLeft === 0 || pointsPut === false) {
    if (board2[number] === "numeric-1-circle" && icon === "#995c00") {
      setIcon("green")
      setResult1(board.filter(x => x === "dice-1").length)
      reset();
    }
    else if (board2[number] === "numeric-2-circle" && icon2 === "#995c00") {
      setIcon2("green")
      setResult1(board.filter(x => x === "dice-2").length)
      reset();
    }
    else if (board2[number] === "numeric-3-circle" && icon3 === "#995c00") {
      setIcon3("green")
      setResult1(board.filter(x => x === "dice-3").length)
      reset();
    }
    else if (board2[number] === "numeric-4-circle" && icon4 === "#995c00") {
      setIcon4("green")
      setResult1(board.filter(x => x === "dice-4").length)
      reset();
    }
    else if (board2[number] === "numeric-5-circle" && icon5 === "#995c00") {
      setIcon5("green")
      setResult1(board.filter(x => x === "dice-5").length)
      reset();
    }
    else if (board2[number] === "numeric-6-circle" && icon6 === "#995c00") {
      setIcon6("green")
      setResult1(board.filter(x => x === "dice-6").length)
      reset();
    }
  } else {
    setStatus("Please use all of your throws.")
  }
}
 
  function chooseNumberColor(number) {
    if (board2[number] === "numeric-1-circle") {
      return icon
    }
    else if (board2[number] === "numeric-2-circle") {
      return icon2
    }
    else if (board2[number] === "numeric-3-circle") {
      return icon3
    }
    else if (board2[number] === "numeric-4-circle") {
      return icon4
    }
    else if (board2[number] === "numeric-5-circle") {
      return icon5
    }
    else if (board2[number] === "numeric-6-circle") {
      return icon6
    }
}

function chooseDieColor(i) {
  if (board.every((val, i, arr) => val === arr[0])) {
    return "orange";
  }
  else {
    return selectedDice[i] ? "black" : "#995c00";
  }
}

  function handleSelect(i)
  {
    if (firstThrow === false) {
      let dice = [...selectedDice];
      dice[i] = selectedDice[i] ? false : true;
      setSelectedDice(dice);
    }
     else {
      setStatus("You must make your first throw before selecting dice.")
    }
    
  }

  function throwDices() {
    if (nbrOfThrowsLeft === 0) {
      setStatus("You cannot throw dice more than 3 times. Please put your points below.")
    } else if (selectedDice.every(x => x === true)) {
      setStatus("You are an idiot.")
    } else {
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDice[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = 'dice-' + randomNumber;
        }
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
      setFirstThrow(false);
    }
  }

  function numbers() {
    let ballNum = 0;
    for (let i = 0; i < NBR_OF_POINTS; i++) {
      ballNum++;
      board2[i] = 'numeric-' + ballNum + '-circle';
    }
  }


  function checkStatus() {
    if (bonus <= 0) {
      setBonusText("You got the bonus!")
    } else {
      setStatus('Keep on throwing.');
    }
  }

  function reset() {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDice[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
        setSelectedDice(new Array(NBR_OF_DICES).fill(false))
        setFirstThrow(true)
        setPointsPut(true)
        setNbrOfThrowsLeft(3)
      }
    }
    
  }

  useEffect(() => {
    checkStatus();
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Throw your dice.');
    }
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS-1);
      setNbrOfWins(0);
    }
    if (nbrOfThrowsLeft === 0) {
      setStatus('Put your points below.')
    }
  }, [nbrOfThrowsLeft]);


  useEffect(() => {
    numbers();
  }, [])

  useEffect(() => {
    reset();
  }, [])


  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() =>  throwDices()}>
          <Text style={styles.buttonText}>
            Throw dice
          </Text>
      </Pressable>
      <Text>{bonusText}</Text>
 
      <View style={styles.flex}>{row2}</View>
    </View>
  );
}
