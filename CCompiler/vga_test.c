int *pointer = 0xB8000;

int formatVGA(char bgColor, char fgColor, char character)
{
    return(eq(bgColor << 4 | fgColor << 8 | character));
}

int main() {

    *pointer = formatVGA(0, 15, 'A');
    return(0);
}