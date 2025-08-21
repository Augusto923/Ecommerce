🛍️ Novae — App de Catálogo de Productos

Novae es una aplicación móvil desarrollada en React Native con Expo, pensada como un catálogo de productos clasificados por categorías. Permite explorar productos con imágenes, precios y descripciones detalladas, además de contar con funcionalidades de búsqueda y navegación fluida.

✨ Alcances del Proyecto

Explorar productos organizados por categorías.

Ver información detallada de cada producto.

Filtrar productos por palabra clave.

Visualizar precios con descuentos aplicados.

UI adaptable con diseño responsivo básico.

Carga personalizada de tipografías.

Autenticación de usuario con Firebase (Login y Registro).

Persistencia de sesión con AsyncStorage.

🔧 Características Implementadas

📁 Navegación estructurada con React Navigation (navegador de pila).

🔍 Barra de búsqueda para filtrar productos por título.

🖼️ Visualización de productos con imágenes, descripciones cortas, precio final y marca.

🧮 Cálculo automático de descuentos sobre los precios.

🧠 Componentes reutilizables: FlatCard, Header, Search, TextConvergence.

🎨 Tematización centralizada desde theme.js.

🔤 Fuentes personalizadas cargadas desde activos.

📱 Diseño visual con uso de sombras, bordes redondeados y compatibilidad multiplataforma.

🔑 Autenticación de usuario con Firebase (Login y Registro) a través de RTK Query.

🔄 Persistencia de sesión con AsyncStorage para mantener la sesión iniciada en el dispositivo.

📦 Librerías Utilizadas y Justificación
Librería	Uso Principal
react-native	Base del desarrollo móvil multiplataforma.
expo	Simplifica configuración, activos, fuentes y splash screen.
react-navigation/native	Navegación entre pantallas.
@react-navigation/native-stack	Navegador de pila con encabezados nativos.
expo-font	Carga de fuentes personalizadas.
expo-splash-screen	Control de pantalla de bienvenida durante la carga de fuentes.
react-native-vector-icons/Ionicons	Iconos personalizados para UI.
@reduxjs/toolkit	Gestión del estado global de la app.
react-redux	Integración de Redux con React.
@reduxjs/toolkit/query	Peticiones a Firebase (login y registro).
@react-native-async-storage/async-storage	Persistencia de sesión local.
firebase	Autenticación de usuario.
🚀 Pasos de Instalación y Ejecución

Clonar el repositorio:

git clone https://github.com/usuario/novae-app.git
cd novae-app


Instalar dependencias:

npm install
# o
yarn install


Instalar Expo CLI (opcional si usamos npx):

npm install -g expo-cli


Ejecutar la aplicación en modo desarrollo:

npx expo start


Esto abrirá una pestaña en tu navegador con un código QR para escanear con la aplicación Expo Go desde tu celular, o usar un emulador local.

🧱 Estructura del Proyecto
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
│       ├── LoginScreen.jsx
│       ├── SignupScreen.jsx
│       └── index.js
├── App.js
├── app.json
├── package.json
├── package-lock.json
└── .gitignore

🔒 Autenticación (Login y Registro)

La aplicación utiliza Firebase Authentication para gestionar el login y registro de usuarios. Se implementa RTK Query para las peticiones y AsyncStorage para mantener la sesión activa incluso al cerrar la app.

🔑 Cuenta de prueba ya creada:

Correo: profe@coder.com

Contraseña: 123456

📚 Enlaces Importantes

🔗 Proyecto en Firebase: https://console.firebase.google.com/project/proyect-app-ba118/authentication/users?hl=es-419

🎨 Wireframe en Figma: https://www.figma.com/design/nEEkq17uqPJs34Dge1WE6M/Untitled?node-id=0-1&p=f&t=kIlYrgqv7quitS8F-0