var
fs = require('fs-extra')
, ejs=require('ejs')

;
module.exports=function(file,vars){
    var contents=fs.readFileSync(file,"utf-8");
    contents=ejs.render(contents,vars);
    fs.writeFileSync(file,contents,"utf-8");
}