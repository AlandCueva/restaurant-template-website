# 🍽️ Plantilla Premium para Restaurantes — Plataforma Web Potenciada con IA para Negocios Locales de Alta Conversión

> **Una plantilla lista para producción, optimizada para SEO y nativa en IA, construida para restaurantes que quieren posicionarse en Google, automatizar la interacción con sus comensales y convertir visitantes en reservas.**

Construida y mantenida por **[Aland Cueva](https://github.com/AlandCueva)** — Desarrollador Web y Creador de Contenido Audiovisual (Ecuador) — diseñando escaparates digitales modernos para negocios locales que compiten con marcas más grandes usando mejor tecnología, no presupuestos más grandes.

---

## 💼 Por Qué Existe Esta Plantilla

La mayoría de los sitios web de restaurantes son folletos digitales estáticos: lentos, sin posicionamiento y desconectados de cómo los comensales realmente deciden dónde comer. Esta plantilla fue construida para solucionar eso. No es solo un "sitio bonito" — es una **capa de infraestructura de ingresos** para dueños de restaurantes, combinando:

- **Arquitectura de SEO local** para que el negocio aparezca cuando importa (búsquedas como "mejor [tipo de cocina] cerca de mí")
- **Integración nativa de IA** (Gemini API) para automatizar la interacción con comensales, la inteligencia del menú y la generación de contenido
- **UX enfocada en conversión** diseñada en torno a reservas, pedidos y visitas recurrentes — no solo estética

Si eres un desarrollador revendiendo esto como una plantilla premium, o un dueño de restaurante evaluándola directamente: cada sección a continuación conecta una característica técnica con un **resultado de negocio**.

---

## ⚙️ Stack Tecnológico

| Capa | Tecnología | Por Qué Importa para el Cliente |
|---|---|---|
| Framework | **React + Vite** | Tiempos de carga ultrarrápidos → menor tasa de rebote → mejores Core Web Vitals → mejor posicionamiento SEO |
| Lenguaje | **TypeScript** | Menos errores en producción, mantenimiento a largo plazo más seguro, iteración más rápida al escalar funcionalidades |
| Estilos | **Tailwind CSS** | Identidad de marca completamente personalizada y pixel-perfect sin la sobrecarga de una librería de UI pesada |
| Capa de IA | **Gemini API** | Funcionalidades de IA nativas (chat, recomendaciones, automatización de contenido) sin costos de SaaS de terceros |
| Animaciones | Personalizadas (IntersectionObserver, revelados basados en scroll, movimiento SVG) | Sensación premium que transmite credibilidad — los comensales confían su dinero a marcas pulidas |

Sin kits de UI externos. Sin sobrecarga de plantillas. Cada componente está construido a mano para el rendimiento y la personalización total de marca.

---

## 🚀 Características Principales

### 1. SEO Local, Integrado en la Estructura (No Añadido Después)
- HTML semántico y datos estructurados (Schema.org: `Restaurant`, `Menu`, `LocalBusiness`, `Review`) para que Google entienda el negocio, no solo lo renderice
- Arquitectura de metadatos optimizada para búsquedas con intención de "cerca de mí" y de ciudad/barrio
- Core Web Vitals rápidos desde el inicio (Vite + arquitectura de componentes ligera = puntajes altos en Lighthouse)
- Diseño mobile-first — la mayoría de las búsquedas de "restaurantes cerca de mí" ocurren en móvil

**Resultado de negocio:** el cliente deja de pagar por anuncios para ser encontrado y comienza a posicionarse orgánicamente.

### 2. Integración Nativa de IA (Gemini API)
- Asistente conversacional potenciado por IA para preguntas sobre el menú, recomendaciones y preguntas frecuentes (restricciones alimentarias, maridajes, horarios, etc.)
- Conexiones de generación dinámica de contenido (ej. descripciones de platillos generadas automáticamente, promociones de temporada)
- Arquitectura extensible para integrar lógica de venta cruzada impulsada por IA (ej. sugerir un maridaje de vino o postre en el momento óptimo del embudo)

**Resultado de negocio:** el restaurante obtiene un anfitrión digital disponible 24/7 que aumenta el ticket promedio y reduce la carga de trabajo del personal — sin contratar a nadie.

### 3. UX Diseñada para la Conversión
- CTA de reserva/contacto colocado en puntos de scroll científicamente óptimos, no solo en la barra de navegación
- Integración de WhatsApp/mensajería directa lista para usar — el canal de reservas dominante para los comensales en LATAM
- Presentación del menú diseñada para *vender*, no solo listar: la jerarquía visual guía la mirada hacia los ítems de mayor margen
- Secciones de prueba social (reseñas, prensa, platillos destacados) ubicadas antes del CTA para reducir la fricción

**Resultado de negocio:** más visitantes se convierten en reservas y pedidos reales — la métrica que paga las cuentas del cliente.

### 4. Sistema de Identidad Visual Premium
- Sistema de diseño completamente tokenizado (color, tipografía, espaciado) — rebrandeable en minutos por cliente
- Animaciones personalizadas basadas en scroll y SVG que transmiten una experiencia gastronómica moderna y de alto nivel
- Soporte integrado para storytelling liderado por fotografía (secuencias de hero, galería, secciones de ambiente)

**Resultado de negocio:** el sitio mismo funciona como una señal de credibilidad — los comensales asocian el pulido visual con la calidad de comida/servicio incluso antes de entrar.

---

## 📁 Estructura del Proyecto

```
restaurant-template-website/
├── src/
│   ├── components/        # Componentes de UI modulares (Hero, Menu, Reservations, AI Assistant, etc.)
│   ├── sections/          # Secciones completas de página compuestas a partir de componentes
│   ├── hooks/             # Hooks personalizados (revelados de scroll, llamadas a IA, manejo de formularios)
│   ├── lib/                # Cliente de la Gemini API, utilidades de SEO/meta, generadores de schema
│   ├── data/               # Datos del menú, configuración de marca, fuente de verdad del contenido
│   ├── styles/             # Configuración de Tailwind + tokens de diseño
│   └── App.tsx
├── public/                 # Activos estáticos, favicon, imágenes OG
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

---

## 🛠️ Primeros Pasos

### Requisitos Previos
- Node.js 18+
- Una clave de API de Gemini (para las funcionalidades de IA)

### Instalación

```bash
git clone https://github.com/your-username/restaurant-template-website.git
cd restaurant-template-website
npm install
```

### Configuración del Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

### Ejecutar Localmente

```bash
npm run dev
```

### Compilar para Producción

```bash
npm run build
```

---

## 🎨 Guía de Personalización (Despliegue por Cliente)

Esta plantilla está diseñada para **revenderse y rebrandearse rápidamente**. Para adaptarla a un nuevo cliente:

1. **Tokens de marca** — actualiza `tailwind.config.ts` y `src/styles/` con la paleta de colores, tipografía y escala de espaciado del cliente.
2. **Datos de contenido** — reemplaza `src/data/` con el menú, horarios, ubicación y copy de marca del cliente.
3. **Imágenes** — reemplaza los activos del hero/galería en `public/` (se recomienda Cloudinary o un CDN similar para rendimiento).
4. **Configuración de SEO** — actualiza las etiquetas meta, JSON-LD de Schema.org e imágenes OG por cliente/ubicación.
5. **Persona de IA** — ajusta el system prompt de Gemini en `src/lib/` para que coincida con el tono del restaurante (fine dining formal vs. bistró casual vs. fast-casual).

Se recomienda un checklist completo de onboarding de clientes como documento complementario (`ONBOARDING.md`) si se revende a escala.

---

## 📈 Diseñada en Función de Resultados, No Solo de Código

| Característica Técnica | KPI de Negocio que Impulsa |
|---|---|
| Estructura de SEO local + Schema.org | Posicionamiento orgánico en búsquedas / menor gasto en publicidad |
| Tiempos de carga rápidos (Vite + componentes ligeros) | Menor tasa de rebote, mejor posicionamiento en Google |
| Asistente de IA potenciado por Gemini | Mayor valor promedio de pedido, menor carga de personal |
| CTAs colocados para conversión | Más reservas / pedidos directos |
| Sistema visual premium | Mayor valor de marca percibido |

---

## 📄 Licenciamiento y Uso Comercial

Esta plantilla está construida para **reventa comercial como producto premium** a negocios locales de restaurantes. Si se distribuye a clientes:

- Define términos de licencia claros por despliegue (licencia de un solo sitio vs. uso múltiple)
- Considera un nivel de mantenimiento/soporte como complemento de ingresos recurrentes
- Se recomienda un modelo de traspaso de costos de hosting + API de IA para mantener el margen

*(Reemplaza esta sección con tu licencia específica — ej. propietaria, exclusiva del cliente, o una licencia estándar como MIT si se hace open-source de partes del código.)*

---

## 📬 Contacto

Construido por **Aland Cueva** — plataformas web con IA nativa y SEO local incorporado, para negocios que quieren competir y ganar en línea.

- 📍 Con base en Loja, Ecuador — construyendo para clientes a nivel global
- 💬 Disponible para desarrollos a medida, licenciamiento de plantillas e integración continua de IA/automatización

 **✉️ Gmail: juliancueva17@gmail.com**

---

*¿Tienes un restaurante, gimnasio o negocio local listo para dejar de perder clientes ante competidores con mejores sitios web? Hablemos.*
