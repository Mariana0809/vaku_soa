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

---
#  🔐Autenticación con Facebook, GitHub y Google

Acontinuación se explica como se realiza la autenticación desde el **Frontend** utilizando componentes separados para cada proveedor de autenticación: **Facebook**, **GitHub** y **Google**. Todos estos componentes son importados dentro del componente principal: `login-employee`.

---

### 🛠️ Crear los componentes de autenticación

Desde la terminal, creamos tres componentes distintos:

```bash
ng generate component auth-facebook
ng generate component auth-github
ng generate component auth-google

```
📁 `src/app/`  
│  
├── `auth-google/`  
├── `auth-github/`  
├── `auth-facebook/` 

---

## ¿Qué hace cada componente?

Cada componente muestra un botón visual en su HTML, al hacer clic, llama a un método del `AuthService` correspondiente al proveedor (Google, GitHub o Facebook).  
Si el inicio de sesión es exitoso, el usuario es redirigido a la ruta `/home`.

### 🌐 Iniciar sesión con Google

### 🔹 `auth-google.component.ts`


- En el HTML se muestra un botón de "Iniciar sesión con Google".
- Al hacer clic en el botón, se ejecuta el método `loginWithGoogle()`:

  ```ts
  this.authService.loginWithGoogle()
  ```

Este método se conecta con Firebase para autenticar al usuario mediante su cuenta de Google.Si la autenticación es exitosa, se navega automáticamente a `/home`usando:

```ts
    this.router.navigate(['/home']);
```

### 🌐 Iniciar sesión con GitHub

### 🔹 `auth-github.component.ts`

- En el HTML se muestra un botón de "Iniciar sesión con GitHub".
- Al hacer clic en el botón, se ejecuta el método `loginWithGithub()`:

  ```ts
  this.authService.loginWithGithub()
  ```

Este método se conecta con Firebase y abre una ventana emergente de GitHub (OAuth).Si la autenticación es exitosa, se navega automáticamente a `/home`usando:

```ts
    this.router.navigate(['/home']);
```

### 🌐 Iniciar sesión con Facebook

### 🔹 `auth-facebook.component.ts`

- En el HTML se muestra un botón de "Iniciar sesión con Facebook".
- Al hacer clic en el botón, se ejecuta el método `this.authService.loginWithFacebook()`:

  ```ts
  this.authService.loginWithFacebook()
  ```

Este método se conecta con Firebase y abre el flujo de autenticación de Facebook.
Una vez completado con éxito, se redirige al usuario a `/home`:

```ts
    this.router.navigate(['/home']);
```

---

## ¿Dónde se integran?

📄 `login-employee.component.html`  
Aquí se insertan los tres componentes para que el usuario elija con qué autenticarse:

```html
<!-- inicio de sesión con Google, Facebook y GitHub -->
<div class="w-full flex items-center mt-6 justify-center">
    <app-auth-google></app-auth-google>
    <app-auth-github></app-auth-github>
    <app-auth-facebook></app-auth-facebook>
</div>
```


# 📘 CRUD de Gestión de Empleados

Permite gestionar empleados mediante un formulario de creación, una tabla de listado, opciones de edición mediante modal y eliminación de registros, todo integrado con **Angular** y **Firebase Firestore**.


## 📂 Estructura

- `CreateUserComponent` — Componente para crear empleados.
- `ListUserComponent` — Componente para listar, editar y eliminar empleados.
- Firebase Firestore — Base de datos NoSQL para persistencia.


## 🧾 Formulario de Creación

 📍 Ubicación: `create-user.component.html`
 

### 🧠 Funcionalidad

- Registro de datos personales y profesionales del empleado.
- Validación de campos requeridos, correo válido, teléfono válido y fecha de nacimiento no futura.
- Verificación de unicidad del correo antes de guardar.

### 🛠 Campos Incluidos

| Campo               | Tipo     | Validación                         |
|---------------------|----------|------------------------------------|
| Nombres             | Texto    | Requerido                          |
| Apellidos           | Texto    | Requerido                          |
| Documento           | Texto    | Requerido                          |
| Teléfono            | Numérico | 7-15 dígitos                        |
| Correo              | Email    | Formato válido                     |
| Dirección           | Texto    | Requerido                          |
| Fecha de nacimiento | Fecha    | No puede ser futura                |
| Rol                 | Select   | Enfermero / Jefe de enfermería     |
| Sexo                | Select   | Masculino / Femenino               |
| Contraseña          | Password | Requerido                          |

### 🧩 Lógica Principal (`create-user.component.ts`)

- `onSubmit()` — Maneja el envío del formulario con validaciones.
- `validarCorreoYCrearEmpleado()` — Consulta Firestore para evitar duplicidad de correo.
- `isValidEmail()` y `isValidPhone()` — Métodos auxiliares para validar formatos.

---

## 📋 Listado de Empleados

📍 Ubicación: `list-user.component.html`

### 💡 Características

- Muestra una tabla con los empleados.
- Botones para editar o eliminar registros.

| Columna    | Contenido                      |
|------------|--------------------------------|
| Nombre     | Nombre completo del empleado   |
| Documento  | Número de documento            |
| Rol        | Cargo del empleado             |
| Teléfono   | Número de contacto             |
| Acciones   | Editar / Eliminar              |

---

## 📝 Edición de Empleado (Modal)

### 🌐 Modal Desplegable

Se muestra al presionar el botón "Editar".

### ✏ Campos Editables

- Rol
- Correo
- Teléfono
- Dirección

### 🔐 Validaciones

Todos los campos son requeridos y deben contener texto válido.

### 🔧 Métodos en `list-user.component.ts`

- `abrirModal(empleado)` — Carga los datos en el modal.
- `cerrarModal()` — Cierra y limpia el modal.
- `guardarCambios()` — Valida y actualiza los datos en Firestore.
- `eliminarEmpleado(id)` — Solicita confirmación y elimina el documento.

---

## 🧰 Dependencias

- `@angular/forms`
- `@angular/fire`

---

## 🧪 Validaciones Aplicadas

- Validación de campos vacíos.
- Validación de email y teléfono.
- Validación de fecha de nacimiento.
- Validación de unicidad del correo en Firestore.
