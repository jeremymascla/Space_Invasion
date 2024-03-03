const form = document.querySelector("#formulaire");
const nom = document.forms.formulaire.nom;
const prenom = document.forms.formulaire.prenom;
const email = document.forms.formulaire.mail;
const age = document.forms.formulaire.age;
const genre = document.forms.formulaire.genre;
let user = [];
let voyage2 = document.forms.formulaire.date_range;
let voyage1 = document.forms.formulaire.date_debut;
let choix = document.forms.formulaire.choix;
let choixSelect = document.querySelector('.radio');

// Initialise le calendrier au chargement de la page
document.addEventListener('DOMContentLoaded', () => {

    var datePicker = document.getElementById('date_debut');
    var today = new Date().toISOString().split('T')[0];
    datePicker.min = today;

    new Litepicker({
        element: document.getElementById('date_range'),
        singleMode: false, // Permet de sélectionner une plage de dates
        lang: "fr", // Définit la langue du calendrier en français
        numberOfMonths: 2, // Affiche deux mois dans le calendrier pour la sélection de la plage de dates
        minDate: new Date() - 1
    });
})

// Permet lors du click sur les boutons radio de changer de type de calendrier
choixSelect.addEventListener("click", () => {
    let choixV = choix.value;
    if (choixV == "aller") {
        // Fait disparaitre le calendrier simple pour le complexe
        voyage1.classList.remove("inp-none");
        voyage1.classList.add("inp-inblock");
        voyage2.classList.remove("inp-inblock");
        voyage2.classList.add("inp-none");
    } else {
        // Fait disparaitre le calendrier simple pour le complexe
        voyage1.classList.remove("inp-inblock");
        voyage1.classList.add("inp-none");
        voyage2.classList.remove("inp-none");
        voyage2.classList.add("inp-inblock");
    }
});

// Vérifie si le contenue est vide
function required(elementValue) {
    if (elementValue == "") {
        return false
    } else {
        return true
    }
}

// Vérifie si la longueur est comprise entre le min et la max
function between(length, min, max) {
    if (length < min || length > max) {
        return false
    } else {
        return true
    }
}
// Vérifie si le contenue contient des lettres seulement
function nomValid(elementValue) {
    const re = /^[a-zA-Z]+$/;
    return re.test(elementValue);
}
// Vérifie que le contenue soit dans un format email
function emailOk(elementValue) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(elementValue);
}
// Permet d'afficher les erreurs en rouge
function showError(input, message) {
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const errorEl = formField.querySelector("small");
    errorEl.textContent = message;
}
// Permet d'afficher l'element valide en vert
function showSuccess(input) {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const errorEl = formField.querySelector("small");
    errorEl.textContent = "";
}

// Vérifie le contenue du nom si il est entre 3 et 25 caractères, qu'il ne contiennent que des lettres et que sont contenue ne soit pas vide
const checkNom = () => {
    let valid = false;
    const min = 3, max = 25;
    const name = nom.value.trim();
    if (!required(name)) {
        showError(nom, "Le nom d'utilisateur ne peut pas être vide");
    } else if (!between(name.length, min, max)) {
        showError(
            nom,
            `Le nom d'utilisateur doit avoir entre ${min} et ${max} caractères.`
        );
    } else if (!nomValid(name)) {
        showError(
            nom,
            `Le nom d'utilisateur ne doit contenir que des lettres.`
        );
    } else {
        showSuccess(nom);
        valid = true;
    }
    return valid;

}

// Vérifie le contenue du prénom si il est entre 3 et 25 caractères, qu'il ne contiennent que des lettres et que sont contenue ne soit pas vide
const checkPrenom = () => {
    let valid = false
    const min = 3,
        max = 25
    const firstName = prenom.value.trim()
    if (!required(firstName)) {
        showError(prenom, "Le prénom d'utilisateur ne peut pas être vide");
    } else if (!between(firstName.length, min, max)) {
        showError(
            prenom,
            `Le prénom d'utilisateur doit avoir entre ${min} et ${max} caractères.`
        )
    } else if (!nomValid(firstName)) {
        showError(
            prenom,
            `Le prénom d'utilisateur ne doit contenir que des lettres.`
        )
    } else {
        showSuccess(prenom);
        valid = true;
    }
    return valid;

}

