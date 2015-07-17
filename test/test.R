options( digits = 16 );

cat( "number:\n\n" )
beta = 2
alpha = 2

cat( dbeta( 0, alpha, beta ), sep = ",\n" )
cat( dbeta( 0.5, alpha, beta ), sep = ",\n" )
cat( "\n" )

cat( "array:\n\n" )
beta = 1
alpha = 10
x = seq( 0, 1, 0.2 )

cat( dbeta( x, alpha, beta ), sep = ",\n" )
cat( "\n" )

cat( "typed-array:\n\n" )
beta = 10
alpha = 1
x = seq( 0, 1, 0.2 )

cat( dbeta( x, alpha, beta ), sep = ",\n" )
cat( "\n" )

cat( "accessor:\n\n" )
beta = 50
alpha = 50
x = seq( 0, 1, 0.2 )

cat( dbeta( x, alpha, beta ), sep = ",\n" )
cat( "\n" )

cat( "deepset:\n\n" )
beta = 100
alpha = 100
x = seq( 0, 1, 0.2 )

cat( unlist( Map( function( x ) { paste( "{'x': [9,", x, "]}", sep="" ) }, dbeta( x, alpha, beta ) ) ),sep = ",\n" )
cat( "\n" )

cat( "matrix:\n\n" )
beta = 4
alpha = 2
x = c( 0, 0, 0.5, 0.5, 1, 1 )

cat( dbeta( x, alpha, beta ), sep = ",\n" )
cat( "\n" )

cat( "matrix (float32):\n\n" )
beta = 4
alpha = 2
x = c( 0, 0, 0.5, 0.5, 1, 1 )

cat( dbeta( x, alpha, beta ), sep = ",\n" )
