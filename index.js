//--------------------------------------------
//
// Phlegm Cropper
//
//--------------------------------------------
var async = require('async');
var chalk = require('chalk');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var path = require('path');
var prompt = require('prompt');

var directory = __dirname;
var filesToProcess = [];



//--------------------------------------------
//
// Process
//
//--------------------------------------------
function process(width){
	
	

	async.each(filesToProcess, function(file, callback){

		var imagePath = directory + '/' + file;
		var fileExtension = path.extname(file);
		var basename = path.basename(file, fileExtension);

		//--------------------------------------------
		// Get last three chars
		//
		var last3 = basename.slice(-3);


		if (last3 === '_' + width){
			callback();
		}

		else{
			console.log('Processing ', chalk.cyan(imagePath));
			gm(imagePath)
				.resize(width)
				.write(directory + '/' + basename + '_' + width + fileExtension, function(err){
					
					if (!err){
						callback();
					}

					else{
						console.log(err);
						callback('err');
					}
			});
		}

	}, function(err){

		if (err){
			console.log(chalk.yellow.bgRed('A file failed to process.'));
		}

		else{
			console.log('👾 👾 👾 👾 👾 👾 👾 👾 👾');
			console.log(chalk.yellow.bgBlue('All files processed successfully.'));
			console.log('👾 👾 👾 👾 👾 👾 👾 👾 👾');
		}
	})
}



//--------------------------------------------
//
// Read directory and gather images
//
//--------------------------------------------

function read(ext){

	fs.readdir(directory, function(err, files){
	
		if (err){
			console.log(chalk.yellow.bgRed('Error: ', err));
		
		}

		if (files.length){
			
			for (var i = 0; i < files.length; i++ ){
				var file = files[i];
				var fileExtension = path.extname(file);

				if (fileExtension === '.jpg' || fileExtension === '.png' || fileExtension === '.gif'){
					filesToProcess.push(file);
				}
			}

			process(ext);
		}
	});
}


//--------------------------------------------
//
// Start
//
//--------------------------------------------

prompt.start();

prompt.get(['Image width in px'], function(err, result){
	var width = result['Image width in px'] || 40;
	read(width);
});
		








