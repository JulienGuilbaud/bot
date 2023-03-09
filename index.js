import meteoChoices from "./data/meteo.js";
import horoscopes from "./data/horoscope.js";
import bot from "./data/bot.js";
// je récupère un module fourni par node
import readline from "readline";
// je récupére le module validator avec la   syntax esm
import validator from "validator";


// qui me permet de crée une interface qui verra les saisies dans le terminal et saura écrire dedans
const rl = readline.createInterface({
  input: process.stdin,
});

// Objectif : afficher un message aléatoire parmi des choix possibles quand on dit météo
// Tirer un nombre aléatoire (on a déjà fait ça n'hésite pas à t'en inspirer)
const index = getRandomIntInclusive(0, 5);
// Se servir du nombre obtenu pour identifier une valeur dans notre liste
const meteo = meteoChoices[index];
// Afficher le message quand on dit météo

// j'execute les méthodes
bot.welcome();
bot.listChoices();


// on écoute l'événement line qui correspond au fait que l'utilisateur écrit dans le terminal
rl.on('line', (line) => {
  // pour réagir en fonction de la saisie
  if (validator.contains(line, 'météo', { ignoreCase: true })) {
    console.log(`A mon avis demain le temps sera ${meteo}`);
  }
  else if (line === 'loto') {
    // on prépare une liste pour mémoriser le tirage
    let numbers = [];
    // on répète le tirage de 6 nombres
    for (let index = 0; index < 6; index++) {
      // on pioche un nombre aléatoire
      let randomNumber = getRandomIntInclusive(1, 49);
      // tant qu'il est déjà dans la liste
      while (numbers.includes(randomNumber)) {
        // on le repioche
        randomNumber = getRandomIntInclusive(1, 49);
      }
      // une fois qu'on a bien un nombre pas dans la liste on le mémorise
      numbers.push(randomNumber);
    }
    // on ajoute le complémentaire
    numbers.push(getRandomIntInclusive(1, 10));
    // on affiche le tirage
    console.log(numbers);
  }
  else if (line === 'horoscope') {
    console.log('Ok mais quel est ton signe astro ?');
  }
  else if (line === 'ciao') {
    process.exit();
  }
  else {
    const found = horoscopes.find(function (element) {
      return element.sign === line;
    });
    if (found) {
      console.log(found.message);
    }
    else {
      console.log('Je ne comprends pas');
      bot.listChoices();
    }
  }
});

// fonction qui retourne une nombre entre min et max
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}