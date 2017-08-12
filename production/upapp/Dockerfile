FROM node:latest
MAINTAINER ngzm<nk.ngzm@gmail.com>
RUN apt update && apt install -y sqlite3
ADD ./uploader /usr/src/app/
RUN cd /usr/src/app && npm install --production
EXPOSE 3000
CMD ["node", "/usr/src/app/bin/www"]
