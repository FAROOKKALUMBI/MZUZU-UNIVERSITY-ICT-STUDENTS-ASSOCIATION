#include <stdio.h>

#define DISCOUNT_THRESHOLD 100.0
#define DISCOUNT_RATE 0.10
#define TAX_RATE 0.08

int main() {
    int num_items;
    printf("Enter the number of items you wish to purchase: ");
    scanf("%d", &num_items);

    float total_cost = 0.0;

    for (int i = 0; i < num_items; i++) {
        int quantity;
        float price;
        printf("Enter the quantity and price of item %d: ", i + 1);
        scanf("%d %f", &quantity, &price);

        total_cost += quantity * price;
    }

    printf("Total cost before discounts and taxes: $%.2f\n", total_cost);

    // Apply discount if applicable
    float discount = 0.0;
    if (total_cost > DISCOUNT_THRESHOLD) {
        discount = total_cost * DISCOUNT_RATE;
        printf("Discount applied: $%.2f\n", discount);
    }

    total_cost -= discount;

    // Apply tax
    float tax = total_cost * TAX_RATE;
    printf("Tax applied: $%.2f\n", tax);

    total_cost += tax;

    // Display final amount
    printf("Final amount to be paid: $%.2f\n", total_cost);

    return 0;
}
