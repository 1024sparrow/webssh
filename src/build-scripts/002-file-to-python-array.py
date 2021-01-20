#!/usr/bin/env python3
#-*- coding: utf-8 -*-

import sys, re

# process file located at sys.argv[1]

retVal = ''
with open(sys.argv[1], 'rb') as file:
	for byte in file.read():
		if retVal:
			retVal += ','
		retVal += str(byte)
retVal = 'bytearray([%s])' % retVal

with open(sys.argv[1], 'w') as file:
	file.write(retVal)
