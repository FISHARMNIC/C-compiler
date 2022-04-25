// NOTES:
/*
 * shifting stack also needs to remember the position of the second stack, aka the call stack
 * so there will be two stack, the parameters and the calls
 * 
*/

int jon = 10;
char foo[] = "foo";
char bob[5];
char *quandale[10];
int dingle[5] = {1, 2, 3, 4, 5};
char jaquavious[] = {'a', 'b', 'c'};

void testFunction(int num1, int num2, int num3)
{
    put_int(num1);
    put_int(num2);
    put_int(num3);
}

int kernel_entry(void)
{
    jon = 5;
    testFunction(1, 2, 3);
    return(0);
}