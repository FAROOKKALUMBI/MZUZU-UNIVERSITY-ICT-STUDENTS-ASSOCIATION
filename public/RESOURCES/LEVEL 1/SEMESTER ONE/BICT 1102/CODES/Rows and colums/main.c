#include <stdio.h>

int main() {
    int rows = 3;
    int cols = 5;

    // Loop through each row
    for (int i = 1; i <= rows; i++) {
        // Loop through each column
        for (int j = 1; j <= cols; j++) {
            // Print the square of the column number for the first row
            // Print the cube of the column number for the second row
            // Print the fourth power of the column number for the third row
            if (i == 1) {
                printf("%d\t", j * j);
            } else if (i == 2) {
                printf("%d\t", j * j * j);
            } else if (i == 3) {
                printf("%d\t", j * j * j * j);
            }
        }
        printf("\n"); // Move to the next line after printing each row
    }

    return 0;
}
