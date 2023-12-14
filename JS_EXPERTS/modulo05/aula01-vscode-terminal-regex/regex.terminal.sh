# a partir da pasta raiz
find . -name *test.js
find . -name *test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *js -not -path '*node_modules**' | ipt

CONTENT="'use strict;'"