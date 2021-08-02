FROM node:10.16.2
COPY package*.json ./
#&& apk update && apk add bash
#COPY app/dist app/dist
COPY . .  
COPY config.json config.json
RUN npm install
# CMD npm start && tail -f /dev/null  
# RUN export NODE_ENV=mixed
# CMD npm start && tail -f /dev/null  
CMD npm run prepare && npm start && tail -f /dev/null  