# API - Serverless Framework

Servicio serverless que consume SWAPI

**Requerimientos**

- Servicio de obtener todos los planetas.
- Servicio de obtener el planeta por id.
- Servicio para crear un planeta.
- Servicio de obtener los planetas de SWAPI por medio de paginas.
- Servicio de obtener los planetas de SWAPI por id.

### Pasos iniciales

Instalar dependencias:

```
npm install || npm i
```

Establecer con que implementacion de database se va a trabajar:

```typescript
const planetRepository = await DynamoDBPlanetRepository.create(); // DynamoDB
const planetRepository = await MysqlPlanetRepository.create(); // Mysql
```

En caso de usar Mysql, se debe crear la base de datos y las tabla:

```sql
CREATE DATABASE 'core';
CREATE TABLE `planets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(10) NOT NULL DEFAULT 'active',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edited` timestamp NULL DEFAULT NULL,
  `deleted` char(1) NOT NULL DEFAULT '0',
  `rotation_period` varchar(255) NOT NULL,
  `orbital_period` varchar(255) NOT NULL,
  `diameter` varchar(255) NOT NULL,
  `climate` varchar(255) NOT NULL,
  `gravity` varchar(255) NOT NULL,
  `terrain` varchar(255) NOT NULL,
  `surface_water` varchar(255) NOT NULL,
  `population` varchar(255) NOT NULL,
  `residents` text NOT NULL,
  `films` text NOT NULL,
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);
```

### Desarrollo en ambiente dev

Para hacer el deploy:

```bash
npm run deploy:dev
```

y para eliminar el despliegue:

```bash
npm run remove:dev
```

### Testing

Para ejecutar los test:

```bash
npm run test
```

### Acciones de mejora

- Implementar un sistema de cache para las peticiones de swapi y la base de datos.
- Implementar migraciones para la base de datos.

### Documentacion

- Se puede encontrar la documentacion de la API en el archivo [swagger.yml](SWAGGER)
