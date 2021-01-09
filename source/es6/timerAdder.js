/*  
    timerAdder.js 

    Homework #5: Switch Statements
    
    Author: Michael Stöckel
    Date: 2021-01-08
*/

// checks if val is an integer
function isInteger(val) {
    return parseInt(val) == val;
}

// normalizes time untis to seconds
function normalize(val, label) {
	switch (label) {
		case "day":
		case "days":
			return val * 24 * 60 * 60;
			break;
		case "hour":
		case "hours":
			return val * 60 * 60;
		case "minute":
		case "minutes":
			return val * 60;
		default:
			return val;
	}
}

// find highest possible time unit using integers
function uplift(val) {
	let label;
	if (val % 86400 === 0) {
		val = val / 86400;
		if (val > 1) {
			label = "days";	
		} else {
			label = "day";
		}				
	} else if (val % 3600 === 0) {
		val = val / 3600;
		if (val > 1) {
			label = "hours";
		} else {
			label = "hour";
		}
	} else if (val % 60 === 0) {
		val = val / 60;
		if (val > 1) {
			label = "minutes";
		} else {
			label = "minute";
		}
	} else if (val > 1) {
		label = "seconds";
	} else {
		label = "second";
	}
	return [val, label];
}

function timeAdder (value1, label1, value2, label2) {
	// check validity of arguments
	const VALID_LABELS = ["seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];
	const SINGLE_LABELS = ["second", "minute", "hour", "day"];
	if (!isInteger(value1) || !isInteger(value2)) {
		console.log("Invalid values");
		return false;
	} else if (VALID_LABELS.indexOf(label1) === -1 ||
			   VALID_LABELS.indexOf(label2) === -1) {
		console.log("Invalid labels");
		return false;
	} else if (value1 > 1 && SINGLE_LABELS.indexOf(label1) !== -1||
			   value2 > 1 && SINGLE_LABELS.indexOf(label2) !== -1 ){
		console.log("Value, label missmatch");
		return false;
	}

	// normalize to seconds
	let sec1 = normalize(value1, label1);
	let sec2 = normalize(value2, label2);

	value3 = sec1 + sec2;

	[value3, label3] = uplift(value3);

	return [value3, label3];
}

// Testcases

console.log(timeAdder(5,"hour",5,"minutes")); // This is impossible because "hour" is singular and 5 is plural

console.log(timeAdder(9,false,5,"minutes")); // This is invalid because the first 2 arguments are not the correct types

console.log(timeAdder({},"days",5,"minutes")); // This is invalid because the first argument is the wrong type

console.log(timeAdder(20,"hours",4,"hours")); // You could return: [1,"day"] rather than [24,"hours"]

console.log(timeAdder(20,"hours",5,"hours")); // You would return [25,"hours"] because you could not use "days" with an integer value to represent 25 hours.

console.log(timeAdder(1,"minute",3,"minutes"));

console.log(timeAdder(5,"days",25,"hours"));

console.log(timeAdder(1,"minute",240,"seconds"));

console.log(timeAdder(0,"minute",1,"second"));

console.log(timeAdder(20, "seconds", 40, "seconds"));