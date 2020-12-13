const webuntis_client = require('./webuntis_client')

async function d(){
    let timet = webuntis_client.getTimetablesForRange(new Date('10/19/2020'), new Date('10/23/2020'));
    console.log(timet)
}

d();

/*async function f() {

    let res = await new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
    console.log("test")
  
    return res;
  }
  

async function d(){
    let result = await f();
    console.log(`result: ${result}`)
}
d();*/ 