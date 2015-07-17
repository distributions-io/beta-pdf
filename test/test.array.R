options( digits = 17 );

alpha = 10
beta = 10
x = seq( from = 0.01, to = 0.99, by = 0.01 )

cat( "Input: \n" )
cat( dbeta( x, alpha, beta ), sep = ",\n" )
