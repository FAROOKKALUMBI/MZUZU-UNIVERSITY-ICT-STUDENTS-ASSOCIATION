#include <stdio.h>
#include <stdlib.h>

int main()
{
    const int target_number = 12;
    int input_number;

    printf("Enter input number %d:",target_number);

    while(1){
        scanf("%d",&input_number);
    }if(input_number==target_number){

       printf("Congratulation you have entered correct number");
    }else{
        printf("mwalakwisa yesaniso");
        printf("Please enter the number %d:",target_number);
    }

    return 0;
}
