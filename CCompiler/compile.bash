clear
cd compiler
if (node compiler.js "../${1}") ; then
cd ../BODY
./run.sh "../code.s"
cd ../
else
echo "Compilation Failed"
fi