console.log('client side javscript file loaded!!');

// http://localhost:3000/weather?address=${loc}`
function weatherDataFinder(loc) {
    fetch(`/weather?address=${loc}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.temperature;
            }
        })
    })
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Loading...';
messageTwo.textContent =  '';
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);
    const location = search.value
    console.log(location);
    if (location && location != '') {
        weatherDataFinder(location);
    }
})