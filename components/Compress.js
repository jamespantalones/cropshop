//--------------------------------------------
//
// Image Compression
//
//--------------------------------------------
'use strict';

var chalk = require('chalk');
var imagemin = require('imagemin');
var imageminOptipng = require('imagemin-optipng');
var imageminJpegtran = require('imagemin-jpegtran');
var imageminGifsicle = require('imagemin-gifsicle');
var ora = require('ora');
var q = require('q');


//--------------------------------------------
// Compression function
//	
var Compress = function(files){

	console.log('\n\n');
	var spinner = ora('Compressing your files.').start();


	var deferred = q.defer();

	

	var fileArray = [];

	for (var i = 0; i < files.length; i++ ){
		fileArray.push(global.directory + '/' + files[i]);
	}

	imagemin(fileArray, global.directory, {
		
		plugins: [
			imageminOptipng(),
			imageminGifsicle(),
			imageminJpegtran({progressive: true})
			]

	}).then(function(compressedFiles){
		console.log(chalk.underline.bold.magenta('\n\n\n\nImages compressed.'));
		
		spinner.stop();


		deferred.resolve(compressedFiles);
	
	}, function(err){
		deferred.reject(err);
	
	});


	return deferred.promise;


}


module.exports = Compress;