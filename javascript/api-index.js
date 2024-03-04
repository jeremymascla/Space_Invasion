fetch('https://api.nasa.gov/planetary/apod?api_key=9TKS8bPdsduVEcggibYtqhL4GApBdIZNRDpyiazt', {
    method: "GET"
})
    .then(response => response.json())
    .then(response => {
        let jour = response.url;
        const acceuil = document.querySelector('#img-jour');
        acceuil.src = jour
    })