// Vérifie si le contenue du mail est en format email et qu'il ne soit pas vide
const checkEmail = () => {
    let valid = false
    const mail = email.value.trim()
    if (!required(mail)) {
        showError(
            email,
            `L'email ne peut être vide.`
        )
    } else if (!emailOk(mail)) {
        showError(
            email,
            `L'email doit respecter le format email.`
        )
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
}

// Vérifie si la valeur age entrée est situé entre 21 et 110 et qu'il ne soit pas vide
const checkAge = () => {
    let valid = false
    const ageTrim = age.value;
    if (!required(ageTrim)) {
        showError(age, "Vous devez renseigner votre age")
    }
    else if (ageTrim < 21) {
        showError(age, "Vous n'avez pas 21 ans");
    } else if (ageTrim > 110) {
        showError(age, "Vous avez plus de 110 et selon les réglementations galactique il est interdit de voyager dans l'espace pour les plus de 110 ans");
    } else {
        showSuccess(age);
        valid = true;
    }
    return valid;
}

// Vérifie si la selection du genre a été faite
const checkGenre = () => {
    let valid = false
    const sex = genre.value
    if (!required(sex)) {
        showError(genre, "Vous devez choisir votre bord")
    } else {
        showSuccess(genre)
        valid = true
    }
    return valid
}

// Vérifie si la date est entrée et si elle est bonne
const checkVoyage = () => {
    let valid = false
    let choixV = choix.value;
    if (choixV == "aller") {
        // Vérification de la date en aller simple
        let voyage = voyage1;
        const dateVoyage = voyage.value;
        console.log(dateVoyage);
        if (!required(dateVoyage)) {
            showError(voyage, "Vous devez mettre une date")
        } else {
            showSuccess(voyage);
            valid = true;
        }
        return valid
    } else {
        // Vérification de la date en aller retour
        let voyage = voyage2;
        const dateVoyage = voyage.value;
        console.log(dateVoyage);
        voyageDepart = dateVoyage.substr(0, 10);
        voyageRetour = dateVoyage.substr(13);
        if (!required(dateVoyage)) {
            showError(voyage, "Vous devez mettre une date")
        } else if (voyageDepart > voyageRetour) {
            // Cet Erreur n'est jamais censé arrivé du à la disposition du calendrier mais rien n'est impossible
            showError(voyage, "Vous ne pouvez pas mettre la date de retour avant la date de départ")
        } else {
            showSuccess(voyage);
            valid = true;
        }
        return valid
    }
}

// Permet de changer selectier la valeur à choisir lors de la vérification final
const leVoyage = () => {
    let choixV = choix.value;
    if (choixV == "aller") {
        let voyage = voyage1.value;
        return voyage
    } else {
        let voyage = voyage2.value;
        return voyage
    }
}

// Permet de mettre les selcetions d'invalidité dans une constante pour être par la suite envoyer dans le local storage
const invalidité = () => {
    let preg = document.querySelector('#patien1');
    let obe = document.querySelector('#patien2');
    let epi = document.querySelector('#patien3');
    let nerf = document.querySelector('#patien4');
    let mobilite = document.querySelector('#patien5');
    let vieux = document.querySelector('#patien6');
    if (preg.checked) {
        user.push("enceinte");
    }
    if (obe.checked) {
        user.push("obesite");
    }
    if (epi.checked) {
        user.push("epileptique");
    }
    if (nerf.checked) {
        user.push("tdah");
    }
    if (mobilite.checked) {
        user.push("mobilité");
    }
    if (vieux.checked) {
        user.push("senior");
    }
    // console.log(user)
    return user
}

// Lors de l'appuie bouton, vérifie si tout est conforme et prépare les valeurs à être envoyer
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let nameOk = checkNom(),
        firstNameOk = checkPrenom(),
        emailOk = checkEmail(),
        isAgeOk = checkAge(),
        isSexOk = checkGenre(),
        isVoyageOk = checkVoyage(),
        nomOk = nom.value,
        prenomOk = prenom.value,
        ageOk = age.value,
        mailOk = email.value,
        genreOk = genre.value,
        voyageOk = leVoyage(),
        voyageDepart = voyageOk.substr(0, 10),
        voyageRetour = voyageOk.substr(13),
        invalid = invalidité();

    let isFormValid = nameOk && firstNameOk && emailOk && isAgeOk && isSexOk && isVoyageOk;
    if (!isFormValid) {
        alert("Vous n'avez pas entrez toutes les données nécessaire au formulaire")
    } else if (!required(voyageRetour)) {
        let client = nomOk + "," + prenomOk + "," + ageOk + "," + mailOk + "," + genreOk + "," + voyageDepart + ",pas de retour," + invalid;
        // console.log(client)
        // localStorage.setItem('client', JSON.stringify(client))
        bienvenueA(nomOk,prenomOk,genreOk,mailOk,ageOk,voyageDepart)
    } else {
        let client = nomOk + "," + prenomOk + "," + ageOk + "," + mailOk + "," + genreOk + "," + voyageDepart + "," + voyageRetour + "," + invalid;
        // console.log(client)
        // localStorage.setItem('client', JSON.stringify(client))
        bienvenueAR(nomOk,prenomOk,genreOk,mailOk,ageOk,voyageDepart,voyageRetour)
    }
}) 

