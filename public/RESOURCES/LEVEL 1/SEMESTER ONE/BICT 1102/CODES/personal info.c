#include <stdio.h>
int main()
{
    int age;
    char First_Name[50],Last_Name[50],gender;

    printf("\nEnter your First Name: ");
    scanf("%s",&First_Name);

    printf("\nEnter your Last Name: ");
    scanf("%s",&Last_Name);

    printf("\nEnter your Gender(Male/Female): ");
    scanf("%s",&gender);

    printf("\nEnter your age: ");
    scanf("%d",&age);

    printf("\t\t summary\n");
    printf("\nFirst Name is:%s\n",First_Name);
    printf("\nLast Name is:%c\n",Last_Name);
    printf("\nYour Gender is:%s",gender);
    printf("Your Age is:%d\n",age);

    return 0;


}
