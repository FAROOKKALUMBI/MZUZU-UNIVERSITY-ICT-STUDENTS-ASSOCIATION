#include <stdio.h>

int main() {
    float score1, score2, score3, score4;
    float average, highest, lowest;

    printf("Enter the score of the first exam: ");
    scanf("%f", &score1);
    printf("Enter the score of the second exam: ");
    scanf("%f", &score2);
    printf("Enter the score of the third exam: ");
    scanf("%f", &score3);
    printf("Enter the score of the fourth exam: ");
    scanf("%f", &score4);

    // Calculating the average score
    average = (score1 + score2 + score3 + score4) / 4.0;

    // Determining the highest score
    highest = score1;
    if (score2 > highest) highest = score2;
    if (score3 > highest) highest = score3;
    if (score4 > highest) highest = score4;

    // Determining the lowest score
    lowest = score1;
    if (score2 < lowest) lowest = score2;
    if (score3 < lowest) lowest = score3;
    if (score4 < lowest) lowest = score4;

    // Displaying the results
    printf("Average score: %.2f\n", average);
    printf("Highest score: %.2f\n", highest);
    printf("Lowest score: %.2f\n", lowest);

    return 0;
}
