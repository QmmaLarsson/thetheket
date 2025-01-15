# Projekt i kursen DT193G, Fullstacks-utveckling med ramverk
**Namn:** Emma Larsson\
**Student-ID:** emla2309

### Beskrivning av webbplats
Detta är en webbapplikation för att hantera lagret på en tebutik. Webbapplikationen visar en lista med produkter som finns i lager, och användare kan själva lägga till och ta bort produkter från listan. Det går även att uppdatera lagersaldot på befintliga produkter. En produkt innehåller information om produktens namn, typ, beskrivning, pris och lagersaldo.

För att använda webbapplikationen krävs autentisering. Endast inloggade användare kan lägga till, uppdatera, radera eller hämta produkter. Systemet använder cookies och JWT för att hantera sessioner och säkerställa att användare är korrekt autentiserade. När en användare loggar in skapas en cookie som används för att kunna göra anrop till den externa webbtjänsten.

Projektet är en SPA-applikation och skapades med hjälp av Vue.js (https://vuejs.org/).

### Beskrivning av lösning
**Hämta, skicka och radera data**\
För att hämta, skicka, uppdatera och radera data till en extern webbtjänst används Fetch API. De HTTP-anrop som används är GET, POST, PUT och DELETE. Den webbtjänst som används är https://projektfullstackramverk.onrender.com.

**Login.vue**\
Komponenten Login.vue används för att autentisera användare så att de kan få tillgång till alla funktioner för att hantera produkter på webbapplikationen. Ett formulär samlar in information om användaren (användarnamn och lösenord) och two-way binding används för att uppdatera ett dataobjekt med reaktiva variabler. När användaren klickar på knappen "Logga in" skickas en POST-förfrågan med den insamlade datan för att autentisera användaren. Om inloggningen lyckas, får användaren en cookie som ger tillgång till hela webbapplikationen.

**Logout.vue**\
Komponenten Logout.vue används för att logga ut användaren. När användaren klickar på knappen "Logga ut" skickas en GET-förfrågan för att radera den befintliga sessionen och cookien, varpå användaren omdirigeras till login-sidan.

**Products.vue**\
Komponenten Products.vue används för att visa information om varje enskild produkt. Den tar emot produktens data som props från ProductView.vue och skriver ut informationen i en tabell. Varje produkt har två knappar (en plusknapp och en minusknapp) för att uppdatera lagersaldot. När användaren klickar på en av knapparna körs en metod som skickar en PUT-förfrågan med produktens individuella ID till webbtjänsten för att uppdatera produkten. Varje produkt har även en "Ta bort"-knapp som gör det möjligt för användaren att radera produkten från listan. Om användaren klickar på knappen skickas en DELETE-förfrågan till webbtjänsten, och även här skickas produktens individuella ID med.

**AddProduct.vue**\
Komponenten AddProduct.vue används för att lägga till en ny produkt. Ett formulär samlar in information om produkten och two-way binding används för att uppdatera ett dataobjekt med reaktiva variabler. När användaren klickar på knappen "Lägg till" skickas en POST-förfrågan med den insamlade datan för att lägga till produkten på den externa webbtjänsten.

Komponenten använder även emits för att kommunicera med sin föräldrakomponent. När en produkt har lagts till skickar AddProduct.vue ett meddelande till ProductView.vue, som då uppdaterar listan med produkter på webbapplikationen.

### Installera projekt

För att installera och börja använda projektet, följ nedanstående steg:
* Klona projektet från Github. För att göra detta, nagivera till den mapp där du vill spara projektet, skriv in "git clone" följt av Github-repots URL.
* Installera beroenden. För att göra detta använd kommandot "npm install".
* Kör projektet. För att göra detta använd kommandot "npm run start".
* Kommandot för att bygga projektet är "npm run build".