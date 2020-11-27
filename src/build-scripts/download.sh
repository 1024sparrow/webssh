#!/bin/bash

for i in \
	001-file-to-js-buffer.js \
	002-file-to-python-array.py
do
	wget https://github.com/1024sparrow/compile-processors/blob/master/src/files/$i
	chmod +x $i
done
