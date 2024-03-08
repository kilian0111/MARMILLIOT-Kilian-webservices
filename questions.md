# QUESTIONS

Merci de répondre librement et le plus clairement possible aux questions suivantes:

## PUT & PATCH

Quelle est la différence entre un PUT un PATCH

1) PUT remplace entièrement une ressource, tandis que PATCH effectue une mise à jour partielle de la ressource en
   modifiant seulement certaines parties.

## FETCH/AXIOS

Pourquoi un call vers mon api depuis Postman fonctionne mais semble bloqué lorsque le même call est exécuté par Firefox?

1) Les navigateurs ont des politiques de sécurité qui empêchent les appels cross-origin. Il est possible que le
   navigateur bloque l'appel à l'API en raison de la politique de sécurité CORS.
   Postman n'est pas soumis à ces règles, ce qui explique pourquoi l'appel fonctionne depuis Postman.

2) il faut donc configurer des en-têtes CORS appropriés du côté serveur ou applicatif pour autoriser les requêtes depuis
   le domaine de notre application Firefox.
   Cela permettra au navigateur de permettre l'appel API sans problème.

## NGINX/APACHE

Qu'est ce qui justifie d'avoir en plus de notre api node un serveur web comme Apache ou Nginx?

1) Les serveurs web comme Apache ou Nginx sont des serveurs HTTP qui peuvent servir de reverse proxy pour notre API
   Node.js, Donc il peuvent faire du load balancing, de la compression, de la mise en cache et ou encore des
   redirections
2) Donc ce qui justifie d'avoir un serveur web en plus de notre API Node.js est la gestion de la sécurité, la gestion de
   la charge avec le loadBalincing, la gestion de la compression, la gestion de la mise en cache coté serveur.

## PERFORMANCES

Citez 3 axes vus en cours pour améliorer les performance d'une api Rest

Quelques axes pour améliorer les performances d'une API REST sont:

- le Load Balancing avec PM2
- la mise en cache avec Redis, cache client et cache serveur
- les indexations des bases de données
- Pagination et Filtrage ( query parameters )
