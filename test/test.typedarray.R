options( digits = 16 );

alpha = 20
beta = 5
x = seq( from = 0.01, to = 0.99, by = 0.01 )

cat( "Input: \n" )
cat( x, sep= ",\n" )

cat( "Output: \n" )
cat( dbeta( x, alpha, beta ), sep = ",\n" )
