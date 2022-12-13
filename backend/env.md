# Como configurar el archivo ".env":

  * Guarda los datos de la [Base de Datos], el cual servirá para la correcta ejecucion del servidor:
      ```
      DB_DEPLOY=<name database deploy>
      DB_NAME=<name database>
      DB_MAIL=<email>
      DB_PASS=<password>
      ```
    **Diferencia entre [DB_DEPLOY] y [DB_NAME].**
      - [DB_DEPLOY]:<p align="center"><img src="https://firebasestorage.googleapis.com/v0/b/backend-clases.appspot.com/o/DB_DEPLOY.PNG?alt=media&token=02b2c4f8-5552-4f48-9c88-e6a94e92b4a4" alt="DB_DEPLOY"/></p>
      - [DB_NAME]:<p align="center"><img src="https://firebasestorage.googleapis.com/v0/b/backend-clases.appspot.com/o/DB_NAME.PNG?alt=media&token=a80e3473-22fc-467f-8332-095f0de58846" alt="DB_NAME"/></p>
  ##

  * Instancia el puerto al cual se conectara el servidor:
      ```
      PORT=<port>
      ```