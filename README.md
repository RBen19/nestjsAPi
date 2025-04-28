
  # Présentation Du Projet :
  Ce projet a pour objectif de démontrer l'utilisation du framework NestJS pour la création d'une API REST sécurisée. Il met en œuvre l'authentification des utilisateurs à l'aide de JSON Web Tokens (JWT), avec les objectifs suivants :

  - Authentifier les utilisateurs via un système de login basé sur JWT
  - Protéger certaines routes de l'API à l’aide d’un middleware d’authentification
  - Restreindre l’accès aux routes protégées aux utilisateurs non authentifiés.

  # Architecture du projet : 

  L’architecture du projet suit les principes de la Clean Architecture, séparant les responsabilités en plusieurs couches (domaine, application, infrastructure (infra dans le projet ), interface) pour une meilleure maintenabilité et évolutivité.
  
  # Fonctionnalités :
    Afin d’illustrer les objectifs mentionnés précédemment, ce projet met en œuvre les fonctionnalités suivantes :

    - Création d’utilisateurs : inscription d’un nouvel utilisateur via une route publique.

    - Authentification avec JWT : connexion d’un utilisateur et génération d’un token d’accès sécurisé.

    - Création de voitures (Car) : ajout d’une voiture associée à un utilisateur authentifié.

    - Affichage des voitures d’un utilisateur : récupération de la liste des voitures appartenant à l’utilisateur connecté.

    - Chaque action protégée nécessite une authentification préalable via JWT, garantissant un accès sécurisé aux ressources.

  # Outils utilisés :

        | Outils                  | Version         |
    |------------------------|-----------------|
    | Node.js                | v23.6.0         |
    | npm                    | v10.9.2         |
    | PostgreSQL             | v17             |
    | pgAdmin 4              | v8.14           |
    | Git Bash (Windows)     | v2.47.1         |
    | Postman                | v11.42.4        |
    | Visual Studio Code     | v1.99.3.0       |

  # Setup du projet  :
   ##  Installation des dépendances
  Assurez vous d'être à la racine du projet d'avoir une bonne connexion internet et bien sûr les outils nécessaire. 
  depuis le terminal (Git bash préférences si vous êtes sur windows) lancez la commande : `npm install`
  ## Création du .env
  1. exemple de fichier .env
     - PORT = 3000 
     - DB_HOST=localhost
     - DB_PORT=5432
     -  DB_USERNAME=buddy
     - DB_PASSWORD=Sweetheart
     - DB_NAME=ghost
     - JWT_SECRET = votre_secret_générer 
     - TOKEN_EXP = 2h
     - DB_SCHEMA=public
     - DATABASE_URL="postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}"
  2. explication du role de chaque variable du .env
  toujours à la racine du projet créer un fichier .env avec les variables suivantes :

  - PORT : le port sur lequel va lancer l'application 
  - DB_HOST : votre host
  - DB_PORT : qui représente le port  utilisé par votre base de donées
  - DB_USERNAME : qui représente le nom de l'utilisateur de la base de données
  - DB_PASSWORD : qui represente le mot de passe de l'utilisateur de base de données
  - DB_NAME : qui représente le nom de la base de données
  - DB_SCHEMA :  qui représente  le schema utilisé par votre BDD (important pour prisma)
  - JWT_SECRET : qui  représente votre secretJWt
  - TOKEN_EXP : qui représente la durée d'expiration du Token jwt 
  - DATABASE_URL : qui représente la chaine de connexion pour prisma 
  - NB: 
   - vous pouvez générer un secret JWt sécuriser sur le site : `https://jwtsecret.com/generate`
   -  vérifiez que le port ne l'application est libre  
 ### le schema = public est celui utilisé par defaut par postgrès 
 ## Prisma : 
  Toujours depuis le terminal à la racine du projet ; pour setup prisma dans le projet vous devez lancez les commandes : 
   - `npx prisma migrate deploy --schema=./src/infra/database/prisma/schema.prisma` : pour lancer les migrations
   - `npx prisma generate --schema=./src/infra/database/prisma/schema.prisma`: générer le clien prisma
   - `npx prisma migrate status --schema=./src/infra/database/prisma/schema.prisma` :  pour vérifier le status des migrations
   - ou lancez  le script `npm run prisma:init` : qui fait les trois.

 # Test sur un client :
  une fois que le setup du projet est fait il est enfin temps de tester le projet.
  lancez la commande `npm run start:dev` 
  1. Test d'une route publique 
  -  Méthode : GET
  -  Endpoint : /api/v1/car/hello
  -  exemple url : `http://localhost:3001/api/v1/car/hello`
  - réponse attendue : "hello from car"
  2. Création d’un utilisateur
   - Méthode : POST
   - Endpoint : /api/v1/user/create
   - Exemple d’URL : `http://localhost:3001/api/v1/user/create`
   - exemple de Json :
    {
     "username": "Sweetheart",
     "password": "sukali"
    }
   - Réponse attendue :
    {
     "message": "utilisateur créer"
    }
  3. Tester une route protégée sans authentification
   -  Méthode : GET
   -  Endpoint : /api/v1/car
   - exemple url : `http://localhost:3001/api/v1/car`
   - Réponse attendue :
    {
      "message": "Unauthorized",
      "statusCode": 401
    }
  4. Authentification (login utilisateur)
      - Méthode : POST
      - Endpoint : /api/v1/user/login  
      - exemple url : `http://localhost:3001/api/v1/user/login`
      - exemple de json :
       {
        "username": "Sweetheart",
        "password": "sukali"
       }
       - Réponse attendue : 
      {
       "access_token": "<YOUR_TOKEN_JWT>"
      }
      Copiez ce token, il sera utilisé pour authentifier les prochaines requêtes.
  5. Ajouter une voiture (route protégée)
     -  Méthode : POST
     - Endpoint : /api/v1/car/createCar
     - Exemple d’URL : `http://localhost:3001/api/v1/car/createCar`
     * config postman pour utiliser le token 
     -  Allez dans l'onglet Authorization.
     - Type : Bearer Token.
     - Collez le token obtenu précédemment.
     - Dans l’onglet Body → raw → JSON, ajoutez : 
      {
        "immatriculation": "AB-CD-EF"
      }
      - Réponse attendue : 
       {
         "message": "nouvel enregistrement réussit "
       }
  6. Récupérer les voitures d’un utilisateur authentifié
       -  Méthode : GET
       - Endpoint : /api/v1/car

       - Exemple d’URL : `http://localhost:3001/api/v1/car`
       - Réponse attendue : 
       {
          "car": [
              {
                  "carId": 5,
                  "immatriculation": "AB-CD-EF",
                  "userId": 12
              }
          ]
        }

    

 






   





