FROM nginx:1.20.2-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx","-g", "daemon off;"]