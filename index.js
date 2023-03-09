// je récupère un module fourni par node
const readline = require('node:readline');
// qui me permet de crée une interface qui verra les saisies dans le terminal et saura écrire dedans
const rl = readline.createInterface({
  input: process.stdin,
});

// je définis un objet avec des propriétés et des méthodes
const bot = {
  name: 'NostradaBot',
  version: 1,
  welcome: function () {
    console.log(`Bonjour je suis ${bot.name} dans sa version ${bot.version}`);
  },
  listChoices: function() {
    console.log('Demandez-moi : météo - horoscope - loto');
  },
};

// j'execute les méthodes
bot.welcome();
bot.listChoices();

// fonction qui retourne une nombre entre min et max
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

// Objectif : afficher un message aléatoire parmi des choix possibles quand on dit météo
// Tirer un nombre aléatoire (on a déjà fait ça n'hésite pas à t'en inspirer)
const index = getRandomIntInclusive(0, 5);
// Se servir du nombre obtenu pour identifier une valeur dans notre liste
const meteoChoices = [
  'ensoleillé',
  'pluvieux',
  'nuageux',
  'orageux',
  'venteux',
  'caniculaire'
];
const meteo = meteoChoices[index];
// Afficher le message quand on dit météo

const horoscopes = [
  {
    sign: 'bélier',
    message: 'Tout va bien',
  },
  {
    sign: 'taureau',
    message: 'Demain est un nouveau jour',
  },
  {
    sign: 'gémeaux',
    message: 'Hier, c\'est du passé',
  },
  {
    sign: 'cancer',
    message: 'Aujourd\'hui le présent vous attend',
  },
  {
    sign: 'lion',
    message: 'Le tigre est en toi',
  },
  {
    sign: 'vierge',
    message: 'Vous allez de l\'avant',
  },
  {
    sign: 'balance',
    message: 'Ça plane pour vous',
  },
  {
    sign: 'scorpion',
    message: 'Vous apprenez beaucoup de choses',
  },
  {
    sign: 'verseau',
    message: 'Faites vous confiance',
  },
  {
    sign: 'capricorne',
    message: 'Vous progressez à vu d\'oeil',
  },
  {
    sign: 'poisson',
    message: 'Vous êtes dans votre élément',
  },
  {
    sign: 'sagitaire',
    message: 'Le temps est beau fixe',
  }
];

// on écoute l'événement line qui correspond au fait que l'utilisateur écrit dans le terminal
rl.on('line', (line) => {
  // pour réagir en fonction de la saisie
  if (line === 'météo') {
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
    const found = horoscopes.find(function(element) {
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
