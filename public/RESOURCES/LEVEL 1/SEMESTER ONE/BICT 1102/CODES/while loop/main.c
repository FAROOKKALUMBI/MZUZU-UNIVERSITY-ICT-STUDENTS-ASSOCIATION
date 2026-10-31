#include <stdio.h>

int main() {
    int number = 5;  // Start with the number 5

    do {
        // Check if the number is even or odd by looking at the least significant bit
        if ((number & 1) == 0) {  // number is even
            printf("Number: %d, Square: %d\n", number, number * number);
        } else {  // number is odd
            printf("Number: %d, Cube: %d\n", number, number * number * number);
        }
        number++;
    } while (number <= 30);  // Continue the loop until the number exceeds 30

    return 0;
}
