void callbackFN(char done) {
    put_char(done);
}

void func(int *callback) {
    put_char('A');
    (callback)('Z');
}

void main() {
    func(&callbackFN);
}