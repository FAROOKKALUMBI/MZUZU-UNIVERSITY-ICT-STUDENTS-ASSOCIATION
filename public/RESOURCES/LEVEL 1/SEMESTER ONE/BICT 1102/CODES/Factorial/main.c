#include <stdio.h>

// Function to calculate factorial
unsigned long long factorial(int n) {
    unsigned long long result = 1;  // Use unsigned long long to handle large results
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    int n;

    // Prompt user for input
    printf("Enter a positive integer: ");
    scanf("%d", &n);

    // Check if the input is a positive integer
    if (n < 0) {
        printf("Factorial is not defined for negative numbers.\n");
    } else {
        // Calculate and print the factorial
        unsigned long long fact = factorial(n);
        printf("%d! = %llu\n", n, fact);
    }

    return 0;
}
