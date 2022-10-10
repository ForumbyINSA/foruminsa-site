# Site Forum By INSA

Ce repository contient le code source du site de [Forum By
INSA](https://forumbyinsa.fr/). Basé sur cette
[template](https://github.com/rosstopping/tailwindcss-templates/blob/master/layouts/foundation.html),
il utilise le générateur de site statique [Hugo](https://gohugo.io/) et
[Tailwind](https://tailwindcss.com/).

### Table des matières

- [Edition depuis Github](#edition-depuis-github)
- [Installation et compilation locale](#installation-et-compilation-locale)

## Edition depuis Github

Il est possible de modifier les fichiers directement depuis Github. Il faut ouvrir [Github.dev](https://github.dev/ForumbyINSA/foruminsa-site).

Lorsque l'on modifie un fichier, un badge bleu apparait à gauche. 

![image](https://user-images.githubusercontent.com/23584745/194866904-fd86ee00-a86f-43af-9c51-0ee26913fb68.png)

En appuyant sur le `+`, on indique que l'on veut prendre en compte cette modification lors du *commit*.

![image](https://user-images.githubusercontent.com/23584745/194867623-dfd6bb05-9252-4042-9a36-4ee94a78be4a.png)

Si on revient sur l'[historique des commits](https://github.com/ForumbyINSA/foruminsa-site/commits/main),
on constate bien que notre changement a été pris en compte.

![image](https://user-images.githubusercontent.com/23584745/194867911-b21b52b3-3db0-4527-af85-7bf1ef4f9631.png)


## Installation et compilation locale

Suivre les [instructions d'installation
d'Hugo](https://gohugo.io/getting-started/installing/) puis [celles de
git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Alternativement à `git` depuis la ligne de 
commande, [Github Desktop](https://desktop.github.com/) a une interface graphique et est sans
doute plus facile à prendre en mains.

Sur Windows, il peut être préférable de se déplacer dans le répertoire `C:\Hugo\Sites` :
```
dir C:\Hugo\Sites
```

La copie du repository peut ensuite se faire depuis la console de commande (ou depuis Github Desktop) avec
```
git clone https://github.com/ForumbyINSA/foruminsa-site.git
```

Ensuite on se déplace dans le répertoire nouvellement créé avec `cd
foruminsa-site` (Linux/MacOS) ou `dir foruminsa-site` (Windows). On peut alors
lancer hugo en mode développement :
```
hugo server
```

Le site devrait être accessible depuis
[http://localhost:1313/](http://localhost:1313/) dans le navigateur.

La compilation en mode production se fait avec :
```
hugo
```

Les fichiers devraient être dans le répertoire `public` et prêts à copier.
