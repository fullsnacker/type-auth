# TypeAuth 🔒

**Sistema de autenticación por terminal con TypeScript y Clean Architecture**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Clean Architecture](https://img.shields.io/badge/Clean_Architecture-6DB33F?style=for-the-badge)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 🚀 Características principales

- ✅ Autenticación segura por terminal
- 🔐 Encriptación de contraseñas con bcrypt
- 🏗️ Implementa Clean Architecture
- 📁 Persistencia en archivo JSON (fácil migración a DB)
- ✨ Interfaz CLI interactiva con Inquirer.js
- 🛡️ Protección de credenciales

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/fullsnacker/type-auth.git
cd type-auth
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el proyecto:

```bash
npm start
```

O en modo desarrollo:

```bash
npm run dev
```

## 🛠️ Estructura del proyecto

```
src/
├── core/                    # Capa de dominio
│   ├── entities/            # Entidades de negocio
│   ├── repositories/        # Interfaces de repositorios
│   └── usecases/            # Casos de uso
├── infrastructure/          # Implementaciones concretas
│   ├── repositories/        # Repositorio basado en archivos
│   ├── cli/                 # Interfaz de línea de comandos
│   └── security/            # Utilidades de seguridad
└── application/             # Coordinadores
```

<!--
## 🎨 Capturas de pantalla

![Menú principal](docs/screenshots/main-menu.png)
_Menú principal interactivo_

![Registro de usuario](docs/screenshots/register.png)
_Proceso de registro_ -->

## 🧠 Clean Architecture

El proyecto sigue los principios de Clean Architecture:

```
Capa Externa → Infraestructura → Aplicación → Dominio ←
```

Las dependencias fluyen hacia el centro (dominio), manteniendo el negocio independiente de frameworks y detalles técnicos.

## 📝 Roadmap

- [x] Server express para manejar usuarios con endpoints
- [ ] Migración a base de datos SQL/NoSQL
- [ ] Implementación de JWT para sesiones
- [ ] Añadir sistema de roles
- [ ] Internacionalización (i18n)
- [ ] Logging avanzado

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor abre un issue primero para discutir los cambios propuestos.

1. Haz fork del proyecto
2. Crea tu branch (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Distribuido bajo la licencia MIT. Consulta `LICENSE` para más información.

---

Hecho con ❤️ por [Fullsnacker](https://fullsnacker.github.io)

---
