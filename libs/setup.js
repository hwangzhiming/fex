var path = require('path')
, colors = require('colors')
, path = require('path')
, fs = require('fs-extra')
, fex_vars=require('./vars')
, compiler=require('./compiler')
;
// set theme
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

module.exports=function(conf,user_vars,fex_dir,init_to_dir,init_type) {

    var init_confs=conf.init;

    //1. create project folder
    console.log(colors.info(' Create  project folder.'));

    var projectFolder=path.join(init_to_dir,user_vars.appName);

    if(fs.existsSync(projectFolder)){
      console.log(colors.error(' ERROR: Project exists!'));
      return;
    }

    fs.ensureDirSync(projectFolder);

    //2. copy template files to project folder
    console.log(colors.info(' Copy files to project folder.'));
    var source_folder=path.join(fex_dir.templates,init_type,init_confs.source);
    fs.copySync(source_folder,projectFolder);
    //2.1 rename gitignore
    fs.renameSync(path.join(projectFolder,'gitignore'),path.join(projectFolder,'.gitignore'));

    //3. make directory
    console.log(colors.info(' Create some folders for project.'));
    if(init_confs.mkdir && init_confs.mkdir.length>0){
       for(var i in init_confs.mkdir){
          fs.ensureDirSync(path.join(projectFolder,init_confs.mkdir[i]));
       }
    }

    //4. compile files with user vars
    console.log(colors.info(' Setting project files.'));
    var compiles=init_confs.compile;
    if(compiles){
      for(var f in compiles){
          var filePath=path.join(projectFolder,compiles[f]);
          if(fs.existsSync(filePath)){
            compiler(filePath,user_vars);
          }
      }
    }


    //save user vars.
    user_vars['projectType']=init_type;
    //user_vars['projectFolder']=projectFolder;
    fs.writeJsonSync(path.join(projectFolder,fex_vars.configFile),user_vars,'utf-8');

    //6. finish
    console.log(colors.info(' Congratulations! please run " npm start " to start.'));
}