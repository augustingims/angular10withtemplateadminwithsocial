FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY  dist/local-extern-crm-front /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main-es2015*.js)\" && \
  envsubst '\$SERVER_API_URL' < \${mainFileName} > main.tmp && \
  mv main.tmp  \${mainFileName} && nginx -g 'daemon off;'" > run.sh

EXPOSE 80

ENTRYPOINT ["sh", "run.sh"]
