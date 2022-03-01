FROM nginx:alpine
COPY dist/conexiona-app/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
