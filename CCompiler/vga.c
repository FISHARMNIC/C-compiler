int *ttypos = 0xb8000;
char BG_COLOR = 15;
char FG_COLOR = 0;

void ochar(char chara, char fg, char bg)
{
    *ttypos = (short)eq(fg << 4 | bg << 8 | chara);
    ttypos = eq(ttypos + 2);
}

void ostring(char *string)
{
    char t = 1;
    while (t != 0)
    {
        ochar(*string, FG_COLOR, BG_COLOR);
        string = eq(string + 1);
        t = *(char *)eq(string + 1);
    }
}

int main()
{
    ochar('A', 0, 15);
    ostring("hello");
    ochar('Z', 0, 15);
}
