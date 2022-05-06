char *pointer = 0xB8000;
char exampleString[] = "chicken";
char qd[] = "chicken";
char *string = 0;

int main() {
    string = &exampleString;
    while(*string != 0) {
        put_char(*string);
        string = eq(string + 1);
    }
    return(0);
}