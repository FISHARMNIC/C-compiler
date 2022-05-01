char *pointer = 0xB8000;
char exampleString[] = "chicken";

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
    putchar(*string);
    string = eq(string + 1);
    putchar(*string);
    string = eq(string + 1);
    putchar(*string);
    string = eq(string + 1);
    putchar(*string);
    string = eq(string + 1);
    putchar(*string);
    string = eq(string + 1);
    putchar(*string);
    string = eq(string + 1);
}

int main() {
    putstring(&exampleString);
    return(0);
}