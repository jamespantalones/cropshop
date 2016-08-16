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

var sizes = [40, 240, 360, 640, 960, 1280, 1920];


//--------------------------------------------
// Process function
//
		
var Process = function(files, directory){


	var deferred = q.defer();

	
	async.each(files, function(file, callback){

		var imagePath = directory + '/' + file;
		var fileExtension = path.extname(file);
		var basename = path.basename(file, fileExtension);

		if (basename.indexOf('_og') > -1){
			console.log(chalk.red('File already exists'));
			callback();
		}

		else{

			//--------------------------------------------
			// Rename file
			//

			Rename(
				imagePath,
				basename,
				fileExtension
				)
				.then(function(newImagePath){

					basename = path.basename(newImagePath, fileExtension);

					


					//--------------------------------------------
					// Loop through sizes
					//	
					async.each(sizes, function(size, cb){
						
						console.log(chalk.cyan(global.directory + '/' + basename + '_' + size + fileExtension));
						//--------------------------------------------
						// See if file has already been processed
						//
						console.log(chalk.magenta(basename, size, basename.indexOf(size) > -1))
						if (basename.indexOf(size) > -1){
							console.log(chalk.red('size already exists, skipping'));
							cb();
						}

						else{

							gm(newImagePath)
								.resize(size)
								.write(global.directory + '/' + basename + '_' + size + fileExtension,
									function(err){
										if (!err){
											cb();
										}

										else{
											console.log(err);
											cb('err');
										}
								}
							);
						}

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
				// Error handling for second async op
				//		
				}, function(err){
					callback(err);
			});

		}

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
