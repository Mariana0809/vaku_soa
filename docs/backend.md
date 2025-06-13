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


# Historial de Acceso en Firestore

## ¿Qué es el historial de acceso?

El historial de acceso es una colección en Firestore llamada `historial_de_acceso` donde se almacena un registro cada vez que un usuario inicia sesión en el sistema, sin importar el método de autenticación (correo/contraseña, Google, Facebook, GitHub, etc.).

## ¿Qué datos se guardan?

Por cada acceso exitoso, se guarda un documento con la siguiente información:

- **uid**: Identificador único del usuario en Firebase Authentication.
- **email**: Correo electrónico del usuario. Si no está disponible, se guarda como `"No disponible"`.
- **displayName**: Nombre visible del usuario. Si no está disponible, se guarda como `"No disponible"`.
- **photoURL**: URL de la foto de perfil del usuario (si existe).
- **provider**: Método de autenticación usado (`google`, `facebook`, `github`, `email`, etc.).
- **fechaAcceso**: Fecha y hora exacta del acceso, usando `serverTimestamp()` de Firestore (hora del servidor, no del cliente).

## ¿Cómo funciona?

1. **Después de cada login exitoso**, se llama al método `guardarHistorialAcceso`.
2. Este método construye un objeto con los datos del usuario y el método de autenticación.
3. Si el email o el nombre no están disponibles, se guarda el texto `"No disponible"`.
4. El registro se guarda en la colección `historial_de_acceso` usando `addDoc`, lo que garantiza que nunca se sobrescriben registros (se permiten duplicados).
5. Si ocurre un error al guardar, se muestra un mensaje en consola y un alert, pero el login no se ve afectado.

## Ejemplo de documento en Firestore

```json
{
  "uid": "abc123xyz",
  "email": "usuario@ejemplo.com",
  "displayName": "Juan Pérez",
  "photoURL": "https://...",
  "provider": "google",
  "fechaAcceso": "2024-06-13T18:00:00.000Z"
}  
```


# 📄 Filtros - Historial de Acceso

## Descripción General

A continuación se detallan todos los filtros aplicados en el componente `AccessHistoryComponent` para visualizar el historial de accesos de usuarios.

---

## 1. 🔍 Filtro por Correo Electrónico

### Objetivo
Permitir la búsqueda de registros cuyo campo `email` contenga una cadena de texto especificada por el usuario.

### Funcionamiento
- La búsqueda es **insensible a mayúsculas y minúsculas**.
- Se aplica sobre el array completo `listAccess`.
- Si el campo de búsqueda está vacío, no se aplica filtro.

### Código

```typescript
if (this.searchEmail.trim() !== '') {
  filtered = filtered.filter((access) =>
    access.email.toLowerCase().includes(this.searchEmail.toLowerCase())
  );
}
```

### Entrada esperada
- Texto ingresado en el campo de búsqueda.

### Resultado
- Lista de registros cuyo campo `email` contiene el texto buscado.

---

## 2. 🔍 Filtro por Proveedor de Autenticación

### Objetivo
Filtrar los registros de acceso según el proveedor de autenticación seleccionado (por ejemplo: `google`, `facebook`, etc.).

### Funcionamiento
- El filtro se aplica solo si el usuario selecciona un proveedor distinto de "Todos".
- Los proveedores disponibles son calculados dinámicamente desde los datos cargados.

### Código

```typescript
if (this.filterProvider !== '') {
  filtered = filtered.filter(
    (access) => access.provider === this.filterProvider
  );
}
```

### Entrada esperada
- Valor seleccionado en el campo `select` de proveedores.

### Resultado
- Lista de registros cuyo campo `provider` coincide con la opción seleccionada.

---

## 3. 📅 Filtro por Rango de Fechas

### Objetivo
Mostrar solo los registros cuya fecha de acceso (`fechaAcceso`) se encuentra entre dos fechas especificadas por el usuario.

### Funcionamiento
- Si ambas fechas (`startDate` y `endDate`) están definidas, el filtro se aplica.
- La hora de la fecha final se ajusta a 23:59:59 para incluir todo el día.
- Si alguna fecha está vacía, el filtro no se aplica.

### Código

```typescript
if (this.startDate && this.endDate) {
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  end.setHours(23, 59, 59, 999);

  filtered = filtered.filter((access) => {
    const accessDate = access.fechaAcceso?.toDate();
    return accessDate >= start && accessDate <= end;
  });
}
```

### Entrada esperada
- Fecha de inicio (`startDate`).
- Fecha de fin (`endDate`).

### Resultado
- Lista de registros cuya `fechaAcceso` está en el rango especificado.

---

## 4. 🔄 Ordenamiento por Fecha de Acceso

### Objetivo
Ordenar los registros por la fecha de acceso (`fechaAcceso`) en orden ascendente o descendente según selección del usuario.

### Funcionamiento
- Si la opción seleccionada es `'asc'`, se ordenan de más antiguo a más reciente.
- Si la opción seleccionada es `'desc'`, se ordenan de más reciente a más antiguo.

### Código

```typescript
filtered = filtered.sort((a, b) => {
  const dateA = a.fechaAcceso?.toDate();
  const dateB = b.fechaAcceso?.toDate();

  if (!dateA || !dateB) return 0;

  return this.sortOrder === 'asc'
    ? dateA.getTime() - dateB.getTime()
    : dateB.getTime() - dateA.getTime();
});
```

### Entrada esperada
- Valor `'asc'` o `'desc'` del campo `sortOrder`.

### Resultado
- Lista ordenada según la fecha de acceso.
