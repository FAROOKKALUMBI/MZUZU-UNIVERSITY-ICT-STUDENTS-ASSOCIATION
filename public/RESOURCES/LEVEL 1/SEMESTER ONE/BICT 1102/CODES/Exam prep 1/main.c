#include <stdio.h>

int main() {
    int number, digit, sum = 0;

    // Get input from the user
    printf("Enter a three-digit number: ");
    scanf("%d", &number);

    // Extract digits and calculate sum
    digit = number % 10; // Extracts the last digit
    sum += digit;
    number /= 10; // Remove the last digit

    digit = number % 10; // Extracts the middle digit
    sum += digit;
    number /= 10; // Remove the middle digit

    digit = number % 10; // Extracts the first digit
    sum += digit;

    // Display the sum
    printf("The sum of the digits of %d is:%d\n", number, sum);

    return 0;
}
