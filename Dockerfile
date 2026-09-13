FROM prawee/strapi

WORKDIR /opt/app

RUN npm install @strapi/provider-email-nodemailer@4.16.2 --no-save