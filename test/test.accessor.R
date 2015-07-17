options( digits = 16 );

alpha = 0.5
beta = 0.5
x = seq( from = 0.01, to = 0.99, by = 0.01 )

cat( dbeta( x, alpha, beta ), sep = ",\n" )
