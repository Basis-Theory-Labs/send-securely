ARG node_image=node:14-alpine3.15

# STAGE 1
FROM $node_image as builder

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app/

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-progress --ignore-scripts

COPY next.config.js ./
COPY next-i18next.config.js ./
COPY tsconfig.json ./
COPY api-framework ./api-framework/
COPY components ./components/
COPY globals ./globals/
COPY pages ./pages/
COPY proxy ./proxy/
COPY public ./public/
COPY server-side ./server-side/
COPY styles ./styles/
COPY theme ./theme/

RUN yarn build

# STAGE 2 -- useful if we don't want to include dependencies that
# are used as apart of the build process
FROM $node_image as production

WORKDIR /app/

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --no-progress --ignore-scripts

# STAGE 3
FROM $node_image

RUN apk update && apk upgrade

RUN npm uninstall npm -g

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR /app/

COPY --from=production /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-i18next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD yarn start
