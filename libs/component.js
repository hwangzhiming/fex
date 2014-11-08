var 
  fex_vars=require('./vars')
, fex_dir=require('./dirhelper')()
, path = require('path')
, colors = require('colors')
, fs = require('fs-extra')
, compiler=require('./compiler')
, util=require('util')
;

var SupportComponentFolderNames={
	'controller':'controllers',
	'default':'defaults',
	'directive':'directives',
	'factory':'factories',
	'filter':'filters',
	'provider':'providers',
	'service':'services'
}


module.exports=function(projectFolder,componentName,componentType,componentRelativeDir) {
	//user vars
	var user_vars=require(path.join(projectFolder,fex_vars.configFile));
	var componentTemplatePath= path.join(fex_dir.templates, user_vars.projectType?user_vars.projectType:'web');
	//fex web app conf.json
	var conf=require(path.join(componentTemplatePath,'conf.js'));

	var componentConfig=conf.components[componentType];

	if(!componentConfig){
		console.log(colors.red(" ERROR: Unsupport component."));
	}

	var componentFolderName=SupportComponentFolderNames[componentType];

	user_vars['FEXComponentName']=componentName;
	user_vars['FEXComponentType']=componentType;
	user_vars['FEXComponentFolderName']=componentFolderName;
	user_vars['FEXComponentFormatName']=util.format(componentConfig.nameFormat,componentName);

	//component directory
	var componentDir=componentRelativeDir
		? path.join(fex_dir.cwd,componentRelativeDir)
		: path.join(projectFolder,'coffee',componentFolderName);

	fs.ensureDirSync(componentDir);

	//copy component coffee script
	var componentFileTemplate=path.join(componentTemplatePath,componentConfig.template);
	var componentFile=path.join(componentDir,componentName+'.coffee');
	if(fs.existsSync(componentFile)){
      console.log(colors.error(' ERROR: Component exists!'));
      return;
    }
	fs.copySync(componentFileTemplate,componentFile);

	//compile coffee script file
	compiler("string",componentFile,user_vars);


	//copy test files
	var unitTestFolder=path.join(projectFolder,'tests/unit',componentFolderName,componentName);
	if(fs.existsSync(unitTestFolder)){
		fs.removeSync(unitTestFolder);
	}
	fs.ensureDirSync(unitTestFolder);

	if(componentConfig.test){

		var testScriptTemplate=path.join(componentTemplatePath,componentConfig.test.script);
		var testViewTemplate=path.join(componentTemplatePath,componentConfig.test.view);

		var testScriptFile=path.join(unitTestFolder,util.format('%s_test.coffee',componentName));
		var testViewFile=path.join(unitTestFolder,'index.html');

		fs.copySync(testScriptTemplate,testScriptFile);
		compiler("string",testScriptFile,user_vars);

		fs.copySync(testViewTemplate,testViewFile);
		compiler("html",testViewFile,user_vars);
	}

	console.log(colors.green(' component [ %s:%s ] added.'),componentType,componentName);

}