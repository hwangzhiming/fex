var path = require('path');
var fs = require('fs');

module.exports=function() {

	//windows
  	var module_dir=process.argv[1];
    //not Windows
    if(!process.platform.match(/^win/i)){
        //get the real path
  	   module_dir=fs.realpathSync(module_dir);
    }
  	if(fs.statSync(module_dir).isFile()){
  		module_dir=path.dirname(module_dir);
  	}

  	return {
  		templates:path.join(module_dir,'templates'),
  		cwd:process.cwd(),
  	}

}