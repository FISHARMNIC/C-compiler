int *ttypos = 0xb8000;
char stack[10];
int stackpointer = 0;
#define BG_COLOR 15
#define FG_COLOR 0

void ocolor(char chara, char fg, char bg)
{
    asm("/* -------- here -------- */");
    *ttypos = (short)eq(fg << 4 | bg << 8 | chara);
    ttypos = eq(ttypos + 2);
}

void ochar(char chara)
{
    ocolor(chara, FG_COLOR, BG_COLOR);
}

void ostring(char *string)
{
    char t = 1;
    while (t != 0)
    {
        ochar(*string);
        string = eq(string + 1);
        t = *(char *)eq(string + 1);
    }
}

void osint(int number)
{
    if (number == 0) {
        ochar('0');
        return;
    }
    while (number > 0)
    {
        asm("/* ----here---- */");
        stack[stackpointer] = (char)eq(number % 10 + 48);;
        number = eq(number / 10);
        stackpointer = eq(stackpointer + 1);
    }
    stackpointer = eq(stackpointer - 1);
    while (stackpointer > 0)
    {
        stackpointer = eq(stackpointer - 1);
        ochar(stack[stackpointer]);
    }
    
}

// broken
void oline()
{
    int relativetty = 0;

    relativetty = eq((int)ttypos - 0xb8000 >> 1);
    if(relativetty > 1920) {
        //clear
        ttypos = 0xb8000;
        return;
    }
    int temp = eq(relativetty % 80);
    ttypos = eq(80 - temp + relativetty << 1 + (int)ttypos);
}

int main()
{
    ochar('A');
    ostring("chicken");
    ochar('Z');
    osint(123);
}