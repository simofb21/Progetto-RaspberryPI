
# Progetto Aziendale: **Geometry flow**

## Sommario
- [Obiettivi del Progetto](#obiettivi-del-progetto)
- [Descrizione del Progetto](#descrizione-del-progetto)
- [Ruoli e Responsabilità](#ruoli-e-responsabilità)
- [Timeline del Progetto](#timeline-del-progetto)
- [Risorse](#risorse)
- [Tutorial](#tutorial)
- [Immagini e video](#immagini-e-video)
- [Componenti aggiuntive ](#componenti-aggiuntive)
- [Risultati Attesi](#risultati-attesi)
- [Conclusioni](#conclusioni)

---

## Obiettivi del Progetto
- **Obiettivo Principale**: L' obiettivo principale del nostro progetto è  consentire di giocare ad un minigame sia da tastiera ma soprattutto con un joystick.
- **Obiettivi Specifici**:
  1. Permettere di giocare sia a chi possiede un Arduino e un joystick di Arduino sia a chi non lo possiede
  2. Comunicazione bluetooth sfruttando l' Arduino(da vedere se si riesce a fare)..> in alternativa useremo solo comunicazione seriale
  3. Offrire una pagina web che interagisca con le richieste effettuate dai client
  4. Comunicazione tra pc e Server Raspberry PI

## Descrizione del Progetto
Un arduino legge i dati X,Y del Joystick . E lì invia ad un computer. Attraverso due modi : seriale o Bluetooth. Seriale usa direttamente i cavi, bluetooth usa un adattatore HC-05. Il computer , dopo averlì letti , lì usa per effettuare una richiesta http post , contente nel payload il valore di X,Y, al server che è realizzato con Flask , in esecuzione sul nostro Raspberry PI. Il server mostra una pagina web contenente un minigioco in Javascript , in cui un blocco verde deve schivare dei blocchi nemici che si muovono in maniera randomica. 
Questo blocco verde si muove a seconda dei dati ricevuti dal Joystick . Ma funziona anche se si preme sulla tastiera WASD . 
## Ruoli e Responsabilità
| Nome                  | Ruolo                     | Responsabilità                           |
|-----------------------|---------------------------|--------------------------------------------|
| Fusar Bassini Simone   | Leader      | Realizzazione gioco in JS, supervisione,realizzazione server flask,comunicazione client e server |
| Ambrosini Ares   | Consulto e dipendente      | Test sulla comunicazione seriale e bluetooth, cablaggio, realizzazione presentazione |
| Cornetti Andrea   | Consulto e dipendente      | Test sulla comunicazione seriale e bluetooth, cablaggio, realizzazione presentazione |
| Valiati Nicolas   | Consulto e dipendente      | Test sulla comunicazione seriale e bluetooth, cablaggio, realizzazione presentazione |


## Timeline del Progetto
| Fase                  | Data di Inizio  | Data di Fine  | Stato        |
|-----------------------|----------------|---------------|--------------|
| Fase 1: Analisi    | lun 10/03/2025        | lun 17/03/2025        | Completata|
| Fase 2: Sviluppo  | mar 18/03/2025        | lun 31/03/2025   | Completata |
| Fase 3: Test        | lun 31/03/2025       | dom 13/04/2025       | Completata |
| Fase 4: Consegna   | lun 14/04/2025       | 14/04/2025       | Stiamo completando proprio mentre scriviamo questo report |

## Risorse
- **Componenti hardware necessari**:
  1. Arduino Uno oppure suggeriamo Freenove Control Board
  2. PC
  3. RaspberryPi
  4. Adattatore HC05 Bluetooth(Opzionale, si può comunicare anche via seriale)
  5. Joystick Arduino (opzionale , si può giocare anche da tastiera)
  6. Altri componenti per cablaggio , come resistenze,breadboard...
- **Librerie e tools**
  1. Arduino Ide  : per caricare lo sketch sul Microcontrollore usato . Servirà importare la Libreria SoftwwareSerial.h per HC-05
  2. Python : è fondamentale avere  python installato sia sul dispositivo usato come server(RaspberryPI), che sul PC che dialoga col server . Inoltre bisognera importare. :
       1. flask --> sul dispositivo che fa da server
       2. serial
       3. requests
       4. json
    
- **Budget**:
Il budget dipende da quanti componenti opzionali si desideri utilizzare . Supponiamo di avere già un PC a nostra disposizione però : 
Verranno spesi circa 40€ per kit Freenove comprendente anche joystick, 80€ per RaspberrryPI,10€ per adattatore HC05
- **Personale Coinvolto**: Sono state coinvolte tutte le persone del gruppo e anche il professor Alessandro Della Torre

 ## Tutorial 
 
  E' possibile giocare online alla versione che funziona solo da tastiera al seguente link : https://fb-bike.it/game3/templates/index.html
  
  Per la versione normale , quindi che funziona con Joystick(NB , funziona comunque anche da tastiera)
 1. Per il cablaggio : copiare il cablaggio in figura  . Se si vuole usare  il Bluetooth serve 
 2. Scaricare ZIP del file
 3. Se si vuole usare il Bluetooth , caricare lo sketch all' interno della cartella arduinoBluetooth sull' Arduino , oppure se si vuole comunicare via seriale , quello su arduinoSeriale. Entrambi i codici restituiscono al PC i dati X,Y del Joystick
 4. Verificare gli indirizzi ip nel codice js all' interno di serverFlask/static/js , e in leggiDa/seriale_post.py e leggiDa/bluetooth_post.py  : BISOGNA METTERE L'INDIRIZZO IP DEL RASPBERRY PI
 5. Lanciare sul raspberry PI il file in serverFlask/serverGame.py
 6. Lanciare sul proprio PC uno dei due file con .._post.py contenuti in leggiDa . A seconda se si usa Bluetooth o Seriale scegliere quello corretto
 7. Visitare la pagina web che ha come indirizzo quello del raspberryPi:5000
 8. Muovere il Joystick e iniziare a giocare. Vedere come il personaggio si muova in base agli impulsi dati dal Joystick

### Spiegazione 
graph TD
    subgraph Arduino
        A1[Joystick]
        A2a[Sketch con invio seriale]
        A2b[Sketch con invio Bluetooth (HC-05)]
    end

    subgraph PC
        P1[main.py (leggiDa)]
        P2a[seriale_post.py]
        P2b[bluetooth_post.py]
        P3[HTTP POST con X,Y]
    end

    subgraph Raspberry_Pi
        R1[serverGame.py (Flask)]
        R2[Gioco JS nel browser]
    end

    A1 --> A2a --> P1 --> P2a --> P3 --> R1 --> R2
    A1 --> A2b --> P1 --> P2b --> P3 --> R1

## Immagini e video
![Foto1](/view/foto1.jpg)
![Foto2](/view/foto2.jpg)
![Video funzionamento](/view/video_funzionamento.mp4)
## Componenti aggiuntive
Il vantaggio principale del nostro progetto è che funziona in 3 vesioni e questo rende il tutto più interessante perchè permettiamo all' utente di scegliere lui cosa utilizzare. 
## Risultati Attesi
Il risultato atteso è che il quadratino verde riesca a muoversi in base ai dati ricevuti dal Joystick o da tastiera.
## Conclusioni
Il progetto finito attualmente funziona. Esso è solo una simulazione , di fatto il giochino è molto banale. 

Però siamo riusciti a fare alcune cose molto interessanti : usare il Bluetooth sull' Arduino , cosa non semplice e che ha richiesto l' utilizzo di un adattatore. Altra cosa interessante è il fatto che ci siano 3 modi di giocare : sfruttando la comunicazione seriale col joystick, sfruttando la comunicazione bluetooth col joystick, direttamente da tastiera con WASD.
Per il futuro le principali implementazioni da fare sono sul giochino in JS . Al momento è banale, è solo per far vedere che muoviamo qualcosa in base ai dati del joystick . Ma desideriamo ingrandirlo ancora molto, inserendo punteggi, tempi di gioco, possibilità di migliorare il personaggio ecc ecc.
