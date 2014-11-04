var
 fs=require('fs')
, _=require('underscore')
;
_.mixin(require('underscore.string').exports());

var util={
	
	getVendorConfiguration:function(bowerComponentFolder,file,publicFolder){

	    var module =file;

	    var getFullPathArr=function(prefix,arr){
	      var rs;
	      if(arr && _.isArray(arr) && arr.length>0){
	          rs=[];
	          for(var i in arr){
	            rs.push(prefix+ _.trim(arr[i],'/'));
	          }
	      } 
	      return rs;
	    }

	    var configs={
	        scripts:[],
	        stylesheets:[],
	        others:{}
	    };
	  
	    if(fs.existsSync(module)){

	      // remove cached module
	      delete require.cache[require.resolve(module)];
	      //reload module
	      var vendorConfigs = require(module);

	      for(var pkName in vendorConfigs){
	          var conf=vendorConfigs[pkName];
	          var pkFolder=bowerComponentFolder+'/'+pkName+'/';
	          if(conf.scripts){
	              var arr = getFullPathArr(pkFolder,conf.scripts);
	              if(arr){
	                configs.scripts=_.uniq(_.union(configs.scripts,arr));
	              }
	          }
	          if(conf.stylesheets){
	              var arr = getFullPathArr(pkFolder,conf.stylesheets);
	              if(arr){
	                configs.stylesheets=_.uniq(_.union(configs.stylesheets,arr));
	              }
	          }
	          if(conf.others){
	              for(var src in conf.others){
	                  var 
	                    dest=publicFolder+'/'+_.trim(conf.others[src],'/')
	                  , fullSrc=[pkFolder+_.trim(src,'/')]
	                  , configDest=configs.others[dest];

	                  if(!configDest){
	                    configs.others[dest]=fullSrc;
	                  }
	                  else{
	                    configs.others[dest]=_.uniq(_.union(configs.others[dest],fullSrc));
	                  }
	              }
	          }
	      }
	    }

	    return configs;
	}
}

module.exports=util;