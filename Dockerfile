FROM pierrezemb/gostatic
COPY ./dist/ /srv/http/
ENTRYPOINT ["/goStatic", "-enable-logging", "-fallback", "/index.html"]
