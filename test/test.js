/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	pdf = require( './../lib' ),

	// Error function:
	PDF = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-beta-pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( pdf( values[ i ] ) ) );
		}
	});

	it( 'should compute the Beta pdf when provided a number', function test() {
		assert.closeTo( pdf( 0, {
			'alpha': 2,
			'beta': 2
		}), 0, 1e-12 );

		assert.closeTo( pdf( 0.5, {
			'alpha': 2,
			'beta': 2
		}), 1.5, 1e-12 );
	});

	it( 'should evaluate the Beta pdf when provided a plain array', function test() {
		var data, actual, expected, i;

		data = [ 0, 0.2, 0.4, 0.6, 0.8, 1 ];
		expected = [
			0,
			5.120000000000004e-06,
			0.002621440000000002,
			0.1007769600000002,
			1.342177280000001,
			10
		];

		actual = pdf( data, {
			'alpha': 10,
			'beta': 1
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-12 );
		}

		// Mutate...
		actual = pdf( data, {
			'copy': false,
			'alpha': 10,
			'beta': 1
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-12 );
		}
	});

	it( 'should evaluate the Beta pdf when provided a typed array', function test() {
		var data, actual, expected, i;

		data = new Float64Array( [ 0, 0.2, 0.4, 0.6, 0.8, 1 ] );

		expected = new Float64Array([
			10,
			1.34217728,
			0.10077696,
			0.002621439999999993,
			5.120000000000004e-06,
			0
		]);

		actual = pdf( data, {
			'alpha': 1,
			'beta': 10
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-12 );
		}

		// Mutate:
		actual = pdf( data, {
			'copy': false,
			'alpha': 1,
			'beta': 10
		});
		expected = new Float64Array([
			10,
			1.34217728,
			0.10077696,
			0.002621439999999993,
			5.120000000000004e-06,
			0
		]);
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-12 );
		}
	});

	it( 'should evaluate the Beta pdf element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 0, 0.2, 0.4, 0.6, 0.8, 1 ];
		expected = new Int8Array([
			10, 1, 0, 0, 0, 0
		]);

		actual = pdf( data, {
			'dtype': 'int8',
			'alpha': 1,
			'beta': 10
		});

		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the Beta pdf element-wise using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			[0,0],
			[1,0.2],
			[2,0.4],
			[3,0.6],
			[4,0.8],
			[5,1],
		];

		expected = [
			0,
			2.533220935729834e-09,
			1.076824088942461,
			1.07682408894245,
			2.533220935729798e-09,
			0
		];

		actual = pdf( data, {
			'accessor': getValue,
			'alpha': 50,
			'beta': 50
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-12 );
		}

		// Mutate:
		actual = pdf( data, {
			'accessor': getValue,
			'copy': false,
			'alpha': 50,
			'beta': 50
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-12 );
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the Beta pdf element-wise and deep set', function test() {
		var data, actual, expected, i;

		data = [
			{'x':[9,0]},
			{'x':[9,0.2]},
			{'x':[9,0.4]},
			{'x':[9,0.6]},
			{'x':[9,0.8]},
			{'x':[9,1]},
		];
		expected = [
			{'x': [9,0]},
			{'x': [9,7.30684034161465e-19]},
			{'x': [9,0.198045174223249]},
			{'x': [9,0.198045174223246]},
			{'x': [9,7.30684034161465e-19]},
			{'x': [9,0]}
		];

		actual = pdf( data, {
			'path': 'x.1',
			'alpha': 100,
			'beta': 100
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-12 );
		}

		// Specify a path with a custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,0.2]},
			{'x':[9,0.4]},
			{'x':[9,0.6]},
			{'x':[9,0.8]},
			{'x':[9,1]},
		];
		actual = pdf( data, {
			'path': 'x/1',
			'sep': '/',
			'alpha': 100,
			'beta': 100
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-12 );
		}
	});

	it( 'should evaluate the Beta pdf element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 25;
			d2[ i ] = PDF( i / 25, 2, 2 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = pdf( mat, {
			'alpha': 2,
			'beta': 2
		});

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = pdf( mat, {
			'copy': false,
			'alpha': 2,
			'beta': 2
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the Beta pdf element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 25;
			d2[ i ] = PDF( i / 25, 2, 2 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = pdf( mat, {
			'dtype': 'float32',
			'alpha': 2,
			'beta': 2
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( pdf( [] ), [] );
		assert.deepEqual( pdf( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( pdf( new Int8Array() ), new Float64Array() );
	});

});
