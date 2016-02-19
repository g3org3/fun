FROM g3org3/node

ENV APP_PATH=/app
WORKDIR ${APP_PATH}

COPY package.json ${APP_PATH}/package.json
RUN npm install --production

COPY . ${APP_PATH}

CMD ["npm", "start"]
