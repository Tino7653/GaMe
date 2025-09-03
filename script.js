/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */

function afficherResultat(score, nbMotsProposes) {
  //Recuperation de la zone dans laquelle on va écrire le score
  let spanScore = document.querySelector(".zoneScore span");
  //Ecriture du texte (affiche le score et le nombre de tentative)
  let affichageScore = `${score} / ${nbMotsProposes}`;
  //On place le texte  à l'interieur du span
  spanScore.innerText = affichageScore;
}


/**
 * Cette fonction affiche une proposition, que le joueur devra recopier,
 * dans la zone "zonePropposition"
 * @param {string} proposition : la proposition à afficher
 */

function afficherProposition(proposition) {
  let zoneProposition = document.querySelector(".zoneProposition");
  zoneProposition.innerText = proposition;
}

// new 

/**
 * Cette fonction construit et affiche l'eamail
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qu'il veut partager son score
 * @param {string} score : le score
 */
function afficherEmail(nom, email, score) {
  let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
  location.href = mailto
}

/**
 * Cette fonction prend un nom en parametre et valide qu'il est au bon format
 * ici : deuc caracteres au minimum
 * @param {string} nom
 * @throws [Error]
 */
function validerNom(nom) {
  if(nom.length < 2) {
    throw new Error("Le nom est trop court. ")
  }
}

/**
 * Cette fonction prend un email en parametre et valide qu'il est au bon format
 * @param {string} email
 * @throws {Error}
 */

function validerEmail(email) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
  if(!emailRegExp.test(email)) {
    throw new Error("L'email n'est pas valide.");
  }
}

/**
 * Cette fonction affiche le message d'erreur passé en parametre
 * Si le span existe deja, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs
 * @param {String} message 
 */
function afficherMessageErreur(message) {

  let spanErreurMessage = document.getElementById("erreurMessage")

  if(!spanErreurMessage) {
    let popup = document.querySelector(".popup")
    spanErreurMessage = document.createElement("span")
    spanErreurMessage.id = "erreurMessage"

    popup.append(spanErreurMessage)
  }

  spanErreurMessage.innerText = message
}


/**
 * Cette fonction permet de recuperer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons parametres.
 * @param {string} scoreEmail
 */
function gererFormulaire(scoreEmail) {
  try {
    let baliseNom = document.getElementById("nom")
    let nom = baliseNom.value
    validerNom(nom)


    let baliseEmail = document.getElementById("email")
    let email = baliseEmail.value
    validerEmail(email)
    afficherMessageErreur("")
    afficherEmail(nom, email, scoreEmail)

  } catch(erreur) {
    afficherMessageErreur(erreur.message)
  }

  
}
// new 

/**
 * Cette fonction lance le jeu
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */

function lancerJeu() {
  //Initialisation
  initAddEventListenerPopup()
  let score = 0;
  let i = 0;
  let listeProposition = listeMots;

  let btnValiderMot = document.getElementById("btnValiderMot");
  let inputEcriture = document.getElementById("inputEcriture");

  afficherProposition(listeProposition[i]);

  //Gestion de l'évenement click sur le bouton "Valider"
  btnValiderMot.addEventListener("click", () => {
    if (inputEcriture.value === listeProposition[i]) {
      score++;
    }
    i++;
    afficherResultat(score, i);
    inputEcriture.value = "";
    if (listeProposition[i] === undefined) {
      afficherProposition("Le jeu est fini");
      btnValiderMot.disabled = true;
    } else {
      afficherProposition(listeProposition[i]);
    }
  });



  //Gestion de l'evenement change sur les boutons radios
  let listeBtnRadio = document.querySelectorAll(".optionSource input");
  for (let index = 0; index < listeBtnRadio.length; index++) {
    listeBtnRadio[index].addEventListener("change", (event) => {
      //Si c'est le premier élément qui a été modifié, alors nous voulons
      //jouer avec la listeMots
      if (event.target.value === "1") {
        listeProposition = listeMots;
      } else {
        //Sinon nous voulons jouer avec la liste des phrases
        listeProposition = listePhrases;
      }
      //Et on modifie l'affichage en direct
      // afficherResultat(listeProposition[i]);
       afficherProposition(listeProposition[i]);
    });
  }


  // New 
  // Gestion  de l'evenement submit sur le formulaire de partage
  let form = document.querySelector("form")
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    let scoreEmail = `${score} / ${i}`
    gererFormulaire(scoreEmail)
  })
  // New 

  afficherResultat(score, i);
  // document.addEventListener("DOMContentLoaded", () => {
  //   lancerJeu()
  // })
}
