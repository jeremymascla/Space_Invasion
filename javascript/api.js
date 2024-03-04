fetch('https://images-api.nasa.gov/search?q=new%20horizon&media_type=image', {
    method: "GET"
})
    .then(response => response.json())
    .then(response => {
        let arch = response.collection.items[38].links[0].href
        const web = document.querySelector('#api_img');
        web.src = arch;
        let arch2 = response.collection.items[61].links[0].href
        const web2 = document.querySelector('#api_img2');
        web2.src = arch2;
    })
    .catch(error => console.error('Erreur lors de la récupération de l\'API  erreur : ', error))