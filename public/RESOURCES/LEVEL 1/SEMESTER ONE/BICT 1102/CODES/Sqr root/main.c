#include <stdio.h>
#include <math.h>

// Function prototype
float SquareRoot(float number);

int main() {
    float number, result;

    // Prompt the user to enter a number
    printf("Enter a number: ");
    scanf("%f", &number);

    // Call the SquareRoot function to calculate the square root
    result = SquareRoot(number);

    // Print the result
    printf("Square root of %.2f is: %.2f\n", number, result);

    return 0;
}

// Function definition to calculate square root
float SquareRoot(float number) {
    return sqrt(number);
}
