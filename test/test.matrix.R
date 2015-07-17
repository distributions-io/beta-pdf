options( digits = 16 );

alpha = 2
beta = 2
x = 0:24 / 25

cat( "Input: \n" )
cat( x, sep= ",\n" )

cat( "Output: \n" )
cat( dbeta( x, alpha, beta ), sep = ",\n" )
