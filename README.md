# Vitamiel

### Structure du projet

Node est requis pour la génération et recommandé pour le développement. Le fichier `package.json` est toujours généré pour une meilleure expérience de développement avec des outils comme prettier, hooks de commit, scripts, etc.

À la racine du projet, des fichiers de configuration sont générés pour des outils comme git, prettier, eslint, husky et d'autres outils bien connus pour lesquels vous pouvez trouver des références sur le web.

La structure `/src/*` suit la structure par défaut de Java.

- `.yo-rc.json` - Fichier de configuration Yeoman  
  La configuration est stockée dans ce fichier sous la clé `generator-`. Vous pouvez trouver `generator--*` pour des configurations spécifiques à certains blueprints.

- `.yo-resolve` (optionnel) - Résolveur de conflits Yeoman  
  Permet d'utiliser une action spécifique lorsque des conflits sont détectés, en évitant les invites pour les fichiers correspondant à un modèle. Chaque ligne doit correspondre à `[modèle] [action]`, où le modèle est un modèle [Minimatch](https://github.com/isaacs/minimatch#minimatch) et l'action peut être `skip` (par défaut si omise) ou `force`. Les lignes commençant par `#` sont considérées comme des commentaires et sont ignorées.

- `./*.json` - Fichiers de configuration des entités

- `npmw` - Wrapper pour utiliser npm installé localement.  
  Installe Node et npm localement en utilisant l'outil de build par défaut. Ce wrapper s'assure que npm est installé localement et l'utilise afin d'éviter les différences que peuvent causer différentes versions. En utilisant `./npmw` au lieu de la commande traditionnelle `npm`, vous pouvez configurer un environnement sans Node pour développer ou tester votre application.

### Développement

Le système de build installera automatiquement la version recommandée de Node et npm.

Nous fournissons un wrapper pour lancer npm.  
Vous n'aurez besoin d'exécuter cette commande que lorsque les dépendances changent dans le fichier [package.json](package.json).

```
./npmw install
```

Nous utilisons des scripts npm et [Webpack][] comme système de build.

Exécutez les commandes suivantes dans deux terminaux séparés pour créer une expérience de développement fluide où votre navigateur se rafraîchit automatiquement lorsque des fichiers sont modifiés sur votre disque dur.

```
./mvnw
./npmw start
```

Npm est également utilisé pour gérer les dépendances CSS et JavaScript utilisées dans cette application. Vous pouvez mettre à jour les dépendances en spécifiant une version plus récente dans le fichier [package.json](package.json). Vous pouvez également exécuter `./npmw update` et `./npmw install` pour gérer les dépendances.  
Ajoutez l'option `help` à n'importe quelle commande pour voir comment l'utiliser. Par exemple, `./npmw help update`.

La commande `./npmw run` listera tous les scripts disponibles pour ce projet.

### Gestion des dépendances

Par exemple, pour ajouter la bibliothèque [Leaflet][] comme dépendance d'exécution de votre application, vous devez exécuter la commande suivante :

```
./npmw install --save --save-exact leaflet
```

Pour bénéficier des définitions de types TypeScript du dépôt [DefinitelyTyped][] lors du développement, vous devez exécuter la commande suivante :

```
./npmw install --save-dev --save-exact @types/leaflet
```

Ensuite, vous devrez importer les fichiers JS et CSS spécifiés dans les instructions d'installation de la bibliothèque afin que [Webpack][] les prenne en compte.  
Remarque : Il reste encore quelques étapes supplémentaires à faire pour Leaflet que nous ne détaillerons pas ici.

Pour plus d'instructions sur le développement avec , consultez [Utilisation en développement][].

### Exécuter localement

Exécuter le projet Spring Boot avec le profil dev.

Exécuter le frontend : `npm run webapp:dev`
