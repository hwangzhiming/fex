var
fs = require('fs-extra')
, stringFormat=require('string-template')
, ejs=require('ejs')

;
module.exports=function(type,file,vars){
    var contents=fs.readFileSync(file,"utf-8");
    if(type==='string'){
      contents=stringFormat(contents,vars);
      fs.writeFileSync(file,contents,"utf-8");
    }
    else if(type==='html'){
      contents=ejs.render(contents,vars);
      fs.writeFileSync(file,contents,"utf-8");
    }
}