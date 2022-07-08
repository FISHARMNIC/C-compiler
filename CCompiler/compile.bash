clear
cd compiler
if (node compiler.js "../${1}") ; then
cd ../BODY
./run.sh "../assembly/code.s"
cd ../
else
echo "Compilation Failed"
fi