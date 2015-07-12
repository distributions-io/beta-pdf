'use strict';

// FUNCTIONS //


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

	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a Beta distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
