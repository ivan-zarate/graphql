const ParsedArgs= require("minimist");

const arguments= process.argv.slice(2);
const args=ParsedArgs(arguments, {
    alias:{
        p:"port",
        m:"mode",
        b:"persistance"
    },
    default:{
        p:8080,
        m:"FORK",
        b:"mongo"
    }
});
const {port, mode, persistance}= args;
const newArgs= {port, mode, persistance};
module.exports=newArgs