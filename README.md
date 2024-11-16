v1 - all devices stable internet.

Node.js, http-server, Kafka, Mongo, Redis

flow

DEVICE -> route -> handler -> create Kafka Message
on Kafka Message -> add data to DB (Mongo), 
check if is need to alert (Mongo + Redis)
if + -> create Kafka Message with Alert for Device
if it is last device which went of for zone -> cerate Kafka Message with alert for Zone

Handling Alert message
(not realized)
you can create alert id db, send to other microservice, etc
