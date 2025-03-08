
# Frontend

Para este proyecto se utilizo Angula CLI version 19.1.8


## Creación del proyecto

Para crear el Proyecto en Angular se ejecuta lo siguiente en la linea de comandos:

```sh
ng new vaku_soa
```

Luego se accede a la carpeta del proyecto:

```sh
cd vaku_soa
```
Ya dentro del proyecto se puede iniciar el Servidor.


## Iniciar Servidor

Para iniciar el servidor de desarrollo local se ejecuta el siguiente comando:

```sh
ng serve
```
Cuando el servidor esté corriendo, se abre el navegador y se dirige a http://localhost:4200/. La aplicación se actualizará automáticamente cada vez que se hagan cambios en los archivos del proyecto. 

## Creación de componentes

Luego de que el servidor esté funcionando, se generan los componentes que necesitamos,como ejemplo para el login tenemos (Login-children,Login-employee), esto con el siguiente comando:
```sh
ng generate component Login-children
ng generate component Login-employee

```

## Tecnologias utilizadas

**FrameWork:** El proyecto está desarrollado con Angular

**Framework de estilos:** Tailwind CSS(4.0)

**IDE:** Visual Studio Code (VS Code) 


## Rutas de carpetas

└── 📁vaku_soa
        └── COMMIT_EDITMSG
        └── config
        └── description
        └── HEAD
        └── 📁hooks
            └── applypatch-msg.sample
            └── commit-msg.sample
            └── fsmonitor-watchman.sample
            └── post-update.sample
            └── pre-applypatch.sample
            └── pre-commit.sample
            └── pre-merge-commit.sample
            └── pre-push.sample
            └── pre-rebase.sample
            └── pre-receive.sample
            └── prepare-commit-msg.sample
            └── push-to-checkout.sample
            └── sendemail-validate.sample
            └── update.sample
        └── index
        └── 📁info
            └── exclude
        └── 📁logs
            └── HEAD
            └── 📁refs
                └── 📁heads
                    └── master
                └── 📁remotes
                    └── 📁origin
                        └── HEAD
        └── 📁objects
            └── 📁info
            └── 📁pack
                └── pack-e457a5b86eb0f47a019570aeeba04b83ed6a1b8e.idx
                └── pack-e457a5b86eb0f47a019570aeeba04b83ed6a1b8e.pack
                └── pack-e457a5b86eb0f47a019570aeeba04b83ed6a1b8e.rev
        └── packed-refs
        └── 📁refs
            └── 📁heads
                └── master
                └── nelsondev
            └── 📁remotes
                └── 📁origin
                    └── HEAD
            └── 📁tags
    └── 📁.vscode
        └── extensions.json
        └── launch.json
        └── tasks.json
    └── 📁docs
        └── backend.md
    └── 📁public
        └── favicon.ico
    └── 📁src
        └── 📁app
            └── app.component.css
            └── app.component.html
            └── app.component.spec.ts
            └── app.component.ts
            └── app.config.server.ts
            └── app.config.ts
            └── app.routes.server.ts
            └── app.routes.ts
            └── 📁component
                └── 📁login-children
                    └── login-children.component.css
                    └── login-children.component.html
                    └── login-children.component.spec.ts
                    └── login-children.component.ts
                └── 📁login-employee
                    └── login-employee.component.css
                    └── login-employee.component.html
                    └── login-employee.component.spec.ts
                    └── login-employee.component.ts
        └── 📁assets
            └── 📁img
                └── 8817508.webp
                └── 8817512.webp
                └── 8817519.webp
                └── 8817523.webp
                └── Layer.webp
        └── index.html
        └── main.server.ts
        └── main.ts
        └── server.ts
        └── styles.css
    └── .editorconfig
    └── .gitignore
    └── .postcssrc.json
    └── angular.json
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.spec.json

