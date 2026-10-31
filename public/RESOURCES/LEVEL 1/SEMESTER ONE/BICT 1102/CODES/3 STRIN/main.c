#include <stdio.h>
#include <string.h>

int main() {
    char STRING1[50] = "Hello";
    char STRING2[50] = "World";
    char STRING3[50] = "";

    // Copy STRING1 into STRING3
    strcpy(STRING3, STRING1);
    printf("STRING3 after copying STRING1: %s\n", STRING3);

    // Concatenate STRING1 and STRING2
    strcat(STRING1, STRING2);
    printf("STRING1 after concatenation with STRING2: %s\n", STRING1);

    return 0;
}
