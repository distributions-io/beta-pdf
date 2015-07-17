/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'partial pdf', function tests() {

	var alpha = 1,
		beta = 1,
		pdf = partial( alpha, beta );

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the Beta pdf for given parameter values', function test() {
		var pdf;
		pdf = partial( alpha, beta);
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should return a function which evaluates the probability density function', function test() {
		assert.closeTo( pdf( -1 ), 0, 1e-12 );
		assert.closeTo( pdf( 0 ), 1, 1e-12 );
		assert.closeTo( pdf( 0.5 ), 1, 1e-12 );
		assert.closeTo( pdf( 1 ), 1, 1e-12 );
	});

	it( 'should return a function which evaluates the probability density function at `0`', function test() {
		var pdf;

		pdf = partial( 0.5, 0.5 );
		assert.strictEqual( pdf( 0 ), Number.POSITIVE_INFINITY );

		pdf = partial( 1, 1 );
		assert.strictEqual( pdf( 0 ), 1 );

		pdf = partial( 2, 2 );
		assert.strictEqual( pdf( 0 ), 0 );
	});

	it( 'should return a function which evaluates the probability density function at `1`', function test() {
		var pdf;

		pdf = partial( 0.5, 0.5 );
		assert.strictEqual( pdf( 1 ), Number.POSITIVE_INFINITY );

		pdf = partial( 5, 1 );
		assert.strictEqual( pdf( 1 ), 5 );

		pdf = partial( 1, 1 );
		assert.strictEqual( pdf( 1 ), 1 );
	});

});
