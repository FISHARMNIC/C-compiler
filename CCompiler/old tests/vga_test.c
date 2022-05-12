char *ttyPosition = 0xB8000;
char exampleString[] = "chicken";

int BGcolor = 0; // BLACK
int FGcolor = 15; // WHITE

void putchar(char character)
{
    *ttyPosition = character;
    ttyPosition = eq(ttyPosition + 1);   
    *ttyPosition = eq(BGcolor << 2 | FGcolor);
    ttyPosition = eq(ttyPosition + 1); 
}

void putstring(char *string)
{
    while(*string != 0) {
        putchar(*string);
        string = eq(string + 1);
    }
}

void putint(int number)
{
    // BROKEN
    while(number > 0) {
        putchar(eq(number % 10 + 48));
        number = eq(number / 10);
        halt();
    }
}

int main() {
    putchar('A');
    putstring(exampleString);
    return(0);
}