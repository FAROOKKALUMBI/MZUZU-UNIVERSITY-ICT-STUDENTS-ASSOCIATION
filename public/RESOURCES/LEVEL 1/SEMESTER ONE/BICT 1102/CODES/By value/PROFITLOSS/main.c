#include <stdio.h>
int main(){
   float cost_price,Selling_price,Profit_loss;

   printf("Enter cost Price:");
   scanf("%f",&cost_price);

   printf("Enter Selling price");
   scanf("%f",&Selling_price);

   profit_loss = cost_price - Selling_price;

   if(profit_loss >0 ){
      printf("You made a profit:%.2f",profit_loss);

   }else if(Profit_loss<0 ){
      printf("You made a loss:%2.f",profit_loss);

   }else{
       printf("you made a loss or profit")

   }

   return 0;



}
