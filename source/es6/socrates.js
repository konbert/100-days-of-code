/*  
    socrates.js 

    Homework #3: If statements
    
    Author: Michael Stöckel
    Date: 2021-01-03
*/

// All men are mortal
menAreMortal = true;

// Socrates is a man.
socratesIsaMan = true;

// Therefore, socrates is mortal.
if (menAreMortal && socratesIsaMan) {
	console.log('Socrates is mortal');
} else {
	console.log('Socrates is immortal');
}