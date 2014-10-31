#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander')
, colors = require('colors')
, path = require('path')
, fs = require('fs-extra')
, prompt = require('prompt')
, fex_dir=require('./dirhelper')()
, setup=require('./setup')
, component=require('./component')
, fex_vars=require('./vars')
;

prompt.message = null;
prompt.delimiter = "";
prompt.colors = false;

program
  .version('0.0.1')
  .usage('[action] [options]')

/* init
--------------------------------*/
program
  .command('init')
  .description('initialize new project')
  .option("-d, --directory <directory>", "where to create")
  .action(function(options){

      var init_to_dir=options.directory || fex_dir.cwd;

      console.log(colors.yellow("New project directory: %s"),init_to_dir);

      fs.ensureDirSync(init_to_dir);

      var init_type="web";

      //var conf=require('./templates/'+init_type+'/conf.json');
      var conf=require(path.join(fex_dir.templates, init_type,'conf.json'));

      prompt.get(conf.init.vars, function(err, results) {
          setup(conf, results, fex_dir, init_to_dir,init_type);
      });
});

/* add new component to project
--------------------------------*/
program
  .command('add [name]')
  .description('add new component to project')
  .option("-d, --directory <directory>", "where to create, relative to current working directory")
  .option("-c, --controller", " set component type to controller")
  .option("-s, --service", " set component type to service")
  .action(function(name,options){
    var c_name=name;
    if(!c_name){
        console.log(colors.red("please enter a component name."));
        return;
    }

    var c_type='default';
    if(!(options.service && options.controller)){
        if(options.controller){
            c_type="controller";
        }
        if(options.service){
            c_type="service";
        }
    }
    
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

var getProjectFolder=function(cwd){
    var fexconf=fex_vars.configFile;
    var parentCount=5;
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