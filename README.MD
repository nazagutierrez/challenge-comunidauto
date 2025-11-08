# Challenge Comunidauto

Este repositorio contiene la prueba técnica realizada para un puesto en Comunidatuo, se trata de una aplicación de visualización de vehículos conectado a una base de datos.

## Tecnologías

- React - TypeScript - Node.js  - Express.js - Vite - Tailwind CSS - Axios - MySQL.

## Features

- Diseño estético y responsive.  
- Conectado a mi propia base de datos.  
- Componentización y reutilización de componentes.  
- Código claro y carpetas bien distribuidas.

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/nazagutierrez/challenge-comunidauto.git
cd challenge-comunidauto
```

2. Instalar dependencias:
```bash
cd /client
pnpm install

cd /server
pnpm install
```

## Configuración de la Base de Datos

1. Importar el archivo `dbComunidauto.sql` en tu editor de MySQL (Contiene creación de db e inserts).
2. Configurar las credenciales de la base de datos en el archivo de configuración:
   - Copiar el archivo `.env.example` a `.env`
   - Modificar las variables de entorno con tus credenciales:
```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_datos
SV_PORT=2222
DB_PORT=1111
```

## Estructura del Proyecto

```
challenge-comunidauto/
├── client/
│   ├── src/
│       ├── pages/            # Rutas de la aplicación
│       ├── components/       # Componentes de la aplicación
│       ├── types/            # Tipos de datos
│       ├── App.tsx           # Archivo inicial utilizado como enrutador
├── server/
│   ├── db.js                 # Configuración de la base de datos
│   ├── index.js              # Servidor y rutas principales
│   └── .env                  # Variables de entorno
└── README.md                 
```

## Uso

1. Iniciar el servidor:
Abrir 2 terminales y ejecutar los siguientes comandos:

```bash
Terminal 1:
cd /client
pnpm run dev
```

```bash
Terminal 2:
cd /server
pnpm run dev
```

2. El servidor estará disponible en `http://localhost:3000` y la aplicación en `http://localhost:5173`

## Consultas de Práctica

En el archivo `consultasDeComunidauto.sql` encontrarás las consultas SQL que habian sido requeridas para el challenge.

## 🖼️ Capturas de pantalla

<p align="center">
  <img src="/client/public/screenshots/comunidauto-screenshot.png" alt="Home" width="100%" />
</p>

<p align="center">
  <img src="/client/public/screenshots/comunidauto-screenshot.png-2" alt="Cars" width="100%" />
</p>
