/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep (seconds) {
    let i = 0
    while(i <= seconds ) {
        // doing nothing
        i += 1
    }
    
    return Promise.resolve("Code will be resolved after that much seconds")
}

sleep(5000000000).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})