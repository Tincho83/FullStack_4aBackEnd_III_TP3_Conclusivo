![image](/src/public/img/demo.PNG)
# BackEnd III - Entrega TP Conclusivo 
## _Servidor con endpoints y servicios para gestionar los usuarios y mascotas para un sistema de adopcion._  
  
### Vista previa / Preview
![image](/src/public/img/demo.gif)

### Depliegue / Deploy
[BackEnd III TP (Conclusivo) Repositorio](https://github.com/Tincho83/FullStack_4aBackEnd_III_TP3_Conclusivo)

[BackEnd III TP (Conclusivo) Imagen DockerHub](https://hub.docker.com/repositories/martinshernandez) https://hub.docker.com/repositories/martinshernandez

### Link a Imagen Docker Hub:
https://hub.docker.com/repository/docker/martinshernandez/adoptme_mh/general

https://hub.docker.com/r/martinshernandez/adoptme_mh

### Buscar imagen Docker:
docker search adoptme_mh

### Descargar imagen Docker:
docker pull martinshernandez/adoptme_mh

# Procesos realizados para la creacion de imagen Docker:

### Crear imagen Docker (Ubicarse sobre el directorio donde esta el archivo package.json ):
docker build --network=host -t adoptme_mh .

### Listar imagenes Docker, copiar id de imagen:
docker images

### Listar Log de imagen Docker:
docker history <image_id>

### Crear contenedor y correr imagen Docker:
docker run -d --env-file ./src/.env.dev --name adoptme_mh_c1 -p 8080:8080 adoptme_mh

### Verificar variables de entorno dentro del contenedor:
docker exec -it adoptme_mh_c1 printenv

# Procesos realizados para la subir imagen Docker:
## (Deberas estar registrado para iniciar sesion en Docker Hub)


### Iniciar sesion en Docker:
docker login

### Etiquetar imagen Docker:
docker tag adoptme_mh martinshernandez/adoptme_mh:1.0.0

### Subir imagen a Docker Hub:
docker push martinshernandez/adoptme_mh:1.0.0



## Descripcion / Description
Aplicativo Backend para un sistema de adopcion de mascotas realizado en javascript, express, Handlebars, websocket y BD para el curso de Backend III Testing y Escalabilidad en CoderHouse.  


### Construccion / Building
-  Javascript ECMAScript Module
-  node 19.9

# Install nodejs and verify version
   - Install node (recommended version LTS)
   - node --version
   - npm --version

### Dependecias / Dependencies
-  bcrypt
-  commander
-  connect-mongo
-  cookie-parser
-  cors
-  dotenv
-  express
-  express-handlebars
-  express-session
-  jsonwebtoken
-  moment
-  mongoose
-  mongoose-paginate-v2
-  multer
-  nodemailer
-  passport
-  passport-github2
-  passport-jwt
-  passport-local
-  session-file-store
-  socket.io

## Instalacion / Installation
### Pasos / Steps
- Abrir VS Code / Open Vs Code
- Clonar repositorio / Clone Repository
   -  **git clone https://github.com/Tincho83/FullStack_4aBackEnd_III_TP3_Conclusivo.git**
   o  
   -  **git clone git@github.com:Tincho83/FullStack_4aBackEnd_III_TP3_Conclusivo.git** 

- Acceder a la carpeta del proyecto / Access to project folder
   - **cd FullStack_4aBackEnd_III_TP3_Conclusivo-main**

- Copiar archivos .env (Para Desarrollo o Produccion) dentro de la carpeta "src" (FullStack_4aBackEnd_III_TP3_Conclusivo-main\src)

- Instalar todas las dependecias del proyecto/ Install dependencies
   - **npm install**
   o instalar dependencias individualmente
   - **npm install bcrypt**
   - **npm install commander**
   - **npm install connect-mongo**
   - **npm install cookie-parser**
   - **npm install cors**
   - **npm install dotenv**
   - **npm install express**
   - **npm install express-handlebars@7.1.3**
   - **npm install express-session**
   - **npm install jsonwebtoken**
   - **npm install moment**
   - **npm install mongoose**
   - **npm install multer**
   - **npm install passport**
   - **npm install passport-github2**
   - **npm install passport-jwt**
   - **npm install passport-local**
   - **npm install session-file-store**
   - **npm install socket.io**

   
- Instalar otras herramientas / Install others tools
   - **npm install -g nodemon** (instala nodemon de manera global. Esta herramienta reinicia el servidor cuando detecta cambios en el codigo.)
   
- Correr / Run
   - **npm run dev** (Para ejecutar en modo desarrollo)
   - **npm run start** (Para ejecutar en modo produccion)


### Contacto
https://www.linkedin.com/in/martin-hernandez-9b7154215
