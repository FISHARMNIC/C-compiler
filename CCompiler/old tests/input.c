int gr = 0;
// BROKEN
int main()
{
    while (1 < 10)
    {
        gr = get_char();
        if (gr != 0)
        {
            put_char('A');
        }
    }
    return (0);
}