# Vaku Backend (Firebase)

Este proyecto es el backend de la aplicación **Vaku**, que ha sido migrado desde Spring Boot a **Firebase** para aprovechar una arquitectura serverless, integración con múltiples proveedores de autenticación y sincronización en tiempo real.

## Tecnologías

- **Plataforma Backend**: Firebase
- **Base de datos**: Firestore (NoSQL)
- **Autenticación**: Firebase Authentication (Email/Password, Google, Facebook, GitHub)
- **Almacenamiento**: Firebase Storage

## Requisitos previos

1. Tener instalado **Node.js** y **npm**:  
   [Node.js](https://nodejs.org/)

2. Tener la CLI de Firebase instalada globalmente:
   ```bash
   npm install -g firebase-tools


# Lógica de Login Social en Vaku

## Descripción general

En la aplicación **Vaku**, la autenticación con proveedores sociales (Google, Facebook, GitHub) se gestiona de forma centralizada a través de un servicio llamado `SocialLoginService`. Esto permite reutilizar la lógica de autenticación, manejar errores comunes y mejorar la experiencia de usuario.

---

## Componentes involucrados

### 1. `LoginEmployeeComponent`

- Componente principal de login que maneja:
  - Inicio de sesión con correo y contraseña.
  - Reset de contraseña.
- Importa los componentes sociales (`AuthGoogleComponent`, `AuthFacebookComponent`, `AuthGithubComponent`).
- Delegación de login social al servicio `SocialLoginService`.

### 2. `SocialLoginService`

- Servicio Angular singleton responsable de la lógica de login social.
- Método principal: `loginSocial(provider: any)` que:
  - Invoca el método de autenticación con Firebase para el proveedor recibido.
  - Maneja errores cuando el correo ya está registrado con otro método.
  - Solicita contraseña para vincular cuentas diferentes con el mismo correo.
  - Vincula el nuevo proveedor social al usuario existente para evitar duplicados.
  - Redirige a la pantalla principal tras login exitoso.

### 3. Componentes sociales (`AuthGoogleComponent`, `AuthFacebookComponent`, `AuthGithubComponent`)

- Componentes standalone que solo exponen la acción para iniciar sesión con el proveedor específico.
- Llaman a `SocialLoginService.loginSocial` pasando el proveedor correspondiente.
- Mantienen la lógica simple y reutilizable.

---

## Flujo de autenticación

1. Usuario selecciona un método social para iniciar sesión.
2. El componente social correspondiente llama a `SocialLoginService.loginSocial(proveedor)`.
3. El servicio intenta autenticar con Firebase.
4. Si el login es exitoso, navega a la página principal.
5. Si Firebase detecta que el correo está asociado a otro método:
   - Solicita contraseña al usuario para validar la cuenta con email.
   - Vincula el proveedor social al usuario existente.
6. Se manejan errores y se notifican al usuario adecuadamente.


# Documentación: Gestión de Empleados (CRUD)

Este conjunto de componentes Angular permite gestionar empleados en Firestore, incluyendo creación, listado, edición y eliminación.

---

## 1. Componente `CreateUserComponent` — Crear Empleado

### Funcionalidad

- Permite ingresar los datos de un nuevo empleado a través de un formulario.
- Valida:
  - Que ningún campo esté vacío.
  - Formato correcto de correo electrónico.
  - Teléfono numérico con 7 a 15 dígitos.
  - Fecha de nacimiento no futura.
  - Que el correo electrónico no exista ya en Firestore.
- Si las validaciones pasan, crea el nuevo empleado en la colección `empleados`.
- Limpia el formulario y muestra alertas de éxito o error.

### Campos del empleado

- `persNames`: Nombres
- `persLastNames`: Apellidos
- `persDocument`: Documento de identidad
- `persSex`: Sexo
- `persAddress`: Dirección
- `persDateBirth`: Fecha de nacimiento
- `persRole`: Rol o cargo
- `persEmail`: Correo electrónico
- `persPhone`: Teléfono

## 2. Componente `ListUserComponent` — Listar, Editar y Eliminar Empleados

### Funcionalidad

- Obtiene y muestra en tiempo real la lista de empleados desde Firestore.
- Permite eliminar un empleado con confirmación.
- Permite editar campos seleccionados (`persRole`, `persEmail`, `persPhone`, `persAddress`) mediante un modal.
- Valida que los campos obligatorios no estén vacíos antes de guardar los cambios.
- Muestra alertas para informar al usuario sobre el éxito o error de las acciones realizadas.

### Métodos principales

- `ngOnInit()`  
  Se suscribe a la colección `empleados` para obtener y actualizar en tiempo real la lista de empleados.

- `eliminarEmpleado(id: string)`  
  Solicita confirmación al usuario y elimina el empleado con el ID proporcionado en Firestore.

- `abrirModal(empleado: any)`  
  Abre el modal de edición y copia los datos del empleado seleccionado para modificar.

- `cerrarModal()`  
  Cierra el modal y limpia los datos temporales de edición.

- `guardarCambios()`  
  Valida los campos requeridos y actualiza el documento del empleado en Firestore con los cambios realizados.
