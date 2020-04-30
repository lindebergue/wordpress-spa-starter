FROM wordpress:latest

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

# copy the theme and built it
WORKDIR /var/www/html/
COPY ./theme wp-content/themes/custom-theme
RUN cd wp-content/themes/custom-theme && npm install && npm run build

# run it
CMD ["apache2-foreground"]
