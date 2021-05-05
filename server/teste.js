console.log('1')
const setTimeoutAsync = (cb, delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(cb());
    }, delay);
  });
const setTimeoutAsync2 = (delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
    //   resolve();
    }, delay);
  });

async function main (){
    // await setTimeoutAsync(function(){console.log('2')}, 2000)
    // await setTimeoutAsync(function(){console.log('3')}, 5000)
    // await setTimeoutAsync(function(){console.log('4')}, 2000)

    await setTimeoutAsync2(2000)
    console.log('2');
    await setTimeoutAsync2(5000)
    console.log('3');
    await setTimeoutAsync2(2000)
    console.log('4');

   
}

main()



// console.log(setTimeout((x) => console.log('2'), 9000).then(console.log('3')))
