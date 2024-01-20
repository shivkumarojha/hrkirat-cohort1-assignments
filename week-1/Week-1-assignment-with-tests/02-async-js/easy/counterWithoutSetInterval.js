let number = 1

function counter() {
    console.log(number)
    number += 1
    setTimeout(counter, 1000)    
}

counter()
