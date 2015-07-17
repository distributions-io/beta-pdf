/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	var alpha = 1,
		beta = 1;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Beta probability density function', function test() {
		assert.strictEqual( pdf( 1, alpha, beta ), 1 );
	});

	it( 'should return `0` if provided a number outside [0,1]', function test() {
		var val;

		val = pdf( 1.3, alpha, beta );
		assert.strictEqual( val, 0 );

		val = pdf( -0.1, alpha, beta );
		assert.strictEqual( val, 0 );
	});

	it( 'should evaluate the probability density function at `0`', function test() {
		var val;

		val = pdf( 0, 0.5, 0.5 );
		assert.strictEqual( val, Number.POSITIVE_INFINITY );

		val = pdf( 0, 2, 2 );
		assert.strictEqual( val, 0 );

		val = pdf( 0, alpha, beta );
		assert.strictEqual( val, 1 );
	});

	it( 'should evaluate the probability density function at `1`', function test() {
		var val;

		val = pdf( 1, 0.5, 0.5 );
		assert.strictEqual( val, Number.POSITIVE_INFINITY );

		val = pdf( 1, 2, 2 );
		assert.strictEqual( val, 0);

		val = pdf( 1, 5, 1 );
		assert.strictEqual( val, 5 );

		val = pdf( 1, alpha, beta );
		assert.strictEqual( val, 1 );
	});

});
