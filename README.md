# 🚀 Portfolio MERN Stack - Escalable

Portfolio profesional para desarrolladores web con panel de administración completo. **Arquitectura escalable** diseñada para crecer contigo.

## 🔐 Credenciales de Acceso

```
📧 Email:    admin@david.com
🔑 Password: admin123
🌐 URL:      http://localhost:5173/admin
```

---

## 📁 Estructura del Proyecto

```
portfolio-mern/
├── client/                          # Frontend React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/                  # 🧩 Componentes reutilizables
│   │   │       └── index.js         # Button, Card, Modal, Input, etc.
│   │   ├── config/
│   │   │   └── constants.js         # ⚙️ Configuración central
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Autenticación
│   │   ├── hooks/
│   │   │   └── index.js             # 🪝 Hooks personalizados
│   │   ├── layouts/                 # Layouts reutilizables
│   │   ├── pages/                   # Páginas
│   │   │   ├── Home.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   └── admin/               # Panel de administración
│   │   └── services/
│   │       └── api.js               # 📡 Servicios API centralizados
│   └── ...
│
├── server/                          # Backend Node.js + Express
│   ├── config/
│   │   └── constants.js             # ⚙️ Configuración central
│   ├── middleware/
│   │   └── auth.js                  # Autenticación JWT
│   ├── models/                      # 📊 Modelos MongoDB
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Experience.js            # 💼 Experiencia laboral
│   │   ├── Education.js             # 🎓 Educación
│   │   ├── Certification.js         # 📜 Certificaciones
│   │   ├── Testimonial.js           # 💬 Testimonios
│   │   ├── Message.js
│   │   └── Settings.js              # ⚙️ Configuración del sitio
│   ├── routes/                      # Rutas API
│   ├── seeders/
│   │   └── seed.js                  # Inicializador BD
│   └── uploads/                     # Archivos subidos
└── ...
```

---

## 🎯 Características de Escalabilidad

### ➕ Añadir Nueva Categoría de Habilidad

**1. En el servidor** (`server/config/constants.js`):
```javascript
const SKILL_CATEGORIES = {
  // ... existentes ...
  ai: {
    name: 'Inteligencia Artificial',
    icon: 'FaBrain',
    color: 'rose',
    order: 10
  }
};
```

**2. En el cliente** (`client/src/config/constants.js`):
```javascript
import { FaBrain } from 'react-icons/fa';

export const SKILL_CATEGORIES = {
  // ... existentes ...
  ai: {
    name: 'Inteligencia Artificial',
    icon: FaBrain,
    color: 'rose',
    bgColor: 'bg-rose-500/20',
    textColor: 'text-rose-400'
  }
};
```

### ➕ Añadir Nueva Red Social

En `server/config/constants.js` y `client/src/config/constants.js`:
```javascript
SOCIAL_PLATFORMS: {
  // ... existentes ...
  threads: {
    name: 'Threads',
    icon: 'FaThreads',
    color: '#000000'
  }
}
```

### ➕ Añadir Nueva Sección al Portfolio

1. Crear el modelo en `server/models/`
2. Crear las rutas en `server/routes/`
3. Registrar en `server/server.js`
4. Añadir el servicio en `client/src/services/api.js`
5. Crear el componente de sección
6. Añadir a `PORTFOLIO_SECTIONS` en constants

---

## 🛠️ Tecnologías

### Frontend
| Tecnología | Uso |
|------------|-----|
| React 18 + Vite | Framework & Bundler |
| React Router 6 | Navegación SPA |
| Tailwind CSS | Estilos |
| Axios | Cliente HTTP |
| React Hot Toast | Notificaciones |

### Backend
| Tecnología | Uso |
|------------|-----|
| Node.js + Express | Servidor |
| MongoDB + Mongoose | Base de datos |
| JWT | Autenticación |
| Multer | Subida de archivos |

---

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm run install-all

# 2. Configurar variables de entorno
cp server/.env.example server/.env
# Editar server/.env con tu configuración

