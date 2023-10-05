// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let word = input.question("Enter a word to score: ");
   scorerPrompt(word);
};

let simpleScorer = function (word) {
   let points = 0;
   points = word.length;
   return points;
};


let vowelBonusScorer = function (word) {
   word = word.toLowerCase();
   let points = 0;
   for (let i = 0; i < word.length; i++) {
      if (word[i].indexOf('a') > -1 || word[i].indexOf('e') > -1 || word[i].indexOf('i') > -1 || word[i].indexOf('o') > -1 || word[i].indexOf('u') > -1) {
         points += 3
      } else {
         points += 1;
      }
   }
   return points;  
};

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let points = 0;
   for (let i = 0; i < word.length; i++) {
      points += newPointStructure[word[i]];
   }
   return points;
};

const scoringAlgorithms = [
   {name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer}, 
   {name: 'Bonus Vowels', 
   description: 'Vowels are 3 pts, consonants are 1 pt.', 
   scorerFunction: vowelBonusScorer}, 
   {name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer}];


function scorerPrompt(word) {
   console.log(`Which scoring algorithm would you like to use? \n\n0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);
   let userInput = input.question("Enter 0, 1, or 2: ");
   while (userInput > 2 || userInput < 0) {
      userInput = input.question("Enter 0, 1, or 2: ");
   }
   console.log(`Score for '${word}': ${scoringAlgorithms[userInput].scorerFunction(word)}`);
}

function transform(object) {
   transformObject = {};
   for (item in object) {
      for (let i = 0; i < object[item].length; i++) {
         transformObject[object[item][i].toLowerCase()] = Number(item);
      }
   }
   return transformObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
