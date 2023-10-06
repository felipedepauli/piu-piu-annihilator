# Use a imagem oficial do Node.js 14 como base
FROM node:14

# Define a pasta /app como diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json (e o package-lock.json, se disponível) para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia os arquivos e pastas do seu projeto para o diretório de trabalho (excluindo node_modules)
COPY . .

# Expõe a porta 8080 para o contêiner
EXPOSE 8080

# Executa o comando `node server.js` quando o contêiner inicia
CMD [ "node", "server.js" ]
