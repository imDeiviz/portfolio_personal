# 📕 Portfolio - Developer Documentation

> **INTERNAL USE ONLY**: Documentación técnica para desarrollo, mantenimiento y escalado del sistema.

---

## 🏗️ Arquitectura del Sistema

El proyecto opera como un **Monorepo Híbrido** (Lógico).
Contiene `client` (SPA) y `server` (API) en el mismo repositorio para facilitar la consistencia de tipos y despliegue unificado en etapas tempranas.

### Diagrama de Flujo de Datos

**Usuario Final**
`Browser` -> `React (Public Routes)` -> `Axios (GET)` -> `Express (Public Endpoints)` -> `MongoDB`

**Administrador**
`Browser` -> `React (Protected Routes)` -> `Axios (POST/PUT + Bearer Token)` -> `Express (Auth Middleware)` -> `Controller` -> `MongoDB`

---

## 📁 Estructura del Proyecto

### `/server` (Backend Node.js)
```bash
server/
├── config/             # Configs de DB (db.js) y variables
├── controllers/        # Lógica de negocio (ProjectController, AuthController)
├── middleware/         # Interceptores (protect.js, upload.js)
├── models/             # Schemas Mongoose (Strongly Typed)
├── routes/             # Definición de Endpoints API
├── seeders/            # Scripts de inicialización de datos (dummy data)
├── uploads/            # Storage local para imágenes (en dev)
└── server.js           # Entry point servidor
```

### `/client` (Frontend React)
```bash
client/
├── src/
│   ├── components/
│   │   ├── admin/      # UI específica de Dashboard (Tablas, Forms)
│   │   ├── home/       # UI específica de Landing (Hero, Grid)
│   │   └── shared/     # Componentes atómicos (Button, Input, Modal)
│   ├── context/        # Global State (AuthContext)
│   ├── hooks/          # Hooks de Lógica (useAuth, useFetch)
│   ├── services/       # Capa de API (axios instances)
│   ├── layouts/        # Layout Wrappers (AdminLayout vs MainLayout)
│   ├── pages/          # Vistas (Page Components)
│   └── utils/          # Helpers (formatDate, validators)
└── dist/               # Build de producción
```

---

## 🧱 Guía de Construcción (From Scratch)

### 1. Inicialización
```bash
# Configuración inicial del monorepo
npm init -y
# Instalar concurrently para correr ambos entornos
npm i concurrently -D
```

### 2. Backend Setup
**Stack**: Express, Mongoose, Dotenv, Cors.
**Decisión Técnica**: Uso de `MVC` (Model View Controller) para mantener el `server.js` limpio.
**Seeders**: Se creó `seed.js` para limpiar y repoblar la BD en un comando (`npm run seed`), crucial para testing rápido.

### 3. Frontend Setup
**Stack**: Vite + React + Tailwind.
**Decisión Técnica**: Uso de `Vite` sobre CRA por rendimiento (Esbuild).
**Estilos**: `Tailwind` configurado con prefijo o estructura base en `index.css` para colores semánticos (`--primary`, `--bg-dark`).

### 4. Base de Datos
**Schema Design**:
- `User`: Roles (admin), password (hashed).
- `Project`: Array de strings para tecnologías, imágenes.
- `Settings`: Singleton para configuración global del sitio.

---

## 🚦 Flujo de Autenticación Moderno

1.  **Login**: `POST /auth/login` -> devuelve `token` (JWT).
2.  **Storage**: Cliente guarda token en `localStorage` (o Cookie httpOnly en v2).
3.  **Hydration**: Al recargar la página, `AuthContext` lee el token y verifica validez con `GET /auth/me`.
    *   Si válido -> `isAuthenticated = true`.
    *   Si inválido/expirado -> `logout()` automático.

---

## 🚀 Producción

### Variables de Entorno (`.env`)
Requeridas para el funcionamiento en producción:

```env
# SERVER
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/dbname
JWT_SECRET=[Mínimo 32 caracteres random]
CLIENT_URL=https://tu-dominio-frontend.com

# CLIENT
VITE_API_URL=https://tu-dominio-backend.com/api
```

### Estrategia de Deploy
1.  **Build Client**: `cd client && npm run build`. Genera estáticos en `/dist`.
2.  **Servir Frontend**:
    *   **Opción A (Separado)**: Subir `/dist` a Vercel/Netlify.
    *   **Opción B (Unificado)**: Configurar Express para servir `/dist` estáticamente en `/*`.

---

## ⚠️ Errores Comunes & Soluciones

*   **Error 401 en Rutas Protegidas**: El token no se está enviando en el header. Verificar interceptor de Axios en `src/services/api.js`.
*   **Imágenes Rotas**: En producción, asegurar que la carpeta `/uploads` tenga permisos de lectura o usar Cloudinary (recomendado para scale).
*   **Error CORS**: El `CLIENT_URL` en el .env del servidor no coincide exactamente con el origen del frontend (ojo con trailing slashes).

---

## 🛣️ Pipeline de Mejoras (Ideas Futuras)

1.  **Cloud Storage**: Reemplazar `multer` local por `Cloudinary/S3` para persistencia de imágenes en deployments serverless (Vercel/Heroku borran fs).
2.  **Rate Limiting**: Implementar `express-rate-limit` para evitar DDOS en login.
3.  **Logs**: Integrar `Morgan` o `Winston` para trazabilidad de errores en producción.
