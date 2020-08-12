#!/bin/bash

for i in $*
do
	if [[ "$i" == "--help" || $i == "-h" ]]
	then
		echo "
--help
    show this help
--start-server
	start
"
		exit 0
	fi
done

dirpath=$(dirname $(realpath $0))

function startServer {
	ip="$(dig +short myip.opendns.com @resolver1.opendns.com)"
	port=4430
	httpPort=50100
	targetDomain="$ip"
	echo "public IP: $ip"
	echo "port: $port"
	pushd $dirpath > /dev/null
	if [ -z $ip ]
	then
		echo "can not get ip"
		exit 1
	fi
	mkdir -p https
	if [ ! -r https/targetDomain ]
	then
		echo localhost > https/targetDomain
	fi
	if [[ "$(cat https/targetDomain)" != "$targetDomain" ]]
	then
		echo generating key-certificate pair for the target \"$targetDomain\"
		echo $targetDomain > https/targetDomain
		openssl req -x509 -nodes -newkey rsa:2048 -days 365 -keyout "${dirpath}/https/key" -subj /C=RU/ST=./L=./O=./CN=${targetDomain} -out "${dirpath}/https/cert"
	fi
	popd > /dev/null # $dirpath
	SOUND_PIPE_P=qq SOUND_PIPE_C=ww python "$dirpath"/run.py --certfile="$dirpath"/https/cert --keyfile="$dirpath"/https/key --sslport=$port --port=$httpPort
}

for i in $*
do
	if [[ ${i} == "--start-server" ]]
	then
		startServer
	fi
done
