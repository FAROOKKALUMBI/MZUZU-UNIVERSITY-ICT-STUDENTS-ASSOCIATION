#include <stdio.h>

// Function to calculate the square of a number
int square(int num) {
    return num * num;
}

// Function to calculate the cube of a number
int cube(int num) {
    return num * num * num;
}

int main() {
    int i;

    printf("Number\tSquare\tCube\n");
    printf("-------------------------\n");

    // Loop from 1 to 20
    for (i = 1; i <= 20; i++) {
        // Call the square and cube functions
        int sq = square(i);
        int cb = cube(i);

        // Print the results
        printf("%d\t%d\t%d\n", i, sq, cb);
    }

    return 0;
}
