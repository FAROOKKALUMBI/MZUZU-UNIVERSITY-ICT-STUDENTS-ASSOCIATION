#include <stdio.h>

int main() {
    int score = 0;
    char playAgain;

    printf("Welcome to the Math Quiz Game!\n");

    do {
        int trials = 4; // Number of trials allowed for each question

        // Question 1: 5 * 7
        int answer1 = 35;
        int userAnswer1;
        printf("\nQuestion 1: What is 5 * 7?\n");
        do {
            printf("Enter your answer: ");
            scanf("%d", &userAnswer1);
            trials--;
            if (userAnswer1 == answer1) {
                printf("Correct! You got it right in %d trials.\n", 4 - trials);
                score++;
                break;
            } else if (trials == 0) {
                printf("Sorry, you ran out of trials. The correct answer is %d.\n", answer1);
                break;
            } else {
                printf("Incorrect answer. You have %d trials left.\n", trials);
            }
        } while (trials > 0);

        // Question 2: 12 / 3
        int answer2 = 4;
        int userAnswer2;
        trials = 4; // Reset trials for the next question
        printf("\nQuestion 2: What is 12 / 3?\n");
        do {
            printf("Enter your answer: ");
            scanf("%d", &userAnswer2);
            trials--;
            if (userAnswer2 == answer2) {
                printf("Correct! You got it right in %d trials.\n", 4 - trials);
                score++;
                break;
            } else if (trials == 0) {
                printf("Sorry, you ran out of trials. The correct answer is %d.\n", answer2);
                break;
            } else {
                printf("Incorrect answer. You have %d trials left.\n", trials);
            }
        } while (trials > 0);

        // Question 3: 9 - 5
        int answer3 = 4;
        int userAnswer3;
        trials = 4; // Reset trials for the next question
        printf("\nQuestion 3: What is 9 - 5?\n");
        do {
            printf("Enter your answer: ");
            scanf("%d", &userAnswer3);
            trials--;
            if (userAnswer3 == answer3) {
                printf("Correct! You got it right in %d trials.\n", 4 - trials);
                score++;
                break;
            } else if (trials == 0) {
                printf("Sorry, you ran out of trials. The correct answer is %d.\n", answer3);
                break;
            } else {
                printf("Incorrect answer. You have %d trials left.\n", trials);
            }
        } while (trials > 0);

        // Display score
        printf("\nYour score: %d/%d\n", score, 3);

        // Ask user if they want to play again
        printf("Do you want to play again? (Y/N): ");
        scanf(" %c", &playAgain);
        score = 0; // Reset score for the next game
    } while (playAgain == 'Y' || playAgain == 'y');

    printf("Thank you for playing the Math Quiz Game!\n");

    return 0;
}
