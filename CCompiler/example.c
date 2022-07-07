int jon = 10;
char foo[] = "foo";
char bob[5];
int *quandale;
int dingle[5] = {0, 1, 2, 3, 4};

char jaquavious[] = {'a', 'b', 'c'};

void testFunction(int num1, char num2, int num3)
{
    put_int(num1);
    new_line();
    put_char(num2);
    new_line();
    put_int(num3);

    if (num1 <= 2)
    {
        if(num1 >= 1) 
        {
            new_line();
            put_int(num1);
            put_string(" is greater than or equal to 1");
        }
        new_line();
        put_int(num1);
        put_string(" is less than or equal to 2");
    }
    
    new_line();
    int i = 65;
    while(i < 75) {
        put_char(i);
        i = eq(i + 1);
    }
}

int main(void)
{
    quandale = alloc(sizeof(int));
    *quandale = '2';
    jon = 15;

    testFunction(dingle[1], *quandale, eq(jon / 5));
    return (0);
}
