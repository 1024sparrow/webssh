#!/usr/bin/node
// Единственный аргумент: путь до временного файла, содержимое которого нам надо поправить

const fs = require('fs');
const filePath = process.argv[2];

//console.log(filePath);

const data = fs.readFileSync(filePath); // Buffer

var result = '';
for (let i = 0 ; i < data.length ; ++i){
	if (result){
		result += ',';
	}
	result += data.readUInt8(i);
}
result = `Buffer.from([${result}])`;

fs.writeFileSync(filePath, result, 'utf-8');
