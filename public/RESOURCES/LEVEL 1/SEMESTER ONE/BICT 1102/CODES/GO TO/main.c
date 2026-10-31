#include <stdio.h>

int main() {
    int number;

    // Prompt the user to enter a positive number
enter_number:
    printf("Enter a positive number: ");
    scanf("%d", &number);

    // Check if the number is positive
    if (number <= 0) {
        printf("Error: Invalid number entered!\n");
        goto enter_number; // Jump back to the label 'enter_number'
    }

    printf("You entered: %d\n", number);

    return 0;
}

