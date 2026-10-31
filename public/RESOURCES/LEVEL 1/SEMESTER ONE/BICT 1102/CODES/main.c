#include <stdio.h>
int main()
{
    int num_tickets;
    float ticket_price;
    float service_fee_per_ticket = 2000.00;

    printf("Enter Number of tickets: ");
    scanf("%d",&num_tickets);

    printf("Enter the price of each ticket: ");
    scanf("%f",&ticket_price);

    float total_cost = num_tickets * ticket_price * service_fee_per_ticket;

    printf("Total_cost is: MK%.2f\n",total_cost);

    return 0;


}
