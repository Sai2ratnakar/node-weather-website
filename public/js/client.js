

// fetch('http://puzzle.mead.io/puzzle').then((response)=> {
//     response.json().then((data)=> {
//         console.log(data);
//     })
// })



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageSuccess = document.querySelector('#success');
const messageError = document.querySelector('#error');

// messageSuccess.textContent= 'From JavaScript';

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const location = search.value;
    
    messageSuccess.textContent = 'Loading...';
    messageError.textContent = '';

    fetch('/weather?address=' + location).then((res)=> {
        res.json().then((data)=> {
            if(data.error) {
                
                messageError.textContent = data.error;
            }
            else {
                // messageSuccess.textContent = '';
                messageSuccess.textContent = data.forecast;
                messageError.textContent = data.location;
            }
        })
    })
})
