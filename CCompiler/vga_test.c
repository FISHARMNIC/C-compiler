char *pointer = 0xB8000;
char exampleString[] = "chicken";

// VGA formatter
int formatVGA(int bgColor, int fgColor, int character)
{
    return(eq(bgColor << 4 | fgColor << 8 | character));
}

void putchar(int character)
{
    *pointer = formatVGA(0, 15, character);
    pointer = eq(pointer + 2);   
}

void putstring(int *string)
{
    while(*string != 0) {
        put_char(*string);
        string = eq(string + 1);
    }
}

int main() {
    putchar('A');
    new_line();
    putstring(&exampleString);
    return(0);
}