#include <stdio.h>
int main()
{
    float physics,chemistry,biology,mathematics,computer;


    printf("Enter marks for physics: ");
    scanf("%f",&physics);

    printf("Enter marks for chemistry: ");
    scanf("%f",&chemistry);

    printf("Enter marks for biology: ");
    scanf("%f",&biology);

    printf("Enter marks for mathematics: ");
    scanf("%f",&mathematics);

    printf("Enter marks for computer: ");
    scanf("%f",&computer);

    float average = (physics + chemistry + biology + mathematics + computer)/5.0;

    if(average >=90){

        printf("Grade: A\n");
    }else if(average >=80){
        printf("Grade: B\n");
    }else if(average >=70){
        printf("Grade: C\n");
    }else if(average >=60){
        printf("Grade: D\n");
    }else if(average >=50){
        printf("Grade: E\n");
    }else if(average <50){
        printf("Grade:F");
    }else{

        printf("Invalid input");
        }

        return 0;

}
