'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( arr, alpha, beta, path[, sep] )
*	Evaluates the probability density function (PDF) for a Beta distribution with first shape parameter `alpha` and second shape parameter `beta` for each array element and sets the input array.
*
* @param {Array} arr - input array
* @param {Number} alpha - first shape parameter
* @param {Number} beta - second shape parameter
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function pdf( x, alpha, beta, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		fcn,
		v, i;
	if ( arguments.length > 4 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		fcn = partial( alpha, beta );
		for ( i = 0; i < len; i++ ) {
			v = dget( x[ i ] );
			if ( typeof v === 'number' ) {
				dset( x[i], fcn( v ) );
			} else {
				dset( x[i], NaN );
			}
		}
	}
	return x;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
