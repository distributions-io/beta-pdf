options( digits = 17 );

alpha = 100
beta = 100
x = seq( from = 0.05, to = 0.95, by = 0.05 )

cat( "Input: \n" )
cat( unlist( Map( function( x ) { paste( "{'x': ", x, "}", sep="" ) }, x ) ),sep = ",\n" )

cat( "Output: \n" )
cat( unlist( Map( function( x ) { paste( "{'x': ", x, "}", sep="" ) }, dbeta( x, alpha, beta ) ) ),sep = ",\n" )

cat( "Input: \n" )
cat( unlist( Map( function( x ) { paste( "{'x': [9,", x, "]}", sep="" ) }, x ) ),sep = ",\n" )

cat( "Output: \n" )
cat( unlist( Map( function( x ) { paste( "{'x': [9,", x, "]}", sep="" ) }, dbeta( x, alpha, beta ) ) ),sep = ",\n" )
