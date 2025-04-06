
# Progetto Aziendale: **SSerpygamebt**

## Sommario
- [Obiettivi del Progetto](#obiettivi-del-progetto)
- [Descrizione del Progetto](#descrizione-del-progetto)
- [Ruoli e Responsabilità](#ruoli-e-responsabilità)
- [Timeline del Progetto](#timeline-del-progetto)
- [Risorse](#risorse)
- [Rischi e Mitigazioni](#rischi-e-mitigazioni)
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
Un arduino legge i dati X,Y del Joystick . E lì invia ad un computer. Attraverso due modi : seriale o Bluetooth. Il computer , dopo averlì letti , lì usa per effettuare una richiesta http post , contente nel payload il valore di X,Y, al server che è realizzato con Flask , in esecuzione sul nostro Raspberry PI. Il server mostra una pagina web contenente un minigioco in Javascript , in cui un blocco verde deve schivare dei blocchi nemici che si muovono in maniera randomica. 
Questo blocco verde si muove a seconda dei dati ricevuti dal Joystick . Ma funziona anche se si preme sulla tastiera WASD . 
## Ruoli e Responsabilità
| Nome                  | Ruolo                     | Responsabilità                           |
|-----------------------|---------------------------|--------------------------------------------|
| Fusar Bassini Simone   | Leader      | Realizzazione gioco in JS, supervisione,realizzazione server flask        |
| Ambrosini Ares   | Consulto e dipendente      | Test sulla comunicazione seriale e bluetooth, cablaggio, realizzazione presentazione |
| Cornetti Andrea   | Consulto e dipendente      | Test sulla comunicazione seriale e bluetooth, cablaggio, realizzazione presentazione |
| Valiati Nicolas   | Consulto e dipendente      | Test sulla comunicazione seriale e bluetooth, cablaggio, realizzazione presentazione |


## Timeline del Progetto
| Fase                  | Data di Inizio  | Data di Fine  | Stato        |
|-----------------------|----------------|---------------|--------------|
| Fase 1: Analisi    | lun 10/03/2025        | lun 17/03/2025        | Completata|
| Fase 2: Sviluppo  | mar 18/03/2025        | lun 31/03/2025   | Completata |
| Fase 3: Test        | lun 31/03/2025       | dom 13/04/2025       | In Corso |
| Fase 4: Consegna   | lun 14/04/2025       | 14/04/2025       | Non ancora svolta |

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
       5. aggiornare con librerie bluetooth
    
-**Budget**:
Il budget dipende da quanti componenti opzionali si desideri utilizzare . Supponiamo di avere già un PC a nostra disposizione però : 
Verranno spesi circa 40€ per kit Freenove comprendente anche joystick, 80€ per RaspberrryPI,10€ per adattatore HC05
- **Personale Coinvolto**: Sono state coinvolte tutte le persone del gruppo e anche il professor Alessandro Della Torre
- **Tutorial**:
  E' possibile giocare online alla versione che funziona solo da tastiera al seguente link : https://fb-bike.it/game3/templates/index.html
  
  Se invece si desidera giocare alla versione normale effettuare i seguenti passaggi :
 1. Scaricare ZIP del file
 2. Caricare lo sketch di ProgettoArduino sul microcontrollore
 3. Verificare gli indirizzi ip nel codice js all' interno di serverFlask/static/js , e in leggiDa/code.py  : BISOGNA METTERE L'INDIRIZZO IP DEL RASPBERRY PI
 4. Lanciare sul raspberry PI il file in serverFlask/serverGame.py
 5. Lanciare sul proprio PC il file leggiDa/code.py
 6. Visitare la pagina web che ha come indirizzo quello del raspberryPi:5000
 7.  Muovere il Joystick e iniziare a giocare. Vedere come il personaggio si muova in base agli impulsi dati dal Joystick

## Rischi e Mitigazioni
| Rischio               | Probabilità | Impatto  | Mitigazione                              |
|-----------------------|--------------|----------|------------------------------------------|
| [Rischio 1]           | [Alta/Media/Bassa] | [Alta/Media/Bassa] | [Strategia di mitigazione]            |
| [Rischio 2]           | [Alta/Media/Bassa] | [Alta/Media/Bassa] | [Strategia di mitigazione]            |

## Risultati Attesi
[Descrivere i risultati attesi al termine del progetto, come metriche di successo o benefici per l'azienda.]

## Conclusioni
[Inserire un riepilogo finale del progetto, includendo eventuali raccomandazioni per il futuro.]
