//--------------------------------------------
//
// Cleans out all files in working folder with _crop_ present
//
//--------------------------------------------
'use strict';

var async = require('async');
var chalk = require('chalk');
var del = require('del');
var fs = require('fs');
var q = require('q');


var Clean = function(files, sizes){

	var deferred = q.defer();

	var filesToProcess = [];

	console.log(chalk.underline.red('\n\nCleaning up your files.\n\n'));

	//--------------------------------------------
	// Loop through each file in directory
	//
			
	async.each(files, function(file, callback){


		//--------------------------------------------
		// Loop through each size in array
		//		
		async.each(sizes, function(size, cb){
			
			//--------------------------------------------
			// If file has already been cropped, delete it
			//
					
			if (file.indexOf('_crop_') > -1){


				//--------------------------------------------
				// Read file + make sure it exists
				//

				fs.readFile(file, function(err, parsedFile){
					if (err){
						console.log(chalk.yellow(err));
						cb();
					}

					else{
						del([file]).then(function(paths){
							cb();
						});
					}
				});
			}

			else{
				cb();
			}


		}, function(err){
			if (err){
				callback(err);
			}

			else{
				filesToProcess.push(file);
				callback();
			}
		});

	}, function(err){

		if (err){
			deferred.reject(err);
		}

		else{
			deferred.resolve(filesToProcess);
		}
	});


	

	return deferred.promise;
}


module.exports = Clean;