//--------------------------------------------
//
// Read directory and gather images
//
//--------------------------------------------
'use strict';

var fs = require('fs');
var chalk = require('chalk');
var q = require('q');
var path = require('path');
var filesToProcess = [];


var Read = function(directory){

	var deferred = q.defer();

	fs.readdir(directory, function(err, files){
	
		if (err){
			console.log(chalk.yellow.bgRed('Error: ', err));
			deferred.reject(err);
		
		}

		if (files.length){
			
			for (var i = 0; i < files.length; i++ ){
				var file = files[i];
				var fileExtension = path.extname(file);

				if (fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png' || fileExtension === '.gif'){
					filesToProcess.push(file);
				}
			}

			deferred.resolve(filesToProcess);
		}
	});

	return deferred.promise;
}


module.exports = Read;