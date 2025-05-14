# TypeAuth 🔒

**Terminal Authentication System with TypeScript and Clean Architecture**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)  
[![Clean Architecture](https://img.shields.io/badge/Clean_Architecture-6DB33F?style=for-the-badge)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 🚀 Key Features

- ✅ Secure terminal authentication
- 🔐 Password encryption with bcrypt
- 🏗️ Clean Architecture implementation
- 📁 JSON file persistence (easy DB migration)
- ✨ Interactive CLI with Inquirer.js
- 🛡️ Credential protection

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/fullsnacker/type-auth.git
cd type-auth
```

2. Install dependencies:

```bash
npm install
```

3. Run the project:

```bash
npm start
```

Or in development mode:

```bash
npm run dev
```

## 🛠️ Project Structure

```
src/
├── core/                    # Domain layer
│   ├── entities/            # Business entities
│   ├── repositories/        # Repository interfaces
│   └── usecases/            # Use cases
├── infrastructure/          # Concrete implementations
│   ├── repositories/        # File-based repository
│   ├── cli/                 # Command line interface
│   └── security/            # Security utilities
└── application/             # Coordinators
```

<!-- ## 🎨 Screenshots

![Main Menu](docs/screenshots/main-menu.png)
_Interactive main menu_

![User Registration](docs/screenshots/register.png)
_Registration process_ -->

## � Clean Architecture

The project follows Clean Architecture principles:

```
Outer Layer → Infrastructure → Application → Domain ←
```

Dependencies flow inward (toward the domain), keeping business logic independent of frameworks and technical details.

## 📝 Roadmap

- [ ] Database migration (SQL/NoSQL)
- [ ] JWT session implementation
- [ ] Role-based system
- [ ] Internationalization (i18n)
- [ ] Advanced logging

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss proposed changes.

1. Fork the project
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ by [Fullsnacker](https://fullsnacker.github.io)

---
