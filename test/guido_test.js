// guido_test.js - 2/21/2021 - Paul Guido
// The guido_test.js module is the primary mechanism for unit testing guido components

try {
    var guido = require('../source/guido_namespace.js').guido;
    guido.test = {};
}catch (e) {
    console.log('guido_test.js - unable to add guido namespace');
}

try {
    require('../source/guido_utility.js');
} catch (e) {
    console.log('guido_test.js - unable to load required modules');
    console.log(e);
}

try {
    require('./UT_guido_utility.js');
} catch (e) {
    console.log('guido_test.js - unable to load required test modules');
    console.log(e);
}

try {
    guido.mock = function(argObject, argProperty, argMock) {
	'use strict';

	let obj = argObject;
	let props = argProperty.split('.');
	
	for (let bP=0; bP<props.length - 1; bP++) {
	    if (!Object.prototype.hasOwnProperty(obj,props[bP])) {
		obj[props[bP]] = {};
	    }

	    obj = obj[props[bP]];
	}

	orig = obj[props[props.length-1]];

	obj[props[props.length - 1]] = argMock;
	return orig;
    }
} catch (e) {
    console.log('guido_test.js - unable to add mock to guido namespace');
}

try {
    guido.restore = function(argObject, argProperty, argOrig) {
	'use strict';

	let obj = argObject;
	let props = argProperty.split('.');

	for (let bP=0; bP<props.length; bP++) {
	    obj = obj[props[bP]];
	}

	obj = argOrig;
    }
} catch (e) {
    console.log('guido_test.js - unable to add restore to guido namespace');
}

function runTests() {
    console.log(guido);
    for (let bM in guido.test) {
	console.log(bM);
	console.log(guido.test[bM].description);
	console.log(guido.test[bM].functions);	
	for (let bF in guido.test[bM].functions) {
	    console.log(bF);
	    for (let bT in guido.test[bM].functions[bF]) {
		console.log(guido.test[bM].functions[bF][bT].description);
	        let result = guido.test[bM].functions[bF][bT].test();
                console.log(result);
	    }
	}
    }
}

runTests();
