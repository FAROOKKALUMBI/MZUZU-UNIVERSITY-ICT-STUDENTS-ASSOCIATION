#include <stdio.h>

int main() {
    int num, count = 0;
    double sum = 0.0, mean;

    printf("Enter positive numbers (terminate with 0):\n");

    // Read numbers until 0 is entered
    do {
        printf("Enter a number: ");
        scanf("%d", &num);

        // Check if the entered number is positive
        if (num > 0) {
            sum += num; // Add the number to the sum
            count++;    // Increment the count of numbers
        } else if (num < 0) {
            printf("Please enter positive numbers only.\n");
        }
    } while (num != 0);

    // Calculate the arithmetic mean if numbers were entered
    if (count > 0) {
        mean = sum / count;
        printf("Arithmetic mean: %.2f\n", mean);
    } else {
        printf("No positive numbers entered.\n");
    }

    return 0;
}
