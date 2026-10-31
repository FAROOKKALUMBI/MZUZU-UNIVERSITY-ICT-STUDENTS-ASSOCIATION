#include <stdio.h>

// Function to find the maximum of three numbers
int max(int a, int b, int c) {
    int max = a;
    if (b > max) {
        max = b;
    }
    if (c > max) {
        max = c;
    }
    return max;
}

// Function to find the minimum of three numbers
int min(int a, int b, int c) {
    int min = a;
    if (b < min) {
        min = b;
    }
    if (c < min) {
        min = c;
    }
    return min;
}

int main() {
    int num1, num2, num3;

    // Prompt user to enter three numbers
    printf("Enter three numbers: ");
    scanf("%d %d %d", &num1, &num2, &num3);

    // Call the max function and store the result
    int maximum = max(num1, num2, num3);

    // Call the min function and store the result
    int minimum = min(num1, num2, num3);

    // Display the maximum and minimum numbers
    printf("Maximum number: %d\n", maximum);
    printf("Minimum number: %d\n", minimum);

    return 0;
}
