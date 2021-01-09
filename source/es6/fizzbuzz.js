/*  
    cake.js 

    Homework #6: Loops
    
    Author: Michael Stöckel
    Date: 2021-01-09
*/

function isPrime(val) {
	if (val === 1) {return false};
	if (val === 2) {return true};
	for (let div = 2; div <= val / 2; div ++) {
		if (val % div === 0) {
			return false;
		}
	}
	return true; 
}

for (let i = 1; i <= 100; i++) {
	if (isPrime(i)) {
		console.log("Prime");
	} else if (i % 3 ===0 && i % 5 === 0) {
		console.log("FizzBuzz");
	} else if (i % 3 === 0) {
		console.log("Fizz");
	} else if (i % 5 === 0) {
		console.log("Buzz");
	} else {
		console.log(i);
	}
}
