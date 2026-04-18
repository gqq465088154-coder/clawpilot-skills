FROM node:20-alpine

WORKDIR /app

# install deps first (layer cache)
COPY package.json ./
RUN npm install --omit=dev

# copy source
COPY server.js ./
COPY public/ ./public/
COPY clawpilot-config/ ./clawpilot-config/
COPY clawpilot-doctor/ ./clawpilot-doctor/
COPY clawpilot-pair/   ./clawpilot-pair/
COPY clawpilot-send/   ./clawpilot-send/

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
