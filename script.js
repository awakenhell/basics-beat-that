//1) 2 players and player take turns
//2) when a player clicks submit, game rolls 2 dice and shows dice rolls
//3) player picks the order of the dice they want
//4) after both players rolled and dice order chosen, player with higher combined number wins

// rolls 2 dice and turns the output for 1 player. that player chooses the dice order and get the correct return output
// refactor code to include player 2
//    -global varaibles for currentPlauer; allPlayersScore
//    -refactor outputMessages to interact with each player 1 and 2
//    -write logic for player 1 to go first then player 2, and finally point towards comparing score
// implement comparing dice scores and declare winner
// reset game so that players can play continually

var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];
var currentPlayer = 1;
var allPlayersScore = [];

// Helper funfction

var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  //random Decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // random Integer from 1 to 6
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, randomInteger: ", randomInteger);
  return randomInteger;
};

var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log("rollDiceForPlayer changes, playerRolls: ", currentPlayerRolls);
  return (
    "Welcome, Player " +
    currentPlayer +
    "<br><br>You rolled:<br>Dice 1: " +
    currentPlayerRolls[0] +
    " | Dice 2: " +
    currentPlayerRolls[1] +
    ".<br><br>Now, please input either '1' or '2' to choose the corresnponding dice to be used as the first digit of your final value."
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log(
      "Control flow: input validation, invalid input... NOT 1 AND NOT 2"
    );
    return (
      "Error! Please only input '1' or '' to choose which dice to use as the first digit.<br><br?Your dice rolls are:<br>Dice 1: " +
      currentPlayerRolls[0] +
      " | Dice 2: " +
      currentPlayerRolls[2] +
      "."
    );
  }
  //input == 1
  if (playerInput == 1) {
    console.log("Control flow: input == 1");
    var playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    return "Your chosen value is: " + playerScore;
  }
  // input == 2
  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    allPlayersScore.push(playerScore);
    // clear current player rolls array
    currentPlayerRolls = [];
    return "Player " + currentPlayer + ", your chosen value is: " + playerScore;
  }
};

var comparePlayersScores = function () {
  compareMessage =
    "Player 1 score: " +
    allPlayersScore[0] +
    "<br>Player2 score: " +
    allPlayersScore[1];

  // player 1 wins
  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 1 wins!";
  }

  // player 2 wins//
  if (allPlayersScore[1] > allPlayersScore[0]) {
    compareMessage = compareMessage + "<br><br>Player 2 wins!";
  }
  //tie
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 1 wins!";
  }
  return compareMessage;
};

var main = function (input) {
  console.log("checking game state on submit click:", gameState);
  console.log("Checking currentPlayer on submit click: ".currentPlayer);
  var outputMessage = "";

  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ROLL");
    //Display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    //Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return outputMessage;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: gameState == GAME_STATE_CHOOSE_DICE_ORDER");

    //Call playerScore function

    outputMessage = getPlayerScore(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameState = GAME_STATE_DICE_ROLL;
      return outputMessage + "<br><br>It is now player 2's turn!";
    }

    if (currentPlayer == 2) {
      console.log(
        "Control flow: end of player 2's turn, Next submit click will calculate score"
      );
      gameState = GAME_STATE_COMPARE_SCORES;

      return outputMessage + "<br><br>Press submit to calculate scores!";
    }
  }

  if (gameState == GAME_STATE_COMPARE_SCORES) {
    console.log("Control flow: gameState == GAME_STATE_COMPARE_SCORES");

    outputMessage = comparePlayersScores();
    return outputMessage;
  }
};
