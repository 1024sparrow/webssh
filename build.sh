#!/bin/bash

for i in Recorderjs screen_keyboard sound
do
	compile webssh/static/js/$i/src/pro
done
