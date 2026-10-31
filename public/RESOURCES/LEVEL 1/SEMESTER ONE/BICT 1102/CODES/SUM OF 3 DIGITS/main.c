#include <stdio.h>

int main() {
    int number, digit1, digit2, digit3, sum;

    printf("Enter a three-digit number: ");
    scanf("%d", &number);

    // Extracting the digits
    digit1 = number / 100;        // Hundreds place
    digit2 = (number / 10) % 10;  // Tens place
    digit3 = number % 10;         // Units place

    // Calculating the sum of the digits
    sum = digit1 + digit2 + digit3;

    // Displaying the result
    printf("The sum : %d\n", sum);

    return 0;
}
