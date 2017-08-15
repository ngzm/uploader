FROM node:latest
MAINTAINER ngzm<nk.ngzm@gmail.com>
#
# Add Tini
ENV TINI_VERSION v0.15.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
#
# uploader
RUN apt update && apt install -y sqlite3
ADD ./uploader /usr/src/app/
RUN cd /usr/src/app && npm install --production
EXPOSE 3000
CMD ["node", "/usr/src/app/bin/www"]
