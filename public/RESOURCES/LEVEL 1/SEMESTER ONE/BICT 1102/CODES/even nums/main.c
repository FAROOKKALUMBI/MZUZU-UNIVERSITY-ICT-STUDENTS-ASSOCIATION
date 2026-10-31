#include <stdio.h>

int main() {
    // Loop from 0 to 20
    for (int i = 0; i <= 20; i++) {
        // Check if the number is even
        if (i % 2 == 0) {
            printf("%d\n", i); // Print the even number
        }
    }

    return 0;
}
