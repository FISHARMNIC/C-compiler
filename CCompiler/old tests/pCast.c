int main() {
    int jon = alloc(sizeof(int));
    char *pointer = jon;
    *pointer = 'A';
    put_char(* (char *)jon);
}