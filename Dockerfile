FROM pierrezemb/gostatic
COPY dist/ /srv/http/
ENTRYPOINT ["/goStatic", "-fallback", "/index.html"]
