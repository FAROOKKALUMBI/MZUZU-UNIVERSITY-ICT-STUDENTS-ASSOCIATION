#include <stdio.h>

int main() {
    int i, j;
    char palindrome[3][5] = {" o o ", " o t o", "1   1"};

    // Print the palindrome pattern
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 5; j++) {
            printf("%c", palindrome[i][j]);
        }
        printf("\n");
    }

    return 0;
}
