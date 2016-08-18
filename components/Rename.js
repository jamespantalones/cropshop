//--------------------------------------------
//
// Renames main file to OG
//
//--------------------------------------------
'use strict';

var q = require('q');
var fs = require('fs');


//--------------------------------------------
// Rename file
//
		
var Rename = function(imagePath, basename, fileExtension){


	var deferred = q.defer();

	var newName = global.directory + '/' + basename + fileExtension;

	//--------------------------------------------
	// See if file currently exists (if we've run before
	// and file was deleted already and needs recreation, skip)
	//
			
	
	fs.rename(imagePath, newName, function(err){
		
		if (err){
			console.log('Error renaming file: ', basename + fileExtension, err);
			deferred.reject(err);
		}

		else{
			deferred.resolve(newName);
		}
	});
	

	return deferred.promise;
}

module.exports = Rename;