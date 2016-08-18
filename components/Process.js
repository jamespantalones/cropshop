//--------------------------------------------
//
// Handling resize processing
//
//--------------------------------------------

'use strict';


//--------------------------------------------
// Dependencies
//	
var async = require('async');
var chalk = require('chalk');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var path = require('path');
var q = require('q');
var Rename = require('./Rename');


//--------------------------------------------
// Process function
//
		
var Process = function(files, directory, sizes){

	//--------------------------------------------
	// Set up promise
	//
			
	var deferred = q.defer();

	
	//--------------------------------------------
	// Loop through each file in files array
	//		
	async.each(files, function(file, callback){

		//Get full file path. Current directory + filename
		var imagePath = directory + '/' + file;

		//Get file extension
		var fileExtension = path.extname(file);

		//Get name of file WITHOUT file extension
		var basename = path.basename(imagePath, fileExtension);


		//--------------------------------------------
		// Loop through sizes
		//	
		async.each(sizes, function(size, cb){

			fs.readFile(imagePath, function(err, data){
				if (err){
					cb();
				}

				else{
					gm(imagePath)
						.resize(size)
						.write(global.directory + '/' + basename + '_crop_' + size + fileExtension,
							function(err){
								if (!err){

									console.log(chalk.green('Created: '), chalk.yellow(basename + '_crop_' + size + fileExtension));
									cb();
								}

								else{
									console.log('WRITE ERROR', err);
									cb('err');
								}
						}
					);
				}
			})
			

			

		}, function(error){
			if (error){
				console.log('a size error', error);
			}

			//--------------------------------------------
			// Run callback on first async
			//	
			else{
				callback();
			}
		})

			


	//--------------------------------------------
	// Error handling + final for first async op
	//	
	}, function(err){

		if (err){
			deferred.reject('A file failed to process.', err);
		}

		else{
			deferred.resolve('All files processed successfully.');
		}
	});

	return deferred.promise;
}


module.exports = Process;
