//--------------------------------------------
//
// Renames main file to OG
//
//--------------------------------------------
'use strict';

var q = require('q');
var fs = require('fs');



var Rename = function(imagePath, basename, fileExtension){


	var deferred = q.defer();
	var newName = global.directory + '/' + basename + '_og' + fileExtension;
	
	fs.rename(imagePath, newName, function(err){
		
		if (err){
			console.log('Error renaming file: ', basename + fileExtension);
			deferred.reject(err);
		}

		else{
			deferred.resolve(newName);
		}
	});
	

	return deferred.promise;
}

module.exports = Rename;