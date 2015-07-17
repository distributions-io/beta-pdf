'use strict';

// MODULES //

var ln1p = require( 'log1p' ),
	betaln = require( 'compute-betaln');


// FUNCTIONS //

var exp = Math.exp,
	ln = Math.log;


// PDF //

/**
* FUNCTION: pdf( x, alpha, beta )
*	Evaluates the probability density function (PDF) for a Beta distribution with first shape parameter `alpha` and second shape parameter `beta` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} alpha - first shape parameter
* @param {Number} beta - second shape parameter
* @returns {Number} evaluated PDF
*/
function pdf( x, alpha, beta ) {

	var lnl;

	if ( x < 0 || x > 1 ) {
		// support of the Beta distribution: [0,1]
		return 0;
	} else if ( x === 0 ) {
		if ( alpha < 1 ) {
			return Number.POSITIVE_INFINITY;
		} else if ( alpha > 1 ) {
			return 0;
		} else {
			return beta;
		}
	} else if ( x === 1 ) {
		if ( beta < 1 ) {
			return Number.POSITIVE_INFINITY;
		} else if ( beta > 1 ) {
			return 0;
		} else {
			return alpha;
		}
	}

	lnl = ( alpha - 1 ) * ln( x ) + ( beta - 1 ) * ln1p( -x ) - betaln( alpha, beta );
	return exp( lnl );
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
