// NOtes: add _temp_reg_2 and ...base_2_ for same line stuff

int jon = 10;
char foo[] = "foo";
char bob[5];
char *quandale;
int dingle[5] = {1, 2, 3, 4, 5};
char jaquavious[] = {'a', 'b', 'c'};

void testFunction(int num1, int num2, int num3)
{
    put_int(num1);
    put_int(num2);
    put_int(num3);
}

int main(void)
{
    quandale = 100;
    *quandale = 2;
    jon = 3;

    // array indexing not working 
    testFunction(1, *quandale, jon);
    return(0);
}