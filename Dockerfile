# Utiliser une image Node légère
FROM node:18-slim

# Installer TeX Live complet minimal pour compiler les PDFs
RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-latex-recommended \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-lang-french \
    && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances et installer
COPY package*.json ./
RUN npm install

# Copier le code source
COPY src ./src

# Créer le dossier pour les uploads si nécessaire
RUN mkdir -p uploads && chmod 777 uploads

# Définir le port
EXPOSE 5000

# Lancer le serveur
CMD ["node", "src/server.js"]
