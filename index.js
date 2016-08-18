#!/usr/bin/env node


//--------------------------------------------
//
// Cropshop
//
//--------------------------------------------
'use strict';


//--------------------------------------------
// Required packages
//		
var chalk = require('chalk');
var program = require('commander');


var Read = require('./components/Read');
var Clean = require('./components/Clean');
var Process = require('./components/Process');
var Compress = require('./components/Compress');

global.directory = process.cwd();

var sizeDefaults = [40, 280, 360, 640, 960, 1280, 1920];


function finished(){
	console.log(chalk.yellow.bold.underline('All files processed successfully.\n\n'));
	process.exit(0);
}

//--------------------------------------------
//
// Start
//
//--------------------------------------------

//console.log('CURRENT DIRECTORY', directory);
	
//--------------------------------------------
// Read all files in current folder
//


function start(sizes, filepath){

	Read(directory, filepath).then(function(files){

		
		//--------------------------------------------
		// Clean out all files with _crop_ present
		//
				
		Clean(files, sizes).then(function(cleanedFiles){

			//--------------------------------------------
			// Take list of image files returned and process
			//

			Process(cleanedFiles, directory, sizes).then(function(msg){

				
				//--------------------------------------------
				// Read directory with newly created files
				//
						
				Read(directory).then(function(newFiles){

					
					//--------------------------------------------
					// Compress images
					//

					Compress(newFiles).then(function(final){

						finished();

					}, function(compressErr){

						console.log(compressErr)
					});


				}, function(readErr){
					console.log(readErr);
				});

			}, function(processErr){
				console.log('ERROR in PROCESS OPERATION');
			});

		}, function(cleaningError){
			console.log('ERROR in cleaning operation');
		});

	}, function(initialReadErr){
		console.log(initialReadErr);
	});
}



//--------------------------------------------
//
// Start Program
//
//--------------------------------------------
		
program
	.version('0.0.1')
	.usage('<sizes>')
	.option('-i, --image [filename]', 'Specify a specific file')
	.parse(process.argv);

if (!program.args.length){
	program.help();
}

else{
	var sizes = program.args;
	var filename = '';

	if (program.image){
		filename = program.image;
	}
	
	console.log(chalk.cyan.bold('\n\nPreparing to crop to size(s): '), chalk.black.bgCyan(program.args));
	
	start(sizes, filename);
}






