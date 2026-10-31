#include <stdio.h>

int main() {
    float salary, taxed_salary;

    // Prompt the user to enter the salary
    printf("Enter the salary of the new recruit: ");
    scanf("%f", &salary);

    // Check if the salary is less than K900
    if (salary < 900) {
        // Reject salary amounts less than K900
        printf("Salary must be at least K900. Please enter a valid salary.\n");
    } else {
        // Calculate the taxed salary if the salary is K900 or more
        taxed_salary = salary - (salary * 0.008); // 0.8% tax deducted

        // Print the taxed salary
        printf("The taxed salary of the new recruit is: %.2f\n", taxed_salary);
    }

    return 0;
}
