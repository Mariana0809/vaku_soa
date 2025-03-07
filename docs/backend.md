# Vaku Backend

Este proyecto es el backend para la aplicación **Vaku**, desarrollada con **Spring Boot** y usando tecnologías como **PostgreSQL**, **Redis**, **JWT** y **Docker**. A continuación, se detallan los pasos necesarios para instalar y ejecutar el backend.

## Tecnologías

- **Lenguaje**: Java
- **Framework**: Spring Boot 3.4.3
- **Base de Datos**: PostgreSQL 17
- **Cache**: Redis 7.4
- **Contenedores**: Docker 27
- **Autenticación**: JWT 4.5.0
- **Construcción del Proyecto**: Gradle 7.6
- **JDK**: Java 23
- **IDE recomendado**: IntelliJ IDEA

## Requisitos previos

1. **Docker**: Asegúrate de tener Docker instalado en tu máquina. Puedes descargarlo desde [Docker](https://www.docker.com/get-started).
2. **PostgreSQL y Redis**: Las imágenes de Docker para PostgreSQL y Redis se descargan y se configuran automáticamente al ejecutar los contenedores.
3. **Java**: Es necesario tener instalado Java 23. Puedes descargarlo desde [AdoptOpenJDK](https://adoptopenjdk.net/).
4. **IDE**: Usamos IntelliJ IDEA para el desarrollo, pero puedes utilizar cualquier otro IDE compatible con Java.

## Pasos de Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/NelsonZarazaDev/Vaku_Backend.git
   cd Vaku_Backend

## Configuración de Docker

Asegúrate de tener **Docker Desktop** instalado en tu máquina. Puedes descargarlo desde el siguiente enlace:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

Una vez que hayas instalado Docker Desktop, sigue estos pasos para descargar las imágenes de **PostgreSQL** y **Redis** y ejecutar los contenedores:

1. **Descargar las imágenes manualmente**: Abre tu terminal y ejecuta los siguientes comandos para descargar las imágenes de **PostgreSQL** y **Redis**:

   ```bash
   docker pull postgres
   docker pull redis

## Ejecución del Contenedor con Docker Compose

Si has descargado las imágenes de **PostgreSQL** y **Redis** manualmente, puedes utilizar `docker-compose` para levantar ambos contenedores de manera automática. Aquí te explico cómo hacerlo.

### 1. Ejecutar los contenedores con Docker Compose

Desde la raíz de tu proyecto, asegúrate de que **Docker Desktop** esté corriendo y ejecuta el siguiente comando en tu terminal para levantar los contenedores:

    
    docker-compose up


## Estructura del Proyecto

La estructura del proyecto es la siguiente:

└── 📁Vaku 
    └── 📁dataBase # Archivos para la creación de la base de datos y datos iniciales. 
        ├── Citys.csv 
        ├── create_schema.sql # Script para crear la base de datos y las tablas. 
        ├── Departments.csv 
        ├── Inventories.csv 
        ├── InventoriesEmployees.csv 
        ├── Vaccinnes.csv 
    └── 📁gradle # Archivos relacionados con Gradle. 
        └── 📁wrapper 
        ├── gradle-wrapper.jar 
            └── gradle-wrapper.properties 
            └── 📁src 
                └── 📁main 
                    └── 📁java 
                        └── 📁com 
                            └── 📁Vaku 
                                └── 📁Vaku     
                                    └── 📁apiRest 
                                        └── 📁controller # Controladores REST para la API. 
                                        └── 📁model # Clases que representan las entidades. 
                                        └── 📁repository # Interfaces para interactuar con la base de datos. 
                                        └── 📁service # Lógica de negocio. 
                                    └── 📁utils # Utilidades, como generadores de tokens JWT y constantes. 
                                        └── VakuApplication.java # Clase principal de Spring Boot. 
                                    └── 📁resources 
                                        └── application.properties # Configuraciones de la aplicación. 


## Descripción de las carpetas clave

- **`apiRest`**: Contiene todos los controladores (REST), modelos, repositorios y servicios que componen la API.
  - **controller**: Define los puntos finales de la API.
  - **model**: Contiene las entidades del sistema y las clases de respuesta que el frontend usará.
  - **repository**: Interfaces que extienden de JPA para interactuar con la base de datos.
  - **service**: Contiene la lógica de negocio que es utilizada por los controladores.

- **`utils`**: Aquí se encuentran las clases que proporcionan funcionalidades auxiliares. Un ejemplo es `GenerateToken.java`, que genera tokens JWT para la autenticación.

- **`dataBase`**: Contiene los archivos relacionados con la base de datos. Esto incluye archivos CSV con datos iniciales y el script `create_schema.sql` para crear la base de datos y las tablas necesarias.

## Autenticación JWT

Este backend usa **JWT (JSON Web Token)** para manejar la autenticación de usuarios. El archivo `GenerateToken.java` en la carpeta `utils` es responsable de generar los tokens. Este token se utiliza en las solicitudes HTTP para verificar la identidad del usuario.
