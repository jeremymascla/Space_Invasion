const form = document.querySelector("#formulaire");
const nom = document.forms.formulaire.nom;
const prenom = document.forms.formulaire.prenom;
const email = document.forms.formulaire.mail;
const age = document.forms.formulaire.age;
const genre = document.forms.formulaire.genre;
let user = [];
let voyage1 = document.forms.formulaire.date_range;
let voyage2 = document.forms.formulaire.date_debut;
let choix = document.forms.formulaire.choix;
let choixSelect = document.querySelector('.radio');

choixSelect.addEventListener("click", () => {
    let choixV = choix.value;
    if (choixV == "aller") {
        voyage2.classList.remove("inp-none");
        voyage2.classList.add("inp-inblock");
        voyage1.classList.remove("inp-inblock");
        voyage1.classList.add("inp-none");
    } else {
        voyage2.classList.remove("inp-inblock");
        voyage2.classList.add("inp-none");
        voyage1.classList.remove("inp-none");
        voyage1.classList.add("inp-inblock");
    }
});

// fonction vérification si vide
function required(elementValue) {
    if (elementValue == "") {
        return false
    } else {
        return true
    }
}
// fonction vérification longueur
function between(length, min, max) {
    if (length < min || length > max) {
        return false
    } else {
        return true
    }
}
// fonction de vérification lettre seulement
function nomValid(elementValue) {
    const re = /^[a-zA-Z]+$/;
    return re.test(elementValue);
}
// fonction vérification format email
function emailOk(elementValue) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(elementValue);
}
// une fonction qui permette d'afficher les erreurs en rouge
function showError(input, message) {
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const errorEl = formField.querySelector("small");
    errorEl.textContent = message;
}
// une fonction qui permette d'afficher l'element valide en vert
function showSuccess(input) {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const errorEl = formField.querySelector("small");
    errorEl.textContent = "";
}

// fonction vérifie contenu non vide , longueur entre 3 et 25 seulement des lettres
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
// fonction vérifie contenu non vide , longueur entre 3 et 25 seulement des lettres
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
// Vérifie input mail non vide et conforme à la notation mail
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
// fonction vérifie si non vide et utilisateur à + de 21 ans
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
// fonction vérifie le genre et valide
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
// Vérifie si 
const checkVoyage = () => {
    let valid = false
    let choixV = choix.value;
    if (choixV == "aller") {
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
        let voyage = voyage2;
        const dateVoyage = voyage.value;
        console.log(dateVoyage);
        if (!required(dateVoyage)) {
            showError(voyage, "Vous devez mettre une date")
        } else {
            showSuccess(voyage);
            valid = true;
        }
        return valid
    }
}

// Initialise le calendrier pour la plage de dates
var datepicker = new Litepicker({
    element: document.getElementById('date_range'),
    singleMode: false, // Permet de sélectionner une plage de dates
    lang: "fr", // Définit la langue du calendrier (français)
    numberOfMonths: 2, // Affiche deux mois dans le calendrier pour la sélection de la plage de dates
    minDate: new Date()
});

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
// écouteur d'évènement pour éviter la surcharge au serveur
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
        voyageRetour = voyageOk.substr(13);

    let isFormValid = nameOk && firstNameOk && emailOk && isAgeOk && isSexOk && isVoyageOk;
    if (!isFormValid) {
        console.log("non");
    } else if (!required(voyageRetour)) {
        console.log(nomOk, prenomOk, ageOk, mailOk, genreOk, voyageDepart, "pas de retour");
    }else {
        console.log(nomOk, prenomOk, ageOk, mailOk, genreOk, voyageDepart, voyageRetour);
    }

}) 