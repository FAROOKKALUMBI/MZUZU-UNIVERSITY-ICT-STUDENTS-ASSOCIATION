#include <stdio.h>

#define TAX_RATE 0.07  // 7% tax
#define DISCOUNT_RATE 0.1  // 10% discount for example

int main() {
    int num_items, i;
    float price, quantity, subtotal = 0, discount, tax, total;

    printf("Enter the number of items: ");
    scanf("%d", &num_items);

    for (i = 0; i < num_items; i++) {
        printf("Enter the price and quantity for item %d: ", i + 1);
        scanf("%f %f", &price, &quantity);
        subtotal += price * quantity;
    }

    // Applying discount
    discount = subtotal * DISCOUNT_RATE;
    subtotal -= discount;

    // Applying tax
    tax = subtotal * TAX_RATE;
    total = subtotal + tax;

    // Displaying the final amount
    printf("Subtotal after discount: $%.2f\n", subtotal);
    printf("Tax: $%.2f\n", tax);
    printf("Total amount: $%.2f\n", total);

    return 0;
}

