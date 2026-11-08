[English](wuiview-message-en.md) | [Español](wuiview-message-es.md)

[wuijs-views-lib](../../README-es.md)

# WUIViewMessage

Versión: `0.1`

Vista de mensajes modales (información, confirmación, advertencia, error, etc.) con ícono, texto y botones de cancelar y aceptar.

## Fuentes

| Tipo | Archivo |
|:----:| ------- |
| JS   | [src/wui-js/views/message/wuiview-message-0.1.js](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/message/wuiview-message-0.1.js) |
| CSS  | [src/wui-js/views/message/wuiview-message-0.1.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/message/wuiview-message-0.1.css) |
| CSS  | [src/wui-js/views/message/wuiview-message-0.1.root.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/message/wuiview-message-0.1.root.css) |

## Dependencias

| Clase       | Versión | Descripción |
| ----------- |:-------:| ----------- |
| `WUIModal`  | `0.14`  | Modal en modo `message` que contiene la vista. Requerida. |
| `WUIButton` | `0.17`  | Botones de cancelar y aceptar. Requerida. |
| `WUIIcon`   | `0.14`  | Íconos del mensaje y del botón aceptar. Requerida. |
| `WUIFade`   | `0.7`   | Animación del ícono de carga del botón aceptar (`acceptButtonLockOnAccept`). Requerida. |

## Constructor

| Tipo           | Descripción |
| -------------- | ----------- |
| WUIViewMessage | `WUIViewMessage([properties])`<br><br>Parámetros:<br>**• properties:** `object` *opcional* |

El constructor crea el modal (`div.wui-modal.message`) al final de `<body>` cuando no existe un elemento con el id `modalId`.

## Propiedades

| Propiedad                | Tipo             | Valor predeterminado  | Descripción |
| ------------------------ | ---------------- | --------------------- | ----------- |
| selector                 | `string`         | `".wuiview-message"`  | (get/set)<br><br>Selector CSS del elemento `HTMLDivElement` que identifica la vista. |
| lang                     | `string`         | `"en"`                | (get/set)<br><br>Código de idioma de 2 letras. |
| modalId                  | `string`         | `null`                | (get/set)<br><br>Id del modal. Si es `null`, se genera automáticamente (`wuiviewMessage{N}Modal`). |
| modalOverlay             | `boolean`        | `true`                | (get/set)<br><br>Muestra el fondo de superposición del modal. |
| modalPriority            | `boolean`        | `true`                | (get/set)<br><br>Prioridad del modal sobre otros modales abiertos. |
| modalSelector            | `string`         | `"#{modalId}"`        | (get)<br><br>Selector CSS del modal. |
| cancelButtonHidden       | `boolean`        | `false`               | (get/set)<br><br>Oculta el botón cancelar. Los tipos `offline`, `invalid`, `error` y `success` lo ocultan siempre. |
| cancelButtonText         | `string`         | `""`                  | (get/set)<br><br>Texto del botón cancelar. |
| cancelButtonTextData     | `object`         | `{}`                  | (get/set)<br><br>Atributos `data-*` del texto del botón cancelar (por ejemplo, `{ key: "buttons.cancel" }` para `WUILanguage`). |
| acceptButtonHidden       | `boolean`        | `false`               | (get/set)<br><br>Oculta el botón aceptar. |
| acceptButtonText         | `string`         | `""`                  | (get/set)<br><br>Texto del botón aceptar. |
| acceptButtonTextData     | `object`         | `{}`                  | (get/set)<br><br>Atributos `data-*` del texto del botón aceptar. |
| acceptButtonSubmit       | `boolean`        | `false`               | (get/set)<br><br>Muestra el botón aceptar con estilo de envío (`submit` de `WUIButton`). Los tipos distintos de `warning` y `delete` lo aplican siempre. |
| acceptButtonDanger       | `boolean`        | `false`               | (get/set)<br><br>Muestra el botón aceptar con estilo de peligro (`danger`). Los tipos `warning` y `delete` lo aplican siempre. |
| acceptButtonOutlined     | `boolean`        | `false`               | (get/set)<br><br>Muestra el botón aceptar con estilo de contorno (`outlined` de `WUIButton`). |
| acceptButtonLockOnAccept | `boolean`        | `false`               | (get/set)<br><br>Al aceptar, deshabilita y bloquea el botón aceptar con un ícono de carga y deja el modal abierto. El cierre queda a cargo de `onAccept`. |
| onAccept                 | `function\|null` | `null`                | (get/set)<br><br>Función que se ejecuta al presionar el botón aceptar. |
| onCancel                 | `function\|null` | `null`                | (get/set)<br><br>Función que se ejecuta al presionar el botón cancelar. |
| onClose                  | `function\|null` | `null`                | (get/set)<br><br>Función que se ejecuta al cerrar el modal. |

## Métodos de la Instancia

| Método   | Tipo retorno | Descripción |
| -------- | ------------ | ----------- |
| init     | `void`       | `init()`<br><br>Inicializa el objeto. |
| open     | `void`       | `open(type[, options])`<br><br>Parámetros:<br>**• type:** `string`, tipo de mensaje. Define el ícono y el estado de los botones: `info`, `invalid`, `offline`, `error`, `privacy`, `confirm`, `warning`, `delete`, `success`, `download` o `signout`.<br>**• options:** `object` *opcional*, opciones del mensaje. Cada opción reemplaza a la propiedad homónima solo en esta apertura: `text`, `detail`, `iconClass`, `cancelButtonHidden`, `cancelButtonText`, `acceptButtonHidden`, `acceptButtonText`, `acceptButtonSubmit`, `acceptButtonDanger`, `acceptButtonOutlined`, `acceptButtonLockOnAccept` (alias `lockOnAccept`), `onAccept`, `onCancel` y `onClose`.<br><br>Abre el modal con el mensaje. `detail` se agrega como un párrafo bajo `text`. |
| close    | `void`       | `close()`<br><br>Cierra el modal. |
| isOpen   | `boolean`    | `isOpen()`<br><br>Retorna si el modal está abierto. |
| getModal | `WUIModal`   | `getModal()`<br><br>Retorna el objeto `WUIModal` de la vista. |

## Variables CSS

La clase no define variables CSS propias. Su apariencia depende de las variables de `WUIModal` y `WUIButton`.

## Implementación

Cabecera HTML:

```html
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/message/wuiview-message-0.1.root.css">
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/message/wuiview-message-0.1.css">
<script type="text/javascript" src="./libraries/wui-js/views/message/wuiview-message-0.1.js"></script>
```

Código HTML:

```html
<div class="wuiview-message"></div>
```

Código JS:

```js
const init = () => {
	const message = new WUIViewMessage({
		selector: ".wuiview-message",
		cancelButtonText: "Cancelar",
		acceptButtonText: "Aceptar"
	});
	message.init();
	message.open("delete", {
		text: "¿Eliminar el documento?",
		detail: "Esta acción no se puede deshacer.",
		onAccept: () => {
			console.log("aceptado");
		}
	});
};

window.addEventListener("DOMContentLoaded", init);
```

> [!NOTE]
> Las hojas de estilo y scripts de las clases de `wuijs-main-lib` listadas en **Dependencias** deben cargarse antes que la vista.
