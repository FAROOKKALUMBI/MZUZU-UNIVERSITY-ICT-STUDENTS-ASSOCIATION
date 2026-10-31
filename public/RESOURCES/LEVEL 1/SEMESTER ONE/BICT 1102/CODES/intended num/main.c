#include <stdio.h>

int main() {
    int intendedNumber = 10;
    int enteredNumber;

    // Keep prompting the user until the intended number is entered
    do {
        // Prompt the user to enter a number
        printf("Enter the number %d: ", intendedNumber);
        scanf("%d", &enteredNumber);

        // Check if the entered number is equal to the intended number
        if (enteredNumber != intendedNumber) {
            // If not, print a message and allow the user to try again
            printf("Wrong number. Try again.\n");
        }
    } while (enteredNumber != intendedNumber);

    // Once the intended number is entered, print a success message
    printf("Congratulations! You entered the correct number: %d\n", intendedNumber);

    return 0;
}
