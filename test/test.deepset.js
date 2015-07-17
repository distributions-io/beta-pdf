/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset pdf', function tests() {

	var alpha = 100,
		beta = 100;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should compute the Beta pdf and deep set', function test() {
		var data, expected, i;

		data = [
			{'x': 0.05},
			{'x': 0.1},
			{'x': 0.15},
			{'x': 0.2},
			{'x': 0.25},
			{'x': 0.3},
			{'x': 0.35},
			{'x': 0.4},
			{'x': 0.45},
			{'x': 0.5},
			{'x': 0.55},
			{'x': 0.6},
			{'x': 0.65},
			{'x': 0.7},
			{'x': 0.75},
			{'x': 0.8},
			{'x': 0.85},
			{'x': 0.9},
			{'x': 0.95}
		];

		data = pdf( data, alpha, beta, 'x' );

		expected = [
			{'x': 4.45162617973241e-71},
			{'x': 1.33616400914406e-43},
			{'x': 1.262872851589e-28},
			{'x': 7.30684034161465e-19},
			{'x': 4.81922573390435e-12},
			{'x': 3.59386296735101e-07},
			{'x': 0.000993138992095559},
			{'x': 0.198045174223249},
			{'x': 4.16674054524112},
			{'x': 11.2696958018513},
			{'x': 4.16674054524112},
			{'x': 0.198045174223246},
			{'x': 0.000993138992095503},
			{'x': 3.59386296735086e-07},
			{'x': 4.81922573390421e-12},
			{'x': 7.30684034161465e-19},
			{'x': 1.26287285158897e-28},
			{'x': 1.33616400914387e-43},
			{'x': 4.45162617973279e-71}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x, expected[ i ].x, 1e-12 );
		}

		// Custom separator...
		data = [
			{'x': [9,0.05]},
			{'x': [9,0.1]},
			{'x': [9,0.15]},
			{'x': [9,0.2]},
			{'x': [9,0.25]},
			{'x': [9,0.3]},
			{'x': [9,0.35]},
			{'x': [9,0.4]},
			{'x': [9,0.45]},
			{'x': [9,0.5]},
			{'x': [9,0.55]},
			{'x': [9,0.6]},
			{'x': [9,0.65]},
			{'x': [9,0.7]},
			{'x': [9,0.75]},
			{'x': [9,0.8]},
			{'x': [9,0.85]},
			{'x': [9,0.9]},
			{'x': [9,0.95]}
		];

		data = pdf( data, alpha, beta, 'x/1', '/' );
		expected = [
			{'x': [9,4.45162617973241e-71]},
			{'x': [9,1.33616400914406e-43]},
			{'x': [9,1.262872851589e-28]},
			{'x': [9,7.30684034161465e-19]},
			{'x': [9,4.81922573390435e-12]},
			{'x': [9,3.59386296735101e-07]},
			{'x': [9,0.000993138992095559]},
			{'x': [9,0.198045174223249]},
			{'x': [9,4.16674054524112]},
			{'x': [9,11.2696958018513]},
			{'x': [9,4.16674054524112]},
			{'x': [9,0.198045174223246]},
			{'x': [9,0.000993138992095503]},
			{'x': [9,3.59386296735086e-07]},
			{'x': [9,4.81922573390421e-12]},
			{'x': [9,7.30684034161465e-19]},
			{'x': [9,1.26287285158897e-28]},
			{'x': [9,1.33616400914387e-43]},
			{'x': [9,4.45162617973279e-71]}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-12, 'custom separator' );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], alpha, beta, 'x' ), [] );
		assert.deepEqual( pdf( [], alpha, beta, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = pdf( data, alpha, beta, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
