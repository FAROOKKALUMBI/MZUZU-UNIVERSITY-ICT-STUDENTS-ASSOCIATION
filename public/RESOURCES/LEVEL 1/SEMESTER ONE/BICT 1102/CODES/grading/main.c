#include <stdio.h>

int main() {
    int grades[5];
    int sum = 0;
    float average;

    // Input grades
    printf("Enter the grades for five exams:\n");
    for (int i = 0; i < 5; i++) {
        printf("Grade for exam %d: ", i + 1);
        scanf("%d", &grades[i]);
        sum += grades[i];
    }

    // Compute average
    average = (float)sum / 5;

    // Output average
    printf("Average grade: %.2f\n", average);

    // Provide feedback based on average
    if (average >= 60) {
        printf("Well done!\n");
    } else {
        printf("You need to pull up your socks!\n");
    }

    return 0;
}
