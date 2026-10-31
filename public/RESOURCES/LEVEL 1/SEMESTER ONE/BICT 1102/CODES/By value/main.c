#include <stdio.h>

// Function prototype
void incrementByValue(int num);

int main() {
    int number = 10;

    printf("Original value: %d\n", number);

    // Call the function and pass the argument by value
    incrementByValue(number);

    // Print the original value to show it hasn't changed
    printf("Value after function call: %d\n", number);

    return 0;
}

// Function definition
void incrementByValue(int num) {
    // Increment the value of the argument
    num = num + 1;

    // Print the incremented value inside the function
    printf("Value inside function: %d\n", num);
}
