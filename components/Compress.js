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
var gifsicle = require('gifsicle');

var q = require('q');

var Compress = function(files){

	var deferred = q.defer();

	imagemin(files, global.directory, {
		
		use: [imageminOptipng(), gifsicle(), imageminJpegtran({
			progressive: true
		})]

	}).then(function(compressedFiles){
		console.log(chalk.magenta.bgBlue('Images optimized'));
		deferred.resolve(compressedFiles);
	
	}, function(err){
		deferred.reject(err);
	
	});


	return deferred.promise;


}


module.exports = Compress;