#include <stdio.h>

// Function prototypes
double incomeTax(double salary);
double medicalScheme(double salary);

int main() {
    double salary, tax, medicalContribution;

    // Ask user to input their salary
    printf("Enter your salary: ");
    scanf("%lf", &salary);

    // Calculate the income tax and medical scheme contribution
    tax = incomeTax(salary);
    medicalContribution = medicalScheme(salary);

    // Print the results
    printf("Income Tax paid to the government: %.2f\n", tax);
    printf("Medical Scheme contribution: %.2f\n", medicalContribution);

    return 0;
}

// Function to calculate income tax
double incomeTax(double salary) {
    return salary * 0.10;  // Assuming 10% income tax rate
}

// Function to calculate medical scheme contribution
double medicalScheme(double salary) {
    return salary * 0.05;  // 5% medical scheme contribution
}
