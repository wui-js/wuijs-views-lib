[English](wuiview-progress-en.md) | [Español](wuiview-progress-es.md)

[wuijs-views-lib](../../README-es.md)

# WUIViewProgress

Versión: `0.1`

Vista modal de progreso con etiqueta, barra `<progress>` (determinada o indeterminada), texto y botón cancelar.

## Fuentes

| Tipo | Archivo |
|:----:| ------- |
| JS   | [src/wui-js/views/progress/wuiview-progress-0.1.js](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/progress/wuiview-progress-0.1.js) |
| CSS  | [src/wui-js/views/progress/wuiview-progress-0.1.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/progress/wuiview-progress-0.1.css) |
| CSS  | [src/wui-js/views/progress/wuiview-progress-0.1.root.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/progress/wuiview-progress-0.1.root.css) |

## Dependencias

| Clase       | Versión | Descripción |
| ----------- |:-------:| ----------- |
| `WUIModal`  | `0.14`  | Modal en modo `message` que contiene la vista. Requerida. |
| `WUIButton` | `0.17`  | Botón cancelar. Requerida. |
| `WUIForm`   | `0.16`  | Estilos del formulario que contiene la barra de progreso (solo CSS; la vista no instancia `WUIForm`). Requerida. |

## Constructor

| Tipo            | Descripción |
| --------------- | ----------- |
| WUIViewProgress | `WUIViewProgress([properties])`<br><br>Parámetros:<br>**• properties:** `object` *opcional* |

El constructor crea el modal (`div.wui-modal.message`) al final de `<body>` cuando no existe un elemento con el id `modalId`.

## Propiedades

| Propiedad             | Tipo             | Valor predeterminado  | Descripción |
| --------------------- | ---------------- | --------------------- | ----------- |
| selector              | `string`         | `".wuiview-progress"` | (get/set)<br><br>Selector CSS del elemento `HTMLDivElement` que identifica la vista. |
| lang                  | `string`         | `"en"`                | (get/set)<br><br>Código de idioma de 2 letras. |
| modalId               | `string`         | `null`                | (get/set)<br><br>Id del modal. Si es `null`, se genera automáticamente (`wuiviewProgress{N}Modal`). |
| modalOverlay          | `boolean`        | `true`                | (get/set)<br><br>Muestra el fondo de superposición del modal. |
| modalPriority         | `boolean`        | `true`                | (get/set)<br><br>Prioridad del modal sobre otros modales abiertos. |
| modalSelector         | `string`         | `"#{modalId}"`        | (get)<br><br>Selector CSS del modal. |
| formFieldStyle        | `string`         | `"fill"`              | (get/set)<br><br>Estilo de campos del formulario: `fill`, `roundfill`, `border`, `roundborder` o `line` (equivalente a `fieldStyle` de `WUIForm`). |
| labelText             | `string`         | `""`                  | (get/set)<br><br>Texto de la etiqueta sobre la barra de progreso. |
| labelTextData         | `object`         | `{}`                  | (get/set)<br><br>Atributos `data-*` de la etiqueta (por ejemplo, `{ key: "progress.label" }` para `WUILanguage`). |
| cancelButtonHidden    | `boolean`        | `false`               | (get/set)<br><br>Oculta el botón cancelar. |
| cancelButtonText      | `string`         | `""`                  | (get/set)<br><br>Texto del botón cancelar. |
| cancelButtonTextData  | `object`         | `{}`                  | (get/set)<br><br>Atributos `data-*` del texto del botón cancelar. |
| onOpen                | `function\|null` | `null`                | (get/set)<br><br>Función que se ejecuta al abrir el modal. |
| onCancel              | `function\|null` | `null`                | (get/set)<br><br>Función que se ejecuta al presionar el botón cancelar. |
| onReady               | `function\|null` | `null`                | (get/set)<br><br>Función que se ejecuta una sola vez, cuando el valor alcanza el total. |
| onClose               | `function\|null` | `null`                | (get/set)<br><br>Función que se ejecuta al cerrar el modal. |
| total                 | `number`         | `0`                   | (get)<br><br>Total de la barra en la apertura actual. `0` indica una barra indeterminada. |
| value                 | `number`         | `0`                   | (get)<br><br>Valor actual de la barra. |

## Métodos de la Instancia

| Método   | Tipo retorno | Descripción |
| -------- | ------------ | ----------- |
| init     | `void`       | `init()`<br><br>Inicializa el objeto. |
| open     | `void`       | `open([options])`<br><br>Parámetros:<br>**• options:** `object` *opcional*, opciones de la apertura: `total`, `value`, `labelText`, `text`, `detail`, `cancelButtonHidden`, `cancelButtonText`, `onOpen`, `onCancel`, `onReady` y `onClose`. Cada opción reemplaza a la propiedad homónima solo en esta apertura.<br><br>Abre el modal. Si `total` es mayor que `0`, la barra es determinada; si no, es indeterminada. |
| update   | `void`       | `update(value[, total])`<br><br>Parámetros:<br>**• value:** `number`, valor actual.<br>**• total:** `number` *opcional*, nuevo total.<br><br>Actualiza la barra (el valor se limita entre `0` y el total) y ejecuta `onReady` la primera vez que el valor alcanza el total. No tiene efecto con una barra indeterminada. |
| setText  | `void`       | `setText(value)`<br><br>Parámetros:<br>**• value:** `string`, texto HTML.<br><br>Reemplaza el texto bajo la barra. |
| close    | `void`       | `close()`<br><br>Cierra el modal. Al cerrar, restablece la etiqueta y el botón cancelar a sus textos iniciales. |
| isOpen   | `boolean`    | `isOpen()`<br><br>Retorna si el modal está abierto. |
| getModal | `WUIModal`   | `getModal()`<br><br>Retorna el objeto `WUIModal` de la vista. |

## Variables CSS

La clase no define variables CSS propias. Su apariencia depende de las variables de `WUIModal`, `WUIForm` y `WUIButton`.

## Implementación

Cabecera HTML:

```html
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/progress/wuiview-progress-0.1.root.css">
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/progress/wuiview-progress-0.1.css">
<script type="text/javascript" src="./libraries/wui-js/views/progress/wuiview-progress-0.1.js"></script>
```

Código HTML:

```html
<div class="wuiview-progress"></div>
```

Código JS:

```js
const init = () => {
	const progress = new WUIViewProgress({
		selector: ".wuiview-progress",
		labelText: "Descargando",
		cancelButtonText: "Cancelar"
	});
	progress.init();
	progress.open({
		total: 10,
		onReady: () => {
			progress.close();
		}
	});
	let value = 0;
	const timer = setInterval(() => {
		progress.update(++value);
		if (value >= 10) {
			clearInterval(timer);
		}
	}, 300);
};

window.addEventListener("DOMContentLoaded", init);
```

> [!NOTE]
> Las hojas de estilo y scripts de las clases de `wuijs-main-lib` listadas en **Dependencias** deben cargarse antes que la vista.
