# `Progressive Web Apps`

## Beispiel Chatter

- Eine kleine Proof-of-Concept Chat-Applikation
- Das Beispiel kann mit start.sh ausgeführt werden.
- Rest Endpoints:

Die Rest Endpoints ist kein direkter Zugriff möglich. Falls Sie direkt auf die Rest-Endpoints zugreifen wollen, müssen Sie in der 'docker-compose.yml' Datei 
'services/thorntail/expose/ - "8080"' durch 'services/thorntail/ports/ -8080:8080' ersetzen. Rest ist nun unter der URL localhost:8080/api... verfügbar

| Methode |                          URL                          |                                            Beschreibung                                                       |
|---------|:-----------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------:|
| GET     | /api/messages/getConverstationOfUsers/{user1}/{user2} | Gibt alle Nachrichten, welche zwischen User1 und User2 ausgetauscht wurden, als Json Array zurück             |
| POST    |         /api/messages/addMessageToConversation        | Im Body wird ein Message Json Objekt mitgegen, dieses wird daraufhin in der Datenbank gespeichert             |
| GET     |                 /api/users/getAllUsers                |                              Gibt alle Benutzer als Json Array zurück                                         |
| PUT     |                 /api/users/login                      | Im Body wird ein User Json Objekt mitgegeben. Falls der Benutzer noch nicht existiert wird ein neuer erstellt |

## Ausarbeitung des Referats
Die Ausarbeitung des Referats ist in der Datei 'PWA Präsentation.pdf' verfügbar
Die Ausarbeitung des Beispiels ist in der Datei 'Getting Started-PWA.pdf' verfügbar
