// guido_utility.js - 2/21/2021 - Paul Guido
// The guido_utility.js module includes utility functions required by other guido components

try {
    var guido = require('./guido_namespace.js').guido;
} catch (e) {
    console.log('guido_utility.js - unable to load guido namespace');
}

try {
    guido.functions.resolveDotProperty = {
	function : function(argObject, argProperty) {
	    'use strict';

	    let obj = argObject;
	    let props = argProperty.split('.');

	    for (let bP=0; bP<props.length-1; bP++) {
		if (!Object.prototype.hasOwnProperty.call(obj,props[bP])) {
		    obj[props[bP]] = {};
		}

		obj = obj[props[bP]];
            }

	    return [obj, props[props.length-1]];
	},
        file : 'guido_utility.js',
        description : 'The resolveDotProperty function returns the refernce to the object property decribed by the property argument',
        parameters : {
	    argObject : 'The target object to resolve',
	    argProperty : 'The dot notation property of the object to resolve to'
        },
        requirementsTrace : []
    }
} catch (e) {
    console.log('guido_utility.js - unable to add resolveDotProperty to guido namespace')
}
