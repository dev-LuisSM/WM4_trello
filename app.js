require('dotenv').config();
if (!process.env.TOKEN && !process.env.KEY) {
  throw new Error('No hay configuración con Api Key y con Token')
}

let Trello = require("trello");
let trello = new Trello(process.env.KEY, process.env.TOKEN);

const getDate = `${new Date().toDateString()} ${new Date().getHours()}h ${new Date().getMinutes()}m`
let cardName = `Creando card nueva desde VS Code - ${getDate}`
let updateCardName = `Updated name from VsCode - ${getDate}`
const listId = '62731a7b54aad084fb953dc4'
const firstCard = '62731a8cc94afd3d3469e3ec'

const addCard = () => trello.addCard(cardName, "LaunchX Card Description", "62731a7b54aad084fb953dc4",
  (error, trelloCard) => {
    error === true
      ? console.log('Could not add card:', error)
      : (lastCard = trelloCard.id, 
        console.log(`Card agregada: \n - Id: ${lastCard} \n -Título: ${trelloCard.name}`),
        console.log('Recuerda guardar estos datos.'))
  });

const getList = () => trello.getCardsOnList(listId,
  (error, trelloCards) => {
    error === true
      ? console.log('Could not get cards on list:', error)
      : trelloCards.map(card => {
        console.log(`${card.idShort}. Id:${card.id} - ${card.name}`)
      })
  });

const updateName = () => trello.updateCardName(firstCard, updateCardName,
  (error) => {
    error === true
      ? console.log('Could not update the name:', error)
      : console.log('Título de card actualizado:', updateCardName);
  });

const deleteCard = (idCard) => trello.deleteCard(idCard,
  (error) => {
    error === true
      ? console.log('Could not delete the card:', error)
      : console.log('Card eliminada');
  });


const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(`¿Qué deseas hacer? 
1) Agregar card
2) Obtener lista de tus cards
3) Actualizar nombre de una card
4) Eliminar card
Tu opción opción: `, selection => {
  selection === '1'
    ? addCard()
    : selection === '2'
      ? getList()
      : selection === '3'
        ? updateName()
        : selection === '4'
          ? deleteCard()
          : `${console.log("Opicón no válida")}`
  readline.close();
});

