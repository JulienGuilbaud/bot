// je définis un objet avec des propriétés et des méthodes
const bot = {
    name: 'NostraBot',
    version: 1,
    welcome: function () {
      console.log(`Bonjour je suis ${bot.name} dans sa version ${bot.version}`);
    },
    listChoices: function() {
      console.log('Demandez-moi : météo - horoscope - loto');
    },
  };
  export default bot ;