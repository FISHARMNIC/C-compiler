
char string[] = "hello";
int intarr[] = {1,2,3};

void test_fn(int dummy, char *thestring, int dummy2)
{
    put_int(dummy);
    put_string(thestring);
    put_int(dummy2);
}

int main()
{
    test_fn(123,string, 456);
    put_string("chicken");
    put_char(string[1]);
    put_int(intarr[1]);
    return (0);
}