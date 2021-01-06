/*  
    cake.js 

    Homework #4: Functions
    
    Author: Michael Stöckel
    Date: 2021-01-05
*/

/*
If you did the extra credit on Homework #3, let's 
turn that example into a function as well. It should 
accept in 2 arguments:

1. An array of all cake possibilities (vanilla or 
chocolate)

2. A boolean representing whether or not the cake 
is chocolate.

It should return a string indicating the actual flavor of the cake.
*/

function typeOfCake(variaties, isChocolate) {
	if (isChocolate === true) {
		return 'chocolate';
	} else {
		if (variaties[0] === 'chocolate') {
			return variaties[1];
		} else {
			return variaties[0];
		}
	}
}

console.log(typeOfCake(['vanilla', 'chocolate'], true));
console.log(typeOfCake(['chocolate', 'vanilla'], false));