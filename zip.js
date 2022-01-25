const {zip} = require("zip-a-folder");
const path = require("path")

console.log(path.join(__dirname,"public"));

const zipFolder = async()=>{

   await zip(path.join(__dirname,"public"),path.join(__dirname,"testing.zip"));

}

zipFolder();