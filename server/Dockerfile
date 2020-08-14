FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# RUN npm install pm2 -g

COPY . .

# Exponer los puertos adecuados
# EXPOSE 8086

# Ejecutar
# CMD ["pm2-runtime", "src/app.js"]
CMD [ "node", "src/app.js" ]

# Construir una imagen
# docker build -t tel_plc_elastic:1 .

# Arranar un contenedor de la imagen
# docker container run --name driver5000 -p 44818:44818 -p 2222:2222/udp -p 9200:9200 -d tel_plc_elastic:1

# Operacion
# docker container ls
# docker container stop [OPTIONS] CONTAINER [CONTAINER...]
# docker container start [OPTIONS] CONTAINER [CONTAINER...]
# docker container rm [OPTIONS] CONTAINER [CONTAINER...]

# Publica a Docker HUB
# docker tag tel_plc_elastic:1 gleon2611/tel_plc_elastic:1
# docker login --username gleon2611
# docker push gleon2611/tel_plc_elastic:1

