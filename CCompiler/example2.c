int *pointer = 0xB8000;

int kernel_entry() {
    *pointer = 777;
    return(0);
}