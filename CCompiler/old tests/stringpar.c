void use_string(char * string, int test)
{
    put_char(string[1]);
    put_int(test);
}

int main(void)
{
    use_string("hello", 1);
    return(0);
}

