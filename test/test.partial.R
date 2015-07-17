options( digits = 16 );

cat( dbeta( c( -1, 0, 0.5, 1 ), 1, 1 ), sep = ",\n" )
cat( "\n" )

cat( "should evaluate the probability density function at `0`:\n" )
cat( dbeta( 0, 0.5, 0.5 ), sep = ",\n" )
cat( dbeta( 0, 2, 2 ), sep = ",\n" )
cat( dbeta( 0, 1, 1 ), sep = ",\n" )
cat( "\n" )

cat( "should evaluate the probability density function at `1`:\n" )
cat( dbeta( 1, 0.5, 0.5 ), sep = ",\n" )
cat( dbeta( 1, 5, 1 ), sep = ",\n" )
cat( dbeta( 1, 1, 1 ), sep = ",\n" )
