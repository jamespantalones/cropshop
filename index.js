#!/usr/bin/env node


//--------------------------------------------
//
// Phlegm Cropper
//
//--------------------------------------------
'use strict';


//--------------------------------------------
// Required packages
//		
var chalk = require('chalk');
var imagemin = require('imagemin');
var prompt = require('prompt');


var Read = require('./components/Read');
var Process = require('./components/Process');
var Compress = require('./components/Compress');

global.directory = __dirname;


var compressionAmount = 65;
var sizes = [40, 280, 360, 640, 960, 1280, 1920];


function finished(){
	console.log('👾 👾 👾 👾 👾 👾 👾 👾 👾');
	console.log(chalk.yellow.bgBlue('All files processed successfully.'));
	console.log('👾 👾 👾 👾 👾 👾 👾 👾 👾');
}

//--------------------------------------------
//
// Start
//
//--------------------------------------------

prompt.start();


prompt.get(['Compression amount; 0—100'], function(err, result){
	
	
	compressionAmount = result['Compression amount; 0—100'] || 65;
	
	//--------------------------------------------
	// Read all files in current folder
	//

	Read(directory).then(function(files){
		
		//--------------------------------------------
		// Take list of image files returned and process
		//	

		Process(files, directory).then(function(msg){

			
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
	
	}, function(initialReadErr){
		console.log(initialReadErr);
	});

});
		








