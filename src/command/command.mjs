const { exec } =require( 'child_process');
const sys =require( 'sys');

module.exports =  () => {
    exec('pwd', (error, stdout, stderr) => {
        sys.print(stdout);
    });
};
