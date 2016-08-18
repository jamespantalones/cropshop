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



function isImage(ext){
	if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif'){
		return true;
	}
	return false;
}


var Read = function(directory, file){

	//--------------------------------------------
	// Make sure we start fresh
	//
			
	filesToProcess = [];

	//--------------------------------------------
	// If no specific image is provided, run on entire directory
	//


	var deferred = q.defer();
			
	if (file === 'undefined' || file === null || file === '' || !file){


		fs.readdir(directory, function(err, files){
		
			if (err){
				console.log(chalk.yellow.bgRed('Error: ', err));
				deferred.reject(err);
			
			}

			if (files.length){
				
				for (var i = 0; i < files.length; i++ ){
					var file = files[i];
					var fileExtension = path.extname(file);

					if (isImage(fileExtension)){
						filesToProcess.push(file);
					}
				}

				deferred.resolve(filesToProcess);
			}
		});
	}

	//--------------------------------------------
	// If specific image is provided, only crop that one
	//
			
	else{


		var fileExtension = path.extname(file);

		if (isImage(fileExtension)){

			//--------------------------------------------
			// Check if file exists and is readable
			//
			fs.readFile(file, function(err, data){
				if (err){
					console.log(chalk.yellow.bgRed('Error: ', err));
					deferred.reject(err);
				}

				else{
					filesToProcess.push(file);
					deferred.resolve(filesToProcess);
				}
			})
		}

		else{
			deferred.reject('File is not of type image');
		}

	}

	return deferred.promise;
	

	
}


module.exports = Read;