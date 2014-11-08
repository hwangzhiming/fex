#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander')
, colors = require('colors')
, path = require('path')
, fs = require('fs-extra')
, prompt = require('prompt')
, fex_dir=require('./libs/dirhelper')()
, setup=require('./libs/setup')
, component=require('./libs/component')
, fex_vars=require('./libs/vars')
, packageConfig=require('./package.json')
;

prompt.message = null;
prompt.delimiter = " ";
prompt.colors = false;

program
  .version(packageConfig.version)
  .usage('[action] [options]')

/* init
--------------------------------*/
program
  .command('init')
  .description('initialize new project')
  .option("-d, --directory <directory>", "where to create")
  .action(function(options){

      var init_to_dir=options.directory || fex_dir.cwd;

      console.log(colors.yellow(" New project directory: %s"),init_to_dir);

      fs.ensureDirSync(init_to_dir);

      var init_type="web";

      //var conf=require('./templates/'+init_type+'/conf.json');
      var conf=require(path.join(fex_dir.templates, init_type,'conf.js'));

      prompt.get(conf.init.vars, function(err, results) {
          try{
            setup(conf, results, fex_dir, init_to_dir,init_type);  
          }
          catch(err){
            console.log(" Exit...");
          }
          
      });
});

/* add new component to project
--------------------------------*/

var SupportComponents=['controller','default','directive','factory','filter','provider','service'];

var setupCommand=function(componentName){
    program
    .command(componentName+' [name]')
    .description('add new '+componentName)
    .option("-d, --directory <directory>", "where to create, relative to current working directory")
    .action(function(name,options){
      console.log(componentName+" "+name+' '+options);
      var c_name=name;
      if(!c_name){
          console.log(colors.red("please enter a component name."));
          return;
      }

      var c_type=componentName.toLowerCase();
      
      //relative dir
      var c_directory=options.directory;
      if(c_directory){
        c_directory=c_directory.toLowerCase();
      }
      else{
        c_directory="";
      }

      var projectFolder=getProjectFolder(fex_dir.cwd);

      if(!projectFolder){
        console.log(colors.red(' Error: This is not a project created by fex.'));
        return;
      }

      component(projectFolder,c_name,c_type,c_directory);
  });
}

for(var i in SupportComponents){
  setupCommand(SupportComponents[i]);
}

var getProjectFolder=function(cwd){
    var fexconf=fex_vars.configFile;
    var parentCount=10;
    var count=0;
    var search=function(dir) {
        if(count<parentCount){
          if(fs.existsSync(path.join(dir,fexconf))){
             return dir;
          }
          count++;
          dir = path.join(dir,'..');
          return search(dir);

        }else{
          return null;
        }
    }
    var dir=search(cwd);
    return dir;
}

program.parse(process.argv);