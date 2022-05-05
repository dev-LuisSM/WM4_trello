# Repositorio para la práctica de "Trello" 💻
## LaunchX : Mision-Backend 🚀 

### [Trello](https://trello.com/)
Trello es una herramienta para la gestión del trabajo, con la que se pueden diseñar planes, organizar flujos, colaborar en proyectos, etc.

### Dependencias
Se utilizó trello 
``` npm  install trello ```

### Código
El archivo app.js se tiene 4 funciones de Trello, pero empezando por la configuración:

**Configuración**
Se utiliza dotenv para obtener la apikey y token de la api de Trello y manera se importan estos datos al paquete de Trello.
```
require('dotenv').config();
if (!process.env.TOKEN && !process.env.KEY) {
  throw new Error('No hay configuración con Api Key y con Token')
}

let Trello = require("trello");
let trello = new Trello(process.env.KEY, process.env.TOKEN);
```
**Creando Card**
Esta función se encarga de crear una card en Trello con un nombre definido en app.js y regresa los datos con los que se pueden manipular a futuro, id y nombre.
```
const addCard = () => trello.addCard(cardName, "LaunchX Card Description", "62731a7b54aad084fb953dc4",
  (error, trelloCard) => {
    error === true
      ? console.log('Could not add card:', error)
      : (lastCard = trelloCard.id, 
        console.log(`Card agregada: \n - Id: ${lastCard} \n -Título: ${trelloCard.name}`),
        console.log('Recuerda guardar estos datos.'))
  });
```

**Obteniendo lista**
Aquí se obtiene una lista (lista de tareas) del tablero que están dentro de mi cuenta, también muestra 3 datos: idShort, id y name.
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
Esta función se encarga de actualizar la primera card de mi primera lista ya que tiene definido el id así como el nombre que se le asignará.
```
const updateName = () => trello.updateCardName(firstCard, updateCardName,
  (error) => {
    error === true
      ? console.log('Could not update the name:', error)
      : console.log('Título de card actualizado:', updateCardName);
  });
```

**Eliminando card**
Esta función servirá únicamente cuando se le asigne un id específico, mientras tanto, no lo hará.
```
const deleteCard = (idCard) => trello.deleteCard(idCard,
  (error) => {
    error === true
      ? console.log('Could not delete the card:', error)
      : console.log('Card eliminada');
  });
```

**Leer opciones**
Este código se encargará se leer mediante consola la función que se quiera ejecutar. 
```
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
```

*Nota: Este repositorio es de práctica, la documentación completa de Trello se encuentra [aquí](https://github.com/norberteder/trello).*