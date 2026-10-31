#include <stdio.h>
int main()
{
    float num1,num2,num3,average;

    printf("Enter First Number: ");
    scanf("%f",&num1);

    printf("Enter Second Number: ");
    scanf("%f",&num2);

    printf("Enter Third Number: ");
    scanf("%f",&num3);

    average = (num1 + num2 + num3)/3.0;

    printf("The average of %.2f ,%.2f, and %.2f is :%2.f",num1,num2,num3,average);


    return 0;

}
