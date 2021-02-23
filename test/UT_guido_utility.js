// UT_guido_utility.js - 2/21/2021 - Paul Guido
// The UT_guido_utility.js module includes the unit tests for the functions of the guido_utility.js module

try {
    var guido = require('../source/guido_namespace.js').guido;
} catch (e) {
    console.log('UT_guido_utility.js - unable to load guido namespace');
}

if (!guido.test.guido_utility) {
    guido.test.guido_utility = {
	module : 'guido_utility.js',
	description : 'The guido_utility.js module includes utility functions required by other guido components',
	functions : {}
    }
}

guido.test.guido_utility.functions.resolveDotProperty = {
    test1: {
	description : 'Correct property value is returned...',
	test : function () {
	    'use strict';
	    
	    try {
		event.preventDefault();
		event.stopPropagation();
	    } catch (e) {
		console.log();
	    }

	    let status = 'FAILED';
	    
	    try {
                let tests = [{
		    params : {
			object : {
			    record : {
				field1 : { value : 'value1' }
			    }
			},
			property : 'record.field1.value'
		    },
		    results : [{value : 'value1'}, 'value']
	        }];

	        for (let bT=0; bT<tests.length; bT++) {
		    let testData = guido.functions.resolveDotProperty.function(tests[bT].params.object, tests[bT].params.property);

		    console.log('------ resolveDotProperty Results ------');
                    console.log(JSON.stringify(testData));
		    console.log(JSON.stringify(tests[bT].results));

		    if (JSON.stringify(testData) !== JSON.stringify(tests[bT].results)) {
		        return status;
		    }
	        }
	        status = 'PASSED';
            } catch (e) {
		console.log('UT_guido_utility.js - error running resolveDotProperty test 1');
		console.log(e);
	    }
	    
	    return status;
	}
    },
    test2 : {
	description : 'Value is passed by reference and can be updated...',
	test: function() {
	    try {
		event.preventDefault();
		event.stopPropagation();
	    }catch (e) {
		console.log();
	    }

	    let status = 'FAIED';

	    try {
		let tests = [{
		    params: {
			object : {
			    record : {
				field1 : { value : 'value1' }
			    }
			},
			property : 'record.field1.value'
		    },
		    results : {
			record : {
			    field1 : { value : 'changed' }
			}
		    }			
		}];

		for (let bT=0; bT<tests.length; bT++) {
		    let testData = guido.functions.resolveDotProperty.function(tests[bT].params.object, tests[bT].params.property);
		    testData[0][testData[1]] = 'changed';

		    console.log('------ resolveDotProperty Results ------');
		    console.log(JSON.stringify(tests[bT].params.object));
		    console.log(JSON.stringify(tests[bT].results))

		    if (JSON.stringify(tests[bT].params.object) !== JSON.stringify(tests[bT].results)) {
			return status;
		    }
		}

                status = 'PASSED';
	    } catch (e) {
		console.log('UT_guido_utility.js - error running resolveDotProperty test 2');
		console.log(e);
	    }

	    return status;
	}
    }
}
