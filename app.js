require('dotenv').config()

if (!process.env.TOKEN && !process.env.KEY) {
  throw new Error('No hay configuración con Api Key y con Token')
}

let Trello = require("trello");
let trello = new Trello(process.env.KEY, process.env.TOKEN);

let cardTitle = `Creando card nueva desde VS Code - ${new Date().toDateString()}`
// const cardList = "62731a7b54aad084fb953dc4"
// const lastCardId = "62731b08b02ea030e178e22e"

// trello.addCard(cardTitle, "LaunchX Card Description", "62731a7b54aad084fb953dc4",
//   (error, trelloCard) => {
//     error === true 
//     ? console.log('Could not add card:', error) 
//     : console.log('Added card:', trelloCard);
//   });

// trello.getCardsOnList(cardList,
//   (error, trelloResponse) => {
//     error === true
//       ? console.log('Could not get cards on list:', error)
//       : console.log('Cards on list:', trelloResponse);
//   });

// trello.updateCardName(lastCardId, 'Updated name from VsCode',
//   (error, trelloResponse) => {
//     error === true
//       ? console.log('Could not update the name:', error)
//       : console.log('Card response:', trelloResponse);
//   });

// trello.deleteCard(lastCardId,
//   (error, trelloResponse) => {
//     error === true
//       ? console.log('Could not delete the card:', error)
//       : console.log('Card response:', trelloResponse);
//   });