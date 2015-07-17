'use strict';

// MODULES //

var ln1p = require( 'log1p' ),
	betaln = require( 'compute-betaln');


// FUNCTIONS //

var exp = Math.exp,
	ln = Math.log;


// PARTIAL //

/**
* FUNCTION: partial( alpha, beta )
*	Partially applies first shape parameter `alpha` and second shape parameter `beta` and returns a function for evaluating the probability density function (PDF) for a Beta distribution.
*
* @param {Number} alpha - first shape parameter
* @param {Number} beta - second shape parameter
* @returns {Function} PDF
*/
function partial( alpha, beta ) {

	var betaln_a_b = betaln( alpha, beta );
	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a Beta distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {

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

			var lnl = - betaln_a_b;
			lnl += ( alpha - 1 ) * ln( x ) + ( beta - 1 ) * ln1p( -x );
			return exp( lnl );
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
