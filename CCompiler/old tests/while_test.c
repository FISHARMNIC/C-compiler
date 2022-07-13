char exampleString[] = "chicken";
char *string = 0;

int main() {
    string = exampleString;
    while(*string != 0) {
        put_char(*string);
        string = eq(string + 1);
    }
    return(0);
}