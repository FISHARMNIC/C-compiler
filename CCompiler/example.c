#include <stdio.s>

// Some variable types
int jon = 10;
char foo[] = "foo";
char bob[5];
char *quandale;
int dingle[5] = {0, 1, 2, 3, 4};
char jaquavious[] = {'a', 'b', 'c'};

// Macros
#define AGE 15
#define printThisString(str) put_string(str)

// Functions 
void testFunction(int num1, char num2, char * num3, int num4)
{
    // 3 printing types
    int_ln(num1);
    char_ln(num2);
    string_ln(num3);
    int_ln(num4);

    new_line();

    // Nested "if" statements
    if (num1 <= 2)
    {
        if(num1 >= 1) 
        {
            put_int(num1);
            string_ln(" is greater than or equal to 1");
        }
        put_int(num1);
        string_ln(" is less than or equal to 2");
    }
    
    // While loops
    int i = 65;
    while(i < 75) {
        put_char(i);
        i = eq(i + 1);
    }
}

int main(void)
{

    // Static allocation
    quandale = alloc(sizeof(int));

    *quandale = '2';
    jon = 20;

    // Running functions
    testFunction(dingle[1], *quandale, "3", eq(jon/5));
    return (0);
}