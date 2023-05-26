# PC_Pokemon_NodeJS_S8

Projet de Nodejs lors du semestre 8.
Créateurs:
DUMONT Brice (et MACHURON Mathilde)

# Informations sur le projet

## Lancement

Pour lancer le projet, lancez la commande : 
* <code>docker compose up --build [-d]</code>
* Après l'avoir lancée au moins une fois, <code>docker compose up [-d]</code> suffira

Le serveur se lancera automatiquement. Rajoutez l'option <code>-d</code> pour le lancer en fond, et utilisez <code>docker compose down</code> pour éteindre le serveur.

Pour lancer les tests : (pendant que le projet tourne)
* <code>docker compose exec app npm test </code>

Pour lancer la conding style : (pendant que le projet tourne)
* <code>docker compose exec app npm run lint</code>

## Stack technique

Utilisation de :
* Javascript : on le maîtrise mieux que typescript.
* Pgsql : contrairement au js, on a l'habitude d'utiliser mysql donc cette fois-ci on voulait conteneriser une bdd postgres.
* Jest : car il est plus abordable pour des débutants.

## Architecture project

Pour l'architecture du projet, on s'est basé sur une architecture en model 3 couches avec en plus une couche router. L'objectif était de décomposer l'application au mieux en respectant les bonnes pratiques de nodejs.
* Le point d'entrée est server.js, ou app.js pour les tests.
* Le dossier routes stockes les différentes routes de l'api, et associe un controlleur à chaque routes.
* Le dossier controllers stockes les controlleurs qui permettent de gérer des reqûetes, vérifier leur pertinances, appeler la couche service si la reqûete est conforme, et enfin renvoyer la réponse.
* Le dossier services stockes les services qui s'occupe du traitement métier des données, et appelle la couche database pour enregistrer des données
* Le dossier database stockes les Database accessor qui gèrent les reqûetes en bdd, ainsi que les modèles des données, et les configs de lancement. 
* Enfin le dossier utils stocke quelques middleware utiles.

# Workflow de developpement
# Bonnes pratiques
* <code>MR</code> Créer une merge request (MR) par issue, faire son developpement, l'assigner et désigner comme responsable l'autre. Une fois validée et mergée l'issue sera terminée.
* <code>Branche</code> Nom des branches pour automatiquement fermer l'issue: [numero_issue]-[titre_issue]: ex 2-url_create_pokemon
* <code>Commits</code>: Les commits doivent être claires, et commencer par <code>feat #[numero_issue] - </code> suivi du commentaire pertinent. Ex:  feat #2 - gestion route de création d'un pokemon.

# Suivi de travail

Utilisez les <code>label</code> pour chacune de vos issues car cela permet de connaitre l'avancé de votre travail.
Penser à modifier les labels après chaque "journée" de travail, ou après une MR.

## Labels:
* <code>todo</code> : il reste des chose à faire sur la tâche et personne n'est en train de la faire
* <code>En cours</code> : vous commencez la tâche (retire le todo)
* <code>20%</code> <code>40%</code> <code>60%</code> <code>80%</code> : % de finition de votre travail
* <code>En review</code> : quand le travail est fini mais qu'il faut accepter la MR
* <code>Finito</code> : complétement fini
* <code>Bloqué</code> : issue mise en pause pour x raisons

# Workflow dev:

## Ajouter une feature/fix/test:

* git checkout main

* git pull

* git checkout -b [feature ou fix ou test]/le_nom_de_ma_feature

* [faire mon dev]

* git add ... git commit ...

* git push

* (Si c'est le premier push :copier la ligne de push qu'il propose)

* aller sur gitlab, créer la merge request vers main, vérifier ses changements ! assigner la à l'autre

* L'autre accepte, merge et supprime la branche.

## Pour remettre à jour sa branche feature (car créé y'a longtemps) :

* git checkout main

* git pull

* git checkout feature/le_nom_de_ma_feature

* git rebase main

* Possible conflits (corriger puis faire git rebase --continue jusqu'à resolution total)


## Pour résoudre un conflit:

* git checkout main

* git pull

* git checkout -b merge/nom_de_la_feature

* git merge --no-ff features/nom_de_la_feature

* tant qu'il n'y a plus de conflict: résoudre les conflits;git add; git merge --continue

* puis enfin push et pull request

## Pour pouvoir push et s'identifier:

* git config --global user.email "you@example.com"

* git config --global user.name "Your Name"
