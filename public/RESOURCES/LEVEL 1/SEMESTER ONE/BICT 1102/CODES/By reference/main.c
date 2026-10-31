#include <stdio.h>

// Function prototype
void incrementByReference(int *num);

int main() {
    int number = 10;

    printf("Original value: %d\n", number);

    // Call the function and pass the argument by reference
    incrementByReference(&number);

    // Print the value after the function call to show it has changed
    printf("Value after function call: %d\n", number);

    return 0;
}

// Function definition
void incrementByReference(int *num) {
    // Increment the value of the argument pointed to by num
    *num = *num + 1;

    // Print the incremented value inside the function
    printf("Value inside function: %d\n", *num);
}
