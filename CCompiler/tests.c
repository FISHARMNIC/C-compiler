char character = 0;
int number = 0;
char inputbuffer[50]; 

int main()
{
    // geti(&number); NOT WORKING 
    // put_int(number);
    gets(inputbuffer);
    put_string(inputbuffer);
    return (0);
}