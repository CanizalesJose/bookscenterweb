# BooksCenterWeb

### API
La API consiste en un servidor el cual se encarga de gestionar la base de datos a través de peticiones HTTP hacía rutas especificas dadas por la ruta `/api-docs`. En este documento queda fuera de tema del funcionamiento especifico, así como las tecnologías usadas para funcionar, pero es importante recalcar que la configuración del servidor, a pesar de ser sencilla, se debe tener un poco de conocimiento en arquitectura web.

### Aplicación web
Ahora bien, la API recibe peticiones y responde con datos. Estos datos luego son usados por la aplicación. La aplicación se comunica directamente con la API para gestionar de forma gráfica y amigable el sistema. Por lo que podríamos decir que la aplicación web es una especie de interfaz gráfica para la API.

## Tipo de Aplicación
Se trata de una `Single Page Application` (`SPA`). Con el uso de VueJS como framework para el desarrollo de la aplicación, hay un único documento HTML, al cual se le cargan distintos componentes por encima, eliminando y colocando nuevos según se interactúe con la lógica de interfaz.

Por otro lado, se usa el paradigma `JAMstack` (Javascript, API, Markup) donde el fontend esta compuesto por Javascript para la lógica de interfaz, junto con contenido estático y una API de arquitectura REST para la lógica de negocio.

## Requisitos Técnicos
A nivel del sistema:

- Node JS v20.15.0
- NPM v10.7.0

Node JS es un entorno de ejecución cuyo objetivo es permitir ejecutar código Javascript a nivel de servidor usando el mismo motor de un navegador. Esto posibilita cosas como la comunicación con bases de datos, peticiones HTTP o lectura y escritura de archivos locales.

NPM se trata del gestor de paquetes por defecto para Node JS. Permite la instalación de dependencias y el control de versiones.

A nivel de dependencias:
- core-js 3.8.3
- vue 3.2.13
- vue-router 4.4.5
- axios 1.7.7

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```