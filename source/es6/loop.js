/*
	Some use cases for different for loops.
*/

// breaking a loop with labels
outerloop:
for (let i = 0; i < 10; i++) {
	console.log("Loop: " + i);
	innerloop:
	for (let j = 0; j < 10; j++) {
		console.log("Innerloop: " + j)
		//console.log(i+j);
		if (i+j > 11) {
			console.log(i + " + " + j + ": " + (i+j));
			break innerloop;
			//break outerloop;
		}
	}
}

console.log("----------------------");
//loop with timed execution only working this way with ES6 let instead of var
for (let i = 0; i < 10; i++) {
	setTimeout(() => {
		console.log(i);
	}, i * 500);
}

console.log("----------------------");
console.log("Object iteration:");
const myObj = { a: "A", c: "C", b: "B", 0: 0};

for(prop in myObj) {
	console.log(myObj[prop]);
}

console.log("----------------------");
console.log("Array iteration:");
const myArr = ["a", "b", "c", "d", "e"];

myArr.forEach((foo) => {
	console.log(foo);
});

console.log("----------------------");
console.log("Iterable Object iteration (ES6):");
const CoffeinDrinks = ["coffee",  "coke", "tea", "pepsi", "red bull"];

for(const drink of CoffeinDrinks) {
	// you can skip or break:
	if (drink === "pepsi") {
		continue; 
		//break;
	}
	console.log(drink);
}

console.log("----------------------");