# 3. Inicializar base de datos
cd server && npm run seed && cd ..

# 4. Ejecutar en desarrollo
npm run dev
```

**URLs:**
- 🌐 Frontend: http://localhost:5173
- 🔧 API: http://localhost:5000/api
- 🔐 Admin: http://localhost:5173/admin

---

## 📊 Modelos de Datos

### Perfil
- Información personal, bio, avatar
- Redes sociales (dinámicas)
- Estadísticas personalizables
- Servicios ofrecidos

### Proyectos
- Título, descripción, imagen
- Tecnologías usadas (array)
- Categoría (configurable)
- Estado (completado, en progreso, etc.)
- URLs (GitHub, demo)
- Destacado / Activo

### Habilidades
- Nombre, categoría, icono
- Nivel de dominio (0-100)
- Orden personalizable
- Activo / Inactivo

### Experiencia Laboral
- Empresa, puesto, ubicación
- Tipo (remoto, presencial, híbrido)
- Fechas inicio/fin
- Logros y tecnologías

### Certificaciones
- Nombre, emisor, fecha
- URL de credencial
- Categoría
- Imagen del certificado

### Testimonios
- Cliente, empresa, puesto
- Contenido, rating
- Proyecto relacionado

---

## 🧩 Componentes UI Reutilizables

```jsx
import { Button, Input, Card, Modal, Badge, Spinner } from '@/components/ui';

// Botón con variantes
<Button variant="primary" loading={isLoading}>Guardar</Button>
<Button variant="danger" icon={FaTrash}>Eliminar</Button>

// Input con validación
<Input label="Email" error={errors.email} icon={FaEnvelope} />

// Cards
<Card hover padding>Contenido</Card>

// Modal
<Modal isOpen={show} onClose={close} title="Editar" size="lg">
  {children}
</Modal>

// Badge
<Badge variant="success">Activo</Badge>
```

---

## 🪝 Hooks Personalizados

```jsx
import { 
  useLocalStorage,    // Persistencia local
  useDebounce,        // Debounce para búsquedas
  useScrollPosition,  // Posición del scroll
  useWindowSize,      // Responsive
  useForm,            // Manejo de formularios
  useAsync            // Operaciones asíncronas
} from '@/hooks';

// Ejemplo
const { isScrolled, scrollDirection } = useScrollPosition();
const { isMobile, isDesktop } = useWindowSize();
const [theme, setTheme] = useLocalStorage('theme', 'dark');
```

---

## 📡 API Endpoints

| Recurso | Endpoints |
|---------|-----------|
| Auth | `POST /login`, `GET /me`, `PUT /password` |
| Profile | `GET /`, `PUT /`, `POST /avatar` |
| Projects | `GET /`, `POST /`, `PUT /:id`, `DELETE /:id` |
| Skills | `GET /`, `POST /`, `PUT /:id`, `DELETE /:id` |
| Experience | `GET /`, `POST /`, `PUT /:id`, `DELETE /:id` |
| Certifications | `GET /`, `POST /`, `PUT /:id`, `DELETE /:id` |
| Messages | `GET /`, `POST /`, `PUT /:id/read`, `DELETE /:id` |
| Settings | `GET /`, `PUT /`, `PUT /sections`, `PUT /theme` |

---

## 🎨 Personalización del Tema

En `Settings` puedes configurar:
- Colores primarios y secundarios
- Secciones visibles y su orden
- Modo oscuro/claro
- SEO y analytics
- Integraciones (Calendly, etc.)

---

## 📝 Roadmap de Mejoras

- [ ] Soporte multi-idioma (i18n)
- [ ] Modo claro/oscuro toggle
- [ ] Blog integrado
- [ ] Analytics dashboard
- [ ] Exportar CV en PDF
- [ ] PWA support
- [ ] Animaciones con Framer Motion
- [ ] Tests con Jest/Vitest

---

## 📄 Licencia

MIT License - Siéntete libre de usar y modificar este proyecto.

---

Desarrollado con ❤️ y MERN Stack | **Diseñado para escalar contigo**
