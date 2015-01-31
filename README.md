### Redirector

The goal of Redirector is to provide redirect like functionality which comes in handy for testing development code on a production environment.

It works in combination with the /etc/hosts file by listening to all traffic hitting localhost and then redirecting it to the URL specific by the user in the mappings.json file.