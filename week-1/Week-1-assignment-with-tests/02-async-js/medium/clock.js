setInterval(() => {
    let currentDate = new Date()
    let currentHour =  currentDate.getHours()
    let currentMinutes = currentDate.getMinutes()
    let currentSeconds = currentDate.getSeconds()
    let time = `${currentHour}:${currentMinutes}::${currentSeconds}`;
    console.clear()
    console.log(time)
}, 1000)

