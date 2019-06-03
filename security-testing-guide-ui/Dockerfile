## BUILD ##

FROM node:10-alpine as builder

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm install && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN $(npm bin)/ng build --prod --aot

## SETUP ##

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/config.nginx /etc/nginx/conf.d/default.conf
COPY nginx/ssl /etc/nginx/ssl

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/security-testing-guide-ui /usr/share/nginx/html

# EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


#RUN npm install
#RUN npm install typescript@">=3.1.1 <3.3"

#RUN ng serve --host 0.0.0.0
#RUN npm run build
#RUN npm start
#EXPOSE 4200
#ENTRYPOINT [ "npm", "start" ]
#, "-H", "0.0.0.0"]
