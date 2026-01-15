# Brigadas de Limpieza - Resumen del Proyecto

## Descripción
Web para gestionar los turnos de limpieza de la oficina. Muestra qué brigada le toca limpiar cada semana de forma automática.

## Lógica de rotación
- **4 Brigadas** que rotan semanalmente
- **Fórmula**: `Brigada = ((semana_del_año - 1) % 4) + 1`
- Semanas ISO (empiezan en lunes)
- Rotación justa: cada brigada limpia 13 veces al año

## Estructura de archivos
```
AsignadorDeLimpieza/
├── index.html    # Estructura de la página + emojis animados
├── styles.css    # Estilos, colores, tipografías, animaciones
├── script.js     # Lógica de fechas y renderizado
├── data.js       # Datos de brigadas (editar aquí los integrantes)
└── claude.md     # Este archivo
```

## Integrantes por brigada (editar en data.js)
- **1ª Brigada**: Alberto, Álvaro Freire, Clemente, Daniel Francos, Pablo López, Rus, Xabi
- **2ª Brigada**: Alvaote, Carlota, Elyas, Lamela, Manuel, Marcos, Mario
- **3ª Brigada**: Alejandro, Christian, Diego, Ero, Ivan, Marcos Recio, Pablo Anllo
- **4ª Brigada**: Ánxela, Elio, Fran, Laura, Oscar Chavarria, Oscar Choco, Serxio

## Paleta de colores
| Elemento | Color | Hex |
|----------|-------|-----|
| Fondo principal | Blanco asalmonado | `#FFF5F0` |
| Fondo secundario | Salmón claro | `#FFE8DE` |
| 1ª Brigada | Terracota | `#E07B54` |
| 2ª Brigada | Verde salvia | `#5B8A72` |
| 3ª Brigada | Azul elegante | `#4A7C9B` |
| 4ª Brigada | Violeta suave | `#8B6BAE` |

## Tipografías (Google Fonts)
- **Títulos**: Fraunces (estilo Recoleta, serif decorativa)
- **Cuerpo**: Inter (sans-serif legible)

## Características
- Muestra brigada actual con integrantes
- Calendario de las próximas 3 semanas (sin la actual)
- Botón para ver todos los miembros de todas las brigadas
- Emojis de limpieza flotando en el fondo (🧹🪣🧽🧴✨🧤🫧🍳)
- Diseño responsive (móvil y escritorio)
- Compatible con GitHub Pages (100% estático)

## Despliegue en GitHub Pages
1. Subir cambios: `git add . && git commit -m "mensaje" && git push`
2. Ir a Settings → Pages
3. Source: rama `main`, carpeta `/ (root)`
4. URL: `https://[usuario].github.io/AsignadorDeLimpieza/`

## Posibles mejoras futuras
- Notificaciones por email/calendario
- Historial de semanas pasadas
- Modo oscuro
- PWA para instalar en móvil
