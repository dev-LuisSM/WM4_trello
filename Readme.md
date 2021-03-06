# Repositorio para la pr谩ctica de "Trello" 馃捇
## LaunchX : Mision-Backend 馃殌 

### [Trello](https://trello.com/)
Trello es una herramienta para la gesti贸n del trabajo, con la que se pueden dise帽ar planes, organizar flujos, colaborar en proyectos, etc.

### Dependencias
Se utiliz贸 trello 
``` npm  install trello ```

### C贸digo
El archivo app.js se tiene 4 funciones de Trello, pero empezando por la configuraci贸n:

**Configuraci贸n**
Se utiliza dotenv para obtener la apikey y token de la api de Trello y manera se importan estos datos al paquete de Trello.
```
require('dotenv').config();
if (!process.env.TOKEN && !process.env.KEY) {
  throw new Error('No hay configuraci贸n con Api Key y con Token')
}

let Trello = require("trello");
let trello = new Trello(process.env.KEY, process.env.TOKEN);
```
**Creando Card**
Esta funci贸n se encarga de crear una card en Trello con un nombre definido en app.js y regresa los datos con los que se pueden manipular a futuro, id y nombre.
```
const addCard = () => trello.addCard(cardName, "LaunchX Card Description", "62731a7b54aad084fb953dc4",
  (error, trelloCard) => {
    error === true
      ? console.log('Could not add card:', error)
      : (lastCard = trelloCard.id, 
        console.log(`Card agregada: \n - Id: ${lastCard} \n -T铆tulo: ${trelloCard.name}`),
        console.log('Recuerda guardar estos datos.'))
  });
```

**Obteniendo lista**
Aqu铆 se obtiene una lista (lista de tareas) del tablero que est谩n dentro de mi cuenta, tambi茅n muestra 3 datos: idShort, id y name.
Salida: ```3. Id:62731a97cbdd3d45dc69362e - Creando card desde Postman 3```
```
const getList = () => trello.getCardsOnList(listId,
  (error, trelloCards) => {
    error === true
      ? console.log('Could not get cards on list:', error)
      : trelloCards.map(card => {
        console.log(`${card.idShort}. Id:${card.id} - ${card.name}`)
      })
  });
```

**Actualizando nombre de card**
Esta funci贸n se encarga de actualizar la primera card de mi primera lista ya que tiene definido el id as铆 como el nombre que se le asignar谩.
```
const updateName = () => trello.updateCardName(firstCard, updateCardName,
  (error) => {
    error === true
      ? console.log('Could not update the name:', error)
      : console.log('T铆tulo de card actualizado:', updateCardName);
  });
```

**Eliminando card**
Esta funci贸n servir谩 煤nicamente cuando se le asigne un id espec铆fico, mientras tanto, no lo har谩.
```
const deleteCard = (idCard) => trello.deleteCard(idCard,
  (error) => {
    error === true
      ? console.log('Could not delete the card:', error)
      : console.log('Card eliminada');
  });
```

**Leer opciones**
Este c贸digo se encargar谩 se leer mediante consola la funci贸n que se quiera ejecutar. 
```
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(`驴Qu茅 deseas hacer? 
1) Agregar card
2) Obtener lista de tus cards
3) Actualizar nombre de una card
4) Eliminar card
Tu opci贸n opci贸n: `, selection => {
  selection === '1'
    ? addCard()
    : selection === '2'
      ? getList()
      : selection === '3'
        ? updateName()
        : selection === '4'
          ? deleteCard()
          : `${console.log("Opic贸n no v谩lida")}`
  readline.close();
});
```

*Nota: Este repositorio es de pr谩ctica, la documentaci贸n completa de Trello se encuentra [aqu铆](https://github.com/norberteder/trello).*