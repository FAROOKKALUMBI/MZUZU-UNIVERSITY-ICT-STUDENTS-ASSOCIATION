#include <stdio.h>

int main() {
    int i, j;

    // Outer loop for numbers from 1 to 10
    for (i = 1; i <= 10; i++) {
        printf("Multiplication table for %d:\n", i);

        // Inner loop for multiplication from 1 to 10
        for (j = 1; j <= 10; j++) {
            printf("%d * %d = %d\n", i, j, i * j);
        }

        // Print a separator after each table
        printf("\n");
    }

    return 0;
}
