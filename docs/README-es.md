[English](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/README-en.md) |
[Español](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/README-es.md)
---

# wuijs-views-lib

|                       | |
| --------------------- | --- |
| **Nombre librería**   | `wuijs-views-lib` |
| **Versión librería**  | `0.1.0` ([Registro de Cambios](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/CHANGELOG-es.md)) |
| **Paquete npm**       | `@wui-js/views` |
| **Versión documento** | `0.1.0.20261016.0` |
| **Licencia**          | `Licencia Apache 2.0` |
| **Autor**             | `Sergio E. Belmar V. <wuijs.project@gmail.com>` |
| **Repositorio**       | [https://github.com/wui-js/wuijs-views-lib](https://github.com/wui-js/wuijs-views-lib) |
| **Documentación**     | [https://docs.wuijs.dev](https://docs.wuijs.dev) |
| **Sitio web**         | [https://wuijs.dev](https://wuijs.dev) |

## Índice

*   [Descripción General](#overview)
	*   [Acerca del Proyecto WUI/JS](#project)
	*   [Tabla de Clases](#classtable)
	*   [Mapa de Directorios](#dirmap)
*   [Instalación](#install)
*   [Clases](#classes)
	*   [WUIViewMessage](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/message/wuiview-message-es.md)
	*   [WUIViewProgress](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/progress/wuiview-progress-es.md)
	*   [WUIViewDatalist](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/datalist/wuiview-datalist-es.md)

<a name="overview"></a>

## Descripción General

WUI/JS Views Lib es una librería JavaScript/CSS de código abierto que proporciona vistas compuestas: conjuntos de clases de WUI/JS Main Lib que resuelven una interfaz completa (mensajes, progreso, listados de datos) a partir de un único elemento HTML y un objeto de configuración.

<a name="project"></a>

### Acerca del Proyecto WUI/JS

WUI/JS Views Lib es parte del proyecto WUI/JS, que consta actualmente de 5 repositorios:

-	[https://github.com/wui-js/wuijs-main-lib](https://github.com/wui-js/wuijs-main-lib)<br>
	Librería Principal UI.<br><br>
-	[https://github.com/wui-js/wuijs-environment-lib](https://github.com/wui-js/wuijs-environment-lib)<br>
	Librería Puente UI entre entornos web y motores de renderizado web nativos.<br><br>
-	[https://github.com/wui-js/wuijs-plugins-lib](https://github.com/wui-js/wuijs-plugins-lib)<br>
	Librería de Complementos UI.<br><br>
-	[https://github.com/wui-js/wuijs-views-lib](https://github.com/wui-js/wuijs-views-lib)<br>
	Librería de Vistas UI.<br><br>
-	[https://github.com/wui-js/wuijs-demos](https://github.com/wui-js/wuijs-demos)<br>
	Repositorio con demos y ejemplos de uso de las librerías del proyecto.<br><br>

<a name="classtable"></a>

### Tabla de Clases

| Nombre Clase                                                                                                        | Versión | Descripción |
| ------------------------------------------------------------------------------------------------------------------- |:-------:| ----------- |
| [WUIViewMessage](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/message/wuiview-message-es.md)    | `0.1`   | Vista de mensajes modales con ícono, texto y botones de cancelar y aceptar. |
| [WUIViewProgress](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/progress/wuiview-progress-es.md) | `0.1`   | Vista modal de progreso con etiqueta, barra, texto y botón cancelar. |
| [WUIViewDatalist](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/datalist/wuiview-datalist-es.md) | `0.1`   | Vista de listado de datos con paginación, búsqueda, filtros, selección y botones de agregar y eliminar. |

<a name="dirmap"></a>

### Mapa de Directorios

```bash
wuijs-views-lib/
├── docs/
│   └── classes/
└── src/
    └── wui-js/
        └── views/
```

| Ruta                                                                                          | Descripción |
| --------------------------------------------------------------------------------------------- | ----------- |
| [docs](https://github.com/wui-js/wuijs-views-lib/tree/main/docs/)                             | Documentación. |
| [docs/classes](https://github.com/wui-js/wuijs-views-lib/tree/main/docs/classes/)             | Documentación de cada clase. |
| [src](https://github.com/wui-js/wuijs-views-lib/tree/main/src/)                               | Fuentes principales de la última versión. |
| [src/wui-js](https://github.com/wui-js/wuijs-views-lib/tree/main/src/wui-js)                  | Directorio del proyecto WUI/JS. |
| [src/wui-js/views](https://github.com/wui-js/wuijs-views-lib/tree/main/src/wui-js/views/)     | Librería WUI/JS Views. |

<a name="install"></a>

## Instalación

**Opción 1: Instalar desde fuente**

Para instalar la biblioteca WUI/JS Views, debe ser clonada desde el repositorio oficial en GitHub (`wui-js/wuijs-views-lib`).
Suponiendo que el proyecto donde se implementará tenga un directorio de código fuente `./src` y, dentro de este, un directorio de librerías `./src/libraries`, debe escribir lo siguiente en la terminal:

```bash
git clone --branch v0.1.0 https://git@github.com/wui-js/wuijs-views-lib.git
cp -r ./wuijs-views-lib/src/wui-js/ ../src/libraries/
```

Opcionalmente puede ser descargada desde los mismos repositorios en formato ZIP.

```bash
wget https://github.com/wui-js/wuijs-views-lib/archive/refs/heads/main.zip
unzip main.zip
cp -r ./wuijs-views-lib-main/src/wui-js/ ../src/libraries/
```

> [!TIP]
> Es recomendable que el directorio `/views` se aloje en el mismo directorio que la biblioteca principal `/main`.

**Opción 2: Instalar vía npm**

Para instalar la librería WUI/JS Views mediante npm:

```bash
npm i @wui-js/views
```

Los recursos quedarán disponibles en la ruta `./node_modules/@wui-js/views`.

> [!IMPORTANT]
> Las vistas requieren las clases de `wuijs-main-lib` indicadas en la sección **Dependencias** del documento de cada clase.

<a name="classes"></a>

## Clases

La documentación de cada clase está en un documento propio, en el directorio [`docs/classes/`](https://github.com/wui-js/wuijs-views-lib/tree/main/docs/classes):

*   <a name="wuiview-message"></a>[WUIViewMessage](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/message/wuiview-message-es.md)
*   <a name="wuiview-progress"></a>[WUIViewProgress](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/progress/wuiview-progress-es.md)
*   <a name="wuiview-datalist"></a>[WUIViewDatalist](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/datalist/wuiview-datalist-es.md)
