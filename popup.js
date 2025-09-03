/**
 * Cette fonction affiche la popup pour partager son score
 */
function afficherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
        //La popup est masquée par defaut (display:none), ajouter la classe "active"
        //va changer son display et la rendre visible
        popupBackground.classList.add("active")
}


/**
 * Cette fonction cache la popup pour partager son score
 */
function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    //La popup masquée par defaut (display:none), supprimer la classe "active"
    //va retablir cet affichage par defaut
    popupBackground.classList.remove("active")
}


/**
 * Cette fonction initialise les ecouteurs d'evenements qui concernent
 * l'affichage de la popup
 */
function initAddEventListenerPopup() {
    //on ecoute le click sur le bouton "partager"
    btnPartage = document.querySelector(".zonePartage button")
    let popupBackground = document.querySelector(".popupBackground")
    btnPartage.addEventListener("click", () => {
        //Quand on a cliqué sur le bouton partagé, on affiche la popup
        afficherPopup()
    })


    //On ecoute le click sur la div "popupBackground"
    popupBackground.addEventListener("click", (event) => {
        //Si on a cliqué precisement sur la popupBackground
        //(et pas un autre element qui se trouve devant)
        if(event.target === popupBackground) {
            //Alors on cache la popup 
            cacherPopup()
        }
    })
}