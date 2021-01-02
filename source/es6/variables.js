/*
	variables.js

	homework 2: Variables and Constants
	Author: Michael Stöckel
    Date: 2021-01-02
*/

// var is the older way to declare a variable in
// ES. You are using it to declare a name as a
// container for a value. It can be defined with
// or without a value.

var firstName = "Michael";
var lastName;

lastName = "Stöckel";

// It has a problem with scoping because the
// variable might be valid and accessible outside
// the block where it is declared.
// And the value of variables can be altered
// at any time, even when you want it to be a
// constant value

// let supllied a solution for the scoping problem
// a variable declared with let is only valid within
// the scope of its "block".

let burnes = true;
if (burnes === true) {
	let alarm = "fire";
	console.log(alarm + "alarm!");
}
// the variable is not valid outside the if-block
// so the following will not work:
console.log("Alarmstatus: " + alarm);

// const on the other hand, defines the variable
// with a constant-variable at declaration. It
// is therfore not longer variable.
// Use always const-declarations unless you are shure,
// that the value must be altered later.

const married = true;

// is defined as a constant, so you cannot alter
// it ;-)
// this will not work:

married = false;

// the word hoisting means for JavaScript, that
// the declaration of a variable is pulled up
// to the beginning of the block where it is
// declared. The assingment of a value remains
// at the point where the variable is defined.

function foo() {
	console.log(bar); // variable is declared
	                  // but value is undefined
	let bar = "dummy";
	console.log(bar);
}

// the variable bar exists at the first console.log
// call as if it was written as:

function foo() {
	let bar;
	console.log(bar); 
	bar = "dummy";
	console.log(bar);	
}