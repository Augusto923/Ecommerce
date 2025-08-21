# 🛍️ Novae — App de Catálogo de Productos

Aplicación mobile en **React Native con Expo** para explorar productos por categorías, con búsqueda, descuentos y navegación fluida.  
Incluye **Redux, RTK Query y Firebase** para gestión de datos y persistencia.

---

## 📑 Índice
1. [Wireframe](#-wireframe)
2. [Alcances](#-alcances-del-proyecto)
3. [Features](#-features-implementadas)
4. [Librerías](#-librerías-utilizadas-y-justificación)
5. [Instalación](#-pasos-de-instalación-y-ejecución)
6. [Estructura](#-estructura-del-proyecto)

---

## 🎨 Wireframe
👉 [Ver diseño en Figma](https://www.figma.com/design/nEEkq17uqPJs34Dge1WE6M/Untitled?node-id=0-1&t=oCDyi5pXzHKtQk0z-1)

---

## ✨ Alcances del Proyecto
- 🗂️ Explorar productos por categorías  
- 📄 Detalle con info ampliada  
- 🔍 Búsqueda por palabra clave  
- 💸 Precios con descuentos aplicados  
- 📱 Diseño responsivo y tipografías personalizadas  

---

## 🔧 Features Implementadas
- 📁 Navegación estructurada con React Navigation  
- 🔍 Barra de búsqueda integrada  
- 🖼️ Imágenes + descripción + marca  
- 🧮 Cálculo automático de descuentos  
- 🧠 Componentes reutilizables (`FlatCard`, `Header`, `Search`)  
- 🎨 Theming centralizado (`theme.js`)  
- ⚡ **Gestión de estado con Redux + RTK Query + Firebase**  

---

## 📦 Librerías Utilizadas
| Librería                          | Uso principal                                    |
|-----------------------------------|--------------------------------------------------|
| `react-native`                    | Base multiplataforma                             |
| `expo`                            | Configuración, assets, fuentes, splash           |
| `react-navigation/native`         | Navegación entre pantallas                       |
| `@react-navigation/native-stack`  | Stack navigator con headers nativos              |
| `expo-font`                       | Carga de tipografías                             |
| `expo-splash-screen`              | Control de splash screen                         |
| `react-native-vector-icons`       | Iconos personalizados                            |

---

## 🚀 Pasos de Instalación y Ejecución
```bash
# Clonar repo
git clone https://github.com/usuario/novae-app.git
cd novae-app

# Instalar dependencias
npm install
# o
yarn install

# Ejecutar
npx expo start
