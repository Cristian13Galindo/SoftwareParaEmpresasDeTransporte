FROM node:18

WORKDIR /app

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Exponer puerto
EXPOSE 4200

# Mantener el contenedor vivo
CMD ["tail", "-f", "/dev/null"]