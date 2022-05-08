int main(void) {
    int outer = 0;
    int inner = 0;
    while(outer < 10)
    {
        put_int(outer);
        inner = 0;
        while(inner < 2)
        {
            put_char(eq(inner + 65));
            inner = eq(inner + 1);
        }
        outer = eq(outer + 1);
    }
    return(0);
}