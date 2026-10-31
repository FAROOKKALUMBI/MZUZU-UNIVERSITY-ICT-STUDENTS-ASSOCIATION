#include <Stdio.h>

int main()
{
    float Cost_price,Selling_price,Profit_loss,

    printf("Enter Cost Price: ");
    scanf("%f",&Cost_price);

    printf("Enter Selling Price: ");
    scanf("%f",&Selling_price);

    profit_loss = Cost_price - Selling_price;

    if(profit_loss>0){

        printf("You mad a profit:");
    }else if(profit_loss<0){
        printf("You made a loss:");
    }else ("NO loss and No Profit!");
