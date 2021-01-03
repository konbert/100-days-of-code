/*  
    cake.js 

    Homework #3: If statements
    
    Author: Michael Stöckel
    Date: 2021-01-03
*/

cake = 'vanilla';

if (cake === 'chocolate' || cake === 'vanilla') {
	// This cake is either vanilla or chocolate.
	console.log('cake is vanilla or chocolate');

	if (cake !== 'chocolate') {
		// This cake is not chocolate.
		// Therefore, this cake is vanilla.
		console.log('cake is vanilla');
	} else {
		console.log('cake is chocolate');
	}

} else {
	console.log('this cake is neither vanilla nor chocolate');
}

