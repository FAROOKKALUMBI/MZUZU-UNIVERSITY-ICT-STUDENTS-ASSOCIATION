#include <stdio.h>

// Function prototype
void Kusintha(int num1, int num2);

int main() {
    int a = 5;
    int b = 10;

    // Calling the function
    Kusintha(a, b);

    // Output values after function call to demonstrate they were passed by value
    printf("a after function call: %d\n", a);
    printf("b after function call: %d\n", b);

    return 0;
}

// Function definition
void Kusintha(int num1, int num2) {
    // Modify the local copies of the arguments
    num1 = 100;
    num2 = 200;

    printf("num1 inside function: %d\n", num1);
    printf("num2 inside function: %d\n", num2);
}