function bienvenueA(nom,prenom,genre,email,age,voyage) {
    if (genre == "Homme") {
        alert(`Bienvenue parmi les voyages de SPACE INVASION.
        Monsieur ${nom} ${prenom} âgé de ${age} ans,
        nous confirmons votre voyage pour le ${voyage}, votre adresse mail est ${email}.
        
        Merci de nous faire confiance est d'utilisé nos service`)
    } else if (genre == "Femme") {
        alert(`Bienvenue parmi les voyages de SPACE INVASION.
        Madame/Mademoiselle ${nom} ${prenom} âgé de ${age} ans,
        nous confirmons votre voyage pour le ${voyage}, votre adresse mail est ${email}.
        
        Merci de nous faire confiance est d'utilisé nos service`)
    } else {
        alert(`Bienvenue parmi les voyages de SPACE INVASION.
        Vous êtes ${nom} ${prenom} âgé de ${age} ans,
        nous confirmons votre voyage pour le ${voyage}, votre adresse mail est ${email}.
        
        Merci de nous faire confiance est d'utilisé nos service`)
    }
}
function bienvenueAR(nom,prenom,genre,email,age,voyage,voyageR) {
    if (genre == "Homme") {
        alert(`Bienvenue parmi les voyages de SPACE INVASION.
        Monsieur ${nom} ${prenom} âgé de ${age} ans,
        nous confirmons votre voyage ayant pour départ le ${voyage} et votre retour pour le ${voyageR}, votre adresse mail est ${email}.
        
        Merci de nous faire confiance est d'utilisé nos service`)
    } else if (genre == "Femme") {
        alert(`Bienvenue parmi les voyages de SPACE INVASION.
        Madame/Mademoiselle ${nom} ${prenom} âgé de ${age} ans,
        nous confirmons votre voyage ayant pour départ le ${voyage} et votre retour pour le ${voyageR}, votre adresse mail est ${email}.
        
        Merci de nous faire confiance est d'utilisé nos service`)
    } else {
        alert(`Bienvenue parmi les voyages de SPACE INVASION.
        Vous êtes ${nom} ${prenom} âgé de ${age} ans,
        nous confirmons votre voyage ayant pour départ le ${voyage} et votre retour pour le ${voyageR}, votre adresse mail est ${email}.
        
        Merci de nous faire confiance est d'utilisé nos service`)
    }
}