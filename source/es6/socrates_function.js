/*  
    socrates.js 

    Homework #4: Functions
    
    Author: Michael Stöckel
    Date: 2021-01-05
*/


// All men are mortal
const menAreMortal = true;

// Socrates is a man.
const socratesIsaMan = true;


function isMortal(name) {
	if (typeof name !== "string") {
		console.log('"' + name + '" is not a name.');
		return false;
	} else if (name !== "Socrates") {
		console.log("I don't know much about " + name + ", but should be mortal.");
		return true;
	} else {
		if (menAreMortal && socratesIsaMan) {
			console.log('Socrates is mortal');
			return true;
		} else {
			console.log('Socrates is immortal');
			return false;
		}
	}
}

// try no value at all
console.log(isMortal());

// try not a name (string)
console.log(isMortal(42));

// try a guy named Boris
console.log(isMortal('Boris'));

// try Socrates
console.log(isMortal('Socrates'));
