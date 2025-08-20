# 🛍️ Novae — App de Catálogo de Productos

Novae es una aplicación mobile desarrollada en **React Native con Expo**, pensada como un catálogo de productos clasificados por categorías. Permite explorar productos con imágenes, precios y descripciones detalladas, además de contar con funcionalidades de búsqueda y navegación fluida.

---

## ✨ Alcances del Proyecto

- Explorar productos organizados por categorías.
- Ver información detallada de cada producto.
- Filtrar productos por palabra clave.
- Visualizar precios con descuentos aplicados.
- UI adaptable con diseño responsivo básico.
- Carga personalizada de tipografías.

---

## 🔧 Features Implementadas

- 📁 **Navegación estructurada** con React Navigation (stack navigator).
- 🔍 **Barra de búsqueda** para filtrar productos por título.
- 🖼️ **Visualización de productos** con imágenes, descripciones cortas, precio final y marca.
- 🧮 **Cálculo automático de descuentos** sobre los precios.
- 🧠 **Componentes reutilizables**: `FlatCard`, `Header`, `Search`, `TextConvergence`.
- 🎨 **Theming centralizado** desde `theme.js`.
- 🔤 **Fuentes personalizadas** cargadas desde assets.
- 📱 Diseño visual con uso de sombras, bordes redondeados y compatibilidad multiplataforma.

---

## 📦 Librerías Utilizadas y Justificación

| Librería                            | Uso principal                                                               |
|-------------------------------------|------------------------------------------------------------------------------|
| `react-native`                      | Base del desarrollo mobile multiplataforma                                  |
| `expo`                              | Simplifica configuración, assets, fuentes y splash screen                   |
| `react-navigation/native`           | Navegación entre pantallas                                                  |
| `@react-navigation/native-stack`    | Stack navigator con headers nativos                                         |
| `expo-font`                         | Carga de fuentes personalizadas                                             |
| `expo-splash-screen`                | Control de splash screen durante la carga de fuentes                        |
| `react-native-vector-icons/Ionicons`| Iconos personalizados para interfaz de usuario                              |

---

## 🚀 Pasos de Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/usuario/novae-app.git
cd novae-app
```

### 2. Instalar dependencias
Instala todas las librerías necesarias:
```bash
npm install
# o
yarn install
```

### 3. Instalar Expo CLI (opcional si usás `npx`)
```bash
npm install -g expo-cli
```

### 4. Ejecutar la app en modo desarrollo
```bash
npx expo start
```

Esto abrirá una pestaña en tu navegador con un código QR para escanear con la app **Expo Go** desde tu celular, o usar un emulador local.

---

## 🧱 Estructura del Proyecto

```
.
├── assets/
│   └── fonts/
│       ├── Convergence-Regular.ttf
│       └── Inter-Italic-VariableFont_opsz,wght.ttf
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── src/
│   ├── components/
│   │   ├── FlatCard.jsx
│   │   ├── Header.jsx
│   │   ├── Search.jsx
│   │   └── TextConvergence.jsx
│   ├── data/
│   │   ├── categories.json
│   │   └── products.json
│   ├── global/
│   │   └── theme.js
│   ├── navigation/
│   │   └── ShopStack.jsx
│   └── screens/
│       ├── CategoriesScreen.jsx
│       ├── ProductsScreen.jsx
│       ├── ProductScreen.jsx
│       └── index.js
├── App.js
├── app.json
├── package.json
├── package-lock.json
└── .gitignore
