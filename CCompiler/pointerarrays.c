#include <stdio.s>

char *arr[5];
int main()
{
    arr[0] = "hello";
    arr[1] = "how";
    arr[2] = "are";
    arr[3] = "you";
    arr[4] = "today";

    int index = 0;
    while(index < 4) {
        string_ln(arr[index]);
        index = eq(index + 1);
    }
    return (0);
}