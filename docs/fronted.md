#  💻  Frontend

Este proyecto ha sido desarrollado utilizando **Angular CLI** versión `19.1.8`.

---

## 📌 Creación del Proyecto

Para crear el proyecto en Angular, ejecuta el siguiente comando en la terminal:

```sh
ng new vaku_soa
```

Luego, accede a la carpeta del proyecto:

```sh
cd vaku_soa
```

Una vez dentro del proyecto, ya puedes iniciar el servidor.

---

## ▶️ Iniciar Servidor

Para iniciar el servidor de desarrollo local, ejecuta:

```sh
ng serve
```

Cuando el servidor esté corriendo, abre tu navegador y ve a **[http://localhost:4200/](http://localhost:4200/)**. 

📌 La aplicación se actualizará automáticamente cada vez que hagas cambios en los archivos del proyecto.

---

## 🛠️ Creación de Componentes

Después de iniciar el servidor, puedes generar los componentes necesarios. Por ejemplo, para los componentes de login (*Login-children* y *Login-employee*), usa:

```sh
ng generate component Login-children
ng generate component Login-employee
```

---

## 📌 Tecnologías Utilizadas

✅ **Framework:** Angular

✅ **Framework de Estilos:** Tailwind CSS (v4.0)

✅ **IDE:** Visual Studio Code (VS Code)

---

## 📂 Estructura del Proyecto

```
📁 vaku_soa
├── 📁 .vscode
│   ├── extensions.json
│   ├── launch.json
│   ├── tasks.json
│
├── 📁 docs
│   ├── backend.md
│
├── 📁 public
│   ├── favicon.ico
│
├── 📁 src
│   ├── 📁 app
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── 📁 component
│   │   │   ├── 📁 login-children
│   │   │   │   ├── login-children.component.ts
│   │   │   │   ├── login-children.component.html
│   │   │   │   ├── login-children.component.css
│   │   │   ├── 📁 login-employee
│   │   │   │   ├── login-employee.component.ts
│   │   │   │   ├── login-employee.component.html
│   │   │   │   ├── login-employee.component.css
│
├── 📁 assets
│   ├── 📁 img
│   │   ├── 8817508.webp
│   │   ├── 8817512.webp
│
├── index.html
├── styles.css
├── angular.json
├── package.json
└── README.md
```

📌 Esta estructura muestra los archivos más importantes del proyecto.

---

📢 **¡Listo!** Con esto ya se tiene el entorno configurado y listo para trabajar con Angular 🚀
