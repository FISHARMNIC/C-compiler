void use_string(char * string, int test)
{
    test = 2;
    put_char(string[1]);
    put_int(test);
}

int main(void)
{
    use_string("hello", 1);
    return(0);
}