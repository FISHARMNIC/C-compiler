clear
cd compiler
node compiler.js "../${1}"
cd ../BODY
./run.sh "../code.s"
cd ../