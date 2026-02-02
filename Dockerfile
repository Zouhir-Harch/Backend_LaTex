FROM node:18-slim

RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-fonts-recommended \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY src ./src

RUN mkdir -p uploads && chmod 777 uploads

EXPOSE 5000

CMD ["node", "src/server.js"]
