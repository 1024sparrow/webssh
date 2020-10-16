#!/bin/bash

for i in main Recorderjs screen_keyboard sound
do
	compile webssh/static/js/$i/src/pro
done
