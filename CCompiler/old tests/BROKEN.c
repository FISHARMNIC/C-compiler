char string1[] = "hello_world";
char string2[] = "hola_mundo!";

void strcpy(char *str1, char *str2) {
    while(*str1 != 0) {
        asm("/*here*/");
        *str1 = *str2;
        str1 = eq(str1 + 1);
        str2 = eq(str2 + 1);
    }
}

int main() {
    strcpy(string1, string2);
    put_string(string1);
    return(0);
}