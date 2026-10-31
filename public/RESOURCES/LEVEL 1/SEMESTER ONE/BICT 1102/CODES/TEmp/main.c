#include <stdio.h>

int main() {
    float temperature, converted;
    char unit;

    printf("Enter the temperature followed by the unit (C/F): ");
    scanf("%f %c", &temperature, &unit);

    if (unit == 'C' || unit == 'c') {
        // Convert Celsius to Fahrenheit
        converted = (temperature * 9.0 / 5.0) + 32;
        printf("%.2f C is %.2f F\n", temperature, converted);
    } else if (unit == 'F' || unit == 'f') {
        // Convert Fahrenheit to Celsius
        converted = (temperature - 32) * 5.0 / 9.0;
        printf("%.2f F is %.2f C\n", temperature, converted);
    } else {
        printf("Invalid unit entered. Please enter 'C' for Celsius or 'F' for Fahrenheit.\n");
    }

    return 0;
}
