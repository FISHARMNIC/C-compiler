int jon = 10;
char foo[] = "foo";
char bob[5];
int *quandale;
int dingle[5] = {0, 1, 2, 3, 4};
char jaquavious[] = {'a', 'b', 'c'};

void testFunction(int num1, int num2, int num3)
{
    put_int(num1);
    put_int(num2);
    put_int(num3);
}
// comment
int main(void)
{
    quandale = 100;
    *quandale = 2;
    jon = 3;

    testFunction(dingle[1], *quandale , jon);
    return(0);
}