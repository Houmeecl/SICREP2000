# Guía de Despliegue - SICREP

Este documento proporciona instrucciones detalladas para desplegar la aplicación SICREP en un servidor de producción.

## 1. Requisitos Previos

Asegúrese de que el servidor de despliegue tenga los siguientes componentes instalados:

-   **Node.js** (versión 18.x o superior)
-   **npm** (o un gestor de paquetes compatible como pnpm o yarn)
-   **PostgreSQL** (versión 14 o superior) como base de datos
-   **Nginx** (o cualquier otro servidor web para actuar como proxy inverso)
-   **Git** para clonar el repositorio

## 2. Configuración del Entorno

1.  **Clonar el Repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO>
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Cree un archivo `.env` en la raíz del proyecto. Este archivo **no debe** ser versionado en Git.

    ```dotenv
    # URL de conexión a la base de datos PostgreSQL
    DATABASE_URL="postgresql://<usuario>:<contraseña>@<host>:<puerto>/<nombre_db>"

    # Secreto para la sesión de Express. Debe ser una cadena larga y aleatoria.
    SESSION_SECRET="<TU_SECRETO_DE_SESION_AQUI>"

    # Puerto en el que se ejecutará la aplicación Node.js
    PORT="5000"

    # Dominio principal para la generación de URLs (ej. para códigos QR)
    # En desarrollo puede ser una URL de Replit, en producción debe ser el dominio final.
    REPLIT_DEV_DOMAIN="https://tu-dominio.com"

    # Entorno de Node.js
    NODE_ENV="production"
    ```

4.  **Aplicar Migraciones de la Base de Datos:**
    Asegúrese de que el esquema de la base de datos esté actualizado.
    ```bash
    npx drizzle-kit push
    ```

## 3. Proceso de Construcción (Build)

El siguiente comando compilará el frontend de React (con Vite) y el backend de Express (con esbuild) y colocará los artefactos en el directorio `dist/`.

```bash
npm run build
```

Este comando ejecuta dos pasos:
1.  `vite build`: Compila el cliente de React y lo coloca en `dist/client`.
2.  `esbuild server/index.ts ...`: Compila el servidor de Express y lo coloca en `dist/index.js`.

## 4. Ejecución de la Aplicación

Una vez que la aplicación ha sido construida, puede iniciarla con el siguiente comando:

```bash
npm start
```

Este comando ejecuta `node dist/index.js` en modo de producción. Para asegurar que la aplicación se mantenga en ejecución, se recomienda usar un gestor de procesos como **PM2**.

### Usando PM2 (Recomendado)

1.  **Instalar PM2 globalmente:**
    ```bash
    npm install pm2 -g
    ```

2.  **Iniciar la aplicación con PM2:**
    ```bash
    pm2 start dist/index.js --name "sicrep-app"
    ```

3.  **Guardar la configuración de PM2 para reinicios del servidor:**
    ```bash
    pm2 save
    pm2 startup
    ```

## 5. Configuración de Nginx como Proxy Inverso

Es una buena práctica no exponer la aplicación Node.js directamente a internet. En su lugar, use Nginx para reenviar el tráfico del puerto 80 (HTTP) y 443 (HTTPS) al puerto en el que se ejecuta la aplicación (definido en `PORT`, ej. 5000).

1.  **Crear un archivo de configuración para Nginx:**
    ```bash
    sudo nano /etc/nginx/sites-available/sicrep
    ```

2.  **Añadir la siguiente configuración:**
    Reemplace `tu-dominio.com` con su dominio real.

    ```nginx
    server {
        listen 80;
        server_name tu-dominio.com;

        location / {
            proxy_pass http://localhost:5000; # Asegúrese de que el puerto coincida con su variable PORT
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

3.  **Habilitar el sitio y reiniciar Nginx:**
    ```bash
    sudo ln -s /etc/nginx/sites-available/sicrep /etc/nginx/sites-enabled/
    sudo nginx -t # Para probar la configuración
    sudo systemctl restart nginx
    ```

4.  **(Opcional pero Recomendado) Configurar HTTPS con Let's Encrypt:**
    Use `certbot` para obtener e instalar un certificado SSL gratuito.
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d tu-dominio.com
    ```
    Certbot modificará automáticamente su configuración de Nginx para manejar el tráfico HTTPS.

## 6. Resumen del Proceso de Despliegue

1.  Clonar el repositorio.
2.  Instalar dependencias (`npm install`).
3.  Configurar el archivo `.env`.
4.  Aplicar migraciones (`npx drizzle-kit push`).
5.  Construir el proyecto (`npm run build`).
6.  Iniciar la aplicación con PM2 (`pm2 start ...`).
7.  Configurar Nginx como proxy inverso.
8.  (Opcional) Configurar HTTPS con Certbot.

---
© 2025 SICREP
