char string[] = "hello";

int main() {
    while(*string != 0) {
        put_char(*string);
        string = eq(string + 1);
    }
    return(0);
}