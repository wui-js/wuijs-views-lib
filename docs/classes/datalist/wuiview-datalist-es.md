[English](wuiview-datalist-en.md) | [Español](wuiview-datalist-es.md)

[wuijs-views-lib](../../README-es.md)

# WUIViewDatalist

Versión: `0.1`

Vista de listado de datos con paginación, búsqueda, filtros en modal, selección y botones de agregar y eliminar, presentada como lista (`WUIList`), tabla (`WUITable`) o ambas según el ancho de pantalla.

## Fuentes

| Tipo | Archivo |
|:----:| ------- |
| JS   | [src/wui-js/views/datalist/wuiview-datalist-0.1.js](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/datalist/wuiview-datalist-0.1.js) |
| CSS  | [src/wui-js/views/datalist/wuiview-datalist-0.1.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/datalist/wuiview-datalist-0.1.css) |
| CSS  | [src/wui-js/views/datalist/wuiview-datalist-0.1.root.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/datalist/wuiview-datalist-0.1.root.css) |

## Dependencias

| Clase             | Versión | Descripción |
| ----------------- |:-------:| ----------- |
| `WUIForm`         | `0.16`  | Formulario principal (cabecera y cuerpo) y formulario de filtros. Requerida. |
| `WUIButton`       | `0.17`  | Botones de paginación, filtro, agregar, eliminar, aplicar y limpiar. Requerida. |
| `WUISelectpicker` | `0.16`  | Menú de opciones de la cabecera y filtros de tipo `wui-selectpicker`. Requerida. |
| `WUIIcon`         | `0.14`  | Íconos de la cabecera. Requerida. |
| `WUIList`         | `0.13`  | Presentación en lista (`type` `list` o `dual`). |
| `WUITable`        | `0.14`  | Presentación en tabla (`type` `table` o `dual`). |
| `WUIModal`        | `0.14`  | Modal de filtros (`filterable`). |
| `WUIDatepicker`   | `0.15`  | Filtros de tipo `wui-datepicker`. |
| `WUITimepicker`   | `0.14`  | Filtros de tipo `wui-timepicker`. |
| `WUIColorpicker`  | `0.15`  | Filtros de tipo `wui-colorpicker`. |
| `WUISwitch`       | `0.10`  | Filtros de tipo `wui-switch`. |

## Constructor

| Tipo            | Descripción |
| --------------- | ----------- |
| WUIViewDatalist | `WUIViewDatalist([properties])`<br><br>Parámetros:<br>**• properties:** `object` *opcional* |

El constructor crea la estructura HTML de la vista dentro del elemento `selector` y, si `filterable` es `true`, el modal de filtros.

## Propiedades de la Clase

| Propiedad | Tipo     | Descripción |
| --------- | -------- | ----------- |
| version   | `string` | Versión de la clase. |
| colors    | `object` | (get)<br><br>Colores `submit` y `danger` de `WUIButton`, leídos de las variables CSS `--wui-button-submit-bgcolor-out` y `--wui-button-danger-bgcolor-out`. |

## Propiedades

| Propiedad                | Tipo                 | Valor predeterminado   | Descripción |
| ------------------------ | -------------------- | ---------------------- | ----------- |
| selector                 | `string`             | `".wuiview-datalist"`  | (get/set)<br><br>Selector CSS del elemento `HTMLDivElement` que contiene la vista. |
| lang                     | `string`             | `"en"`                 | (get/set)<br><br>Código de idioma de 2 letras, usado por los selectores de los filtros. |
| locale                   | `string`             | `"en-US"`              | (get/set)<br><br>Código de localización (`xx-XX`), usado por los filtros de tipo `wui-datepicker`. |
| type                     | `string`             | `"list"`               | (get/set)<br><br>Presentación de los datos: `list` (`WUIList`), `table` (`WUITable`) o `dual` (lista bajo 768px de ancho y tabla desde 768px). |
| data                     | `array\|function`    | `[]`                   | (get/set)<br><br>Datos. Un arreglo de objetos se pagina, busca, filtra y ordena localmente. Una función asíncrona `({ page, paging, key, filters }) => ({ items, total })` delega la paginación, búsqueda y filtros al servidor. |
| options                  | `array`              | `[]`                   | (get/set)<br><br>Opciones adicionales del menú de la cabecera, con el formato de opciones de `WUISelectpicker` (`value`, `text`, `iconClass`, etc.). Al elegirlas se ejecuta `onSelectOption`. |
| sort                     | `function\|null`     | `null`                 | (get/set)<br><br>Función de comparación (`(a, b) => number`). Con datos locales ordena todos los elementos filtrados; con datos de función, los de cada página. |
| active                   | `boolean`            | `true`                 | (get/set)<br><br>Estado activo de la vista. Al desactivarla se cierra el modal de filtros y al reactivarla se reabre si estaba abierto. |
| modalId                  | `string`             | `null`                 | (get/set)<br><br>Id del modal de filtros. Si es `null`, se genera automáticamente (`wuiviewDatalist{N}Modal`). |
| modalMode                | `string`             | `"slidepage"`          | (get/set)<br><br>Modo del modal de filtros: `message`, `page`, `smallpage` o `slidepage`. |
| modalSlidePosition       | `string`             | `"right"`              | (get/set)<br><br>Lado del modal en modo `slidepage`: `left` o `right`. |
| modalFixedMinwidth       | `number`             | `Infinity`             | (get/set)<br><br>Ancho mínimo (desde `768`) a partir del cual el modal de filtros queda abierto y fijo junto a la vista. `Infinity` lo desactiva. |
| modalOverlay             | `boolean`            | `false`                | (get/set)<br><br>Muestra el fondo de superposición del modal de filtros. No aplica cuando `modalFixedMinwidth` está definido. |
| modalPriority            | `boolean`            | `true`                 | (get/set)<br><br>Prioridad del modal de filtros sobre otros modales abiertos. |
| modalTitle               | `string`             | `""`                   | (get/set)<br><br>Título del modal de filtros. |
| modalTitleData           | `object`             | `{}`                   | (get/set)<br><br>Atributos `data-*` del título del modal (por ejemplo, `{ key: "filters.title" }` para `WUILanguage`). |
| modalSelector            | `string`             | `"#{modalId}"`         | (get)<br><br>Selector CSS del modal de filtros. |
| formFieldMode            | `string`             | `"stack"`              | (get/set)<br><br>Modo de campos de los formularios: `stack`, `inline` o `auto` (equivalente a `fieldMode` de `WUIForm`). |
| formFieldStyle           | `string`             | `"fill"`               | (get/set)<br><br>Estilo de campos de los formularios: `fill`, `roundfill`, `border`, `roundborder` o `line` (equivalente a `fieldStyle` de `WUIForm`). |
| formHeaderJoinButton     | `boolean`            | `false`                | (get/set)<br><br>Une los botones de la cabecera. Con `true`, la vista pasa `join: true` a los `WUIButton` de la cabecera (anterior, siguiente, filtrar, agregar y eliminar), que se unen por grupo (`fieldset`); sin elementos, el botón agregar queda sin unir. Con `false`, todos reciben `join: false`. |
| listColumns              | `array`              | `[]`                   | (get/set)<br><br>Columnas de `WUIList` (propiedad `columns`). |
| listRowFormat            | `function\|null`     | `null`                 | (get/set)<br><br>Función que convierte cada elemento en una fila de `WUIList` (`item => ({ id, data, ... })`). |
| listButtons              | `array`              | `[]`                   | (get/set)<br><br>Botones de fila de `WUIList` (propiedad `buttons`). Con `removable`, se agrega un botón de eliminar. |
| listButtonsStyle         | `string`             | `"stretch"`            | (get/set)<br><br>Estilo de los botones de fila de `WUIList`: `round` o `stretch`. |
| tableColumns             | `array`              | `[]`                   | (get/set)<br><br>Columnas de `WUITable` (propiedad `columns`). |
| tableRowFormat           | `function\|null`     | `null`                 | (get/set)<br><br>Función que convierte cada elemento en una fila de `WUITable` (`item => ({ id, data, ... })`). |
| tableSortable            | `boolean`            | `true`                 | (get/set)<br><br>Permite ordenar las columnas de la tabla. |
| tableResizable           | `boolean`            | `true`                 | (get/set)<br><br>Permite redimensionar las columnas de la tabla. |
| tableDraggable           | `boolean`            | `true`                 | (get/set)<br><br>Permite mover las columnas de la tabla. |
| tableSelectable          | `boolean`            | `true`                 | (get/set)<br><br>Permite seleccionar filas de la tabla. `removable` también lo activa. |
| pageable                 | `boolean`            | `true`                 | (get/set)<br><br>Muestra los botones de página anterior y siguiente. |
| paging                   | `number`             | `0`                    | (get/set)<br><br>Elementos por página. `0` muestra todos en una sola página. |
| page                     | `number`             | `0`                    | (get)<br><br>Página actual, desde `0`. |
| pages                    | `number`             | `1`                    | (get)<br><br>Cantidad de páginas. |
| total                    | `number`             | `0`                    | (get)<br><br>Cantidad total de elementos (después de búsqueda y filtros). |
| searchable               | `boolean`            | `true`                 | (get/set)<br><br>Muestra el campo de búsqueda. |
| searchKey                | `string`             | `""`                   | (get)<br><br>Texto de búsqueda actual. |
| searchDelay              | `number`             | `300`                  | (get/set)<br><br>Espera en milisegundos entre la última tecla y la búsqueda. |
| searchStaticMatch        | `function\|null`     | `null`                 | (get/set)<br><br>Función de coincidencia para datos locales (`(item, key) => boolean`). Si es `null`, se busca `key` en los valores de texto y número de cada elemento. |
| filterable               | `boolean`            | `false`                | (get/set)<br><br>Muestra el botón de filtro y crea el modal de filtros. |
| filterInputs             | `array`              | `[]`                   | (get/set)<br><br>Campos del formulario de filtros, como lista plana de ítems de `WUIForm`; cada ítem `legend` abre un `<fieldset>` nuevo. Los campos de tipo `wui-selectpicker`, `wui-datepicker`, `wui-timepicker`, `wui-colorpicker` y `wui-switch` crean su componente; `properties` se pasa a su constructor. |
| applyButtonText          | `string`             | `""`                   | (get/set)<br><br>Texto del botón aplicar del modal de filtros. |
| applyButtonTextData      | `object`             | `{}`                   | (get/set)<br><br>Atributos `data-*` del texto del botón aplicar. |
| clearButtonText          | `string`             | `""`                   | (get/set)<br><br>Texto del botón limpiar del modal de filtros. |
| clearButtonTextData      | `object`             | `{}`                   | (get/set)<br><br>Atributos `data-*` del texto del botón limpiar. |
| addable                  | `boolean`            | `false`                | (get/set)<br><br>Muestra el botón agregar. En pantallas bajo 768px de ancho, si el menú tiene opciones propias, el botón se mueve al menú. |
| addButtonIconClass       | `string`             | `""`                   | (get/set)<br><br>Clase CSS del ícono del botón agregar. Si está vacía, se usa `wui-icon plus-line`. |
| addButtonText            | `string`             | `""`                   | (get/set)<br><br>Texto del botón agregar. |
| addButtonTextData        | `object`             | `{}`                   | (get/set)<br><br>Atributos `data-*` del texto del botón agregar. |
| removable                | `boolean`            | `false`                | (get/set)<br><br>Muestra el botón eliminar (oculto bajo 768px de ancho) y agrega un botón de eliminar a las filas de la lista, con el color `--wui-list-button-bgcolor-danger`. |
| removeButtonIconClass    | `string`             | `""`                   | (get/set)<br><br>Clase CSS del ícono del botón eliminar. Si está vacía, se usa `wui-icon trash-line` (`trash-fill` en las filas de la lista). |
| removeButtonOutlined     | `boolean`            | `true`                 | (get/set)<br><br>Muestra el botón eliminar de la cabecera con estilo de contorno (`outlined` de `WUIButton`). |
| menuSelectPageText       | `string`             | `""`                   | (get/set)<br><br>Texto de la opción de menú "seleccionar página". |
| menuSelectPageTextData   | `object`             | `{}`                   | (get/set)<br><br>Atributos `data-*` de la opción "seleccionar página". |
| menuSelectAllText        | `string`             | `""`                   | (get/set)<br><br>Texto de la opción de menú "seleccionar todo". |
| menuSelectAllTextData    | `object`             | `{}`                   | (get/set)<br><br>Atributos `data-*` de la opción "seleccionar todo". |
| menuUnselectPageText     | `string`             | `""`                   | (get/set)<br><br>Texto de la opción de menú "deseleccionar página". |
| menuUnselectPageTextData | `object`             | `{}`                   | (get/set)<br><br>Atributos `data-*` de la opción "deseleccionar página". |
| menuUnselectAllText      | `string`             | `""`                   | (get/set)<br><br>Texto de la opción de menú "deseleccionar todo". |
| menuUnselectAllTextData  | `object`             | `{}`                   | (get/set)<br><br>Atributos `data-*` de la opción "deseleccionar todo". |
| message                  | `string`             | `""`                   | (get/set)<br><br>Sin uso en la versión `0.1`. Usa `messageText`. |
| messageText              | `string`             | `""`                   | (get/set)<br><br>Texto que se muestra cuando no hay elementos. |
| messageData              | `object`             | `{}`                   | (get/set)<br><br>Atributos `data-*` del texto sin elementos (por ejemplo, `{ key: "messages.empty" }` para `WUILanguage`). |
| onPrint                  | `function\|null`     | `null`                 | (get/set)<br><br>Función que se ejecuta después de mostrar una página. Recibe `(page, pages, total)`. |
| onFilter                 | `function\|null`     | `null`                 | (get/set)<br><br>Función que se ejecuta al abrir o cerrar el modal de filtros. Recibe `(opened)`. |
| onAdd                    | `function\|null`     | `null`                 | (get/set)<br><br>Función que se ejecuta al presionar agregar (botón u opción de menú). |
| onRemove                 | `function\|null`     | `null`                 | (get/set)<br><br>Función que se ejecuta al eliminar. Recibe un arreglo con los ids seleccionados en la tabla, o con el id de la fila de la lista. |
| onChoose                 | `function\|null`     | `null`                 | (get/set)<br><br>Función que se ejecuta al elegir un elemento (clic en la lista o doble clic en la tabla). Recibe `(index, id, enabled, item)`, donde `item` es el elemento original de `data`. |
| onSelectOption           | `function\|null`     | `null`                 | (get/set)<br><br>Función que se ejecuta al elegir una opción propia del menú (`options`). Recibe `(value)`. |

## Métodos de la Instancia

| Método                  | Tipo retorno    | Descripción |
| ----------------------- | --------------- | ----------- |
| getElement              | `HTMLElement`   | `getElement()`<br><br>Retorna el elemento HTML de la vista. |
| getModal                | `WUIModal`      | `getModal()`<br><br>Retorna el objeto `WUIModal` de filtros, o `null` si `filterable` es `false`. |
| getModalForm            | `WUIForm`       | `getModalForm()`<br><br>Retorna el objeto `WUIForm` de filtros. |
| getMainForm             | `WUIForm`       | `getMainForm()`<br><br>Retorna el objeto `WUIForm` principal. |
| getPageItems            | `array`         | `getPageItems()`<br><br>Retorna los elementos de la página actual. |
| init                    | `void`          | `init()`<br><br>Inicializa el objeto y carga la primera página. |
| load                    | `Promise<void>` | `load()`<br><br>Carga y muestra la página actual. Con `data` de tipo función, consulta los datos; si la página ya no existe, carga la última. |
| print                   | `void`          | `print()`<br><br>Muestra los elementos cargados y actualiza paginación, selección, menú y mensaje sin elementos. |
| search                  | `void`          | `search([key])`<br><br>Parámetros:<br>**• key:** `string` *opcional*, texto de búsqueda.<br><br>Busca desde la primera página. Si el texto no cambia, no hace nada. |
| refreshFilterComponents | `void`          | `refreshFilterComponents()`<br><br>Aplica `lang` y `locale` a los componentes de los filtros, después de cambiar esas propiedades. Los filtros `wui-selectpicker` con `properties.options` reciben de nuevo esas opciones, conservando su valor, salvo los que tienen opciones sin `text` (por ejemplo, traducidas con `textData`), que `setLang` ya traduce. |
| goPage                  | `void`          | `goPage(page)`<br><br>Parámetros:<br>**• page:** `number`, página desde `0`.<br><br>Muestra la página indicada. |
| firstPage               | `void`          | `firstPage()`<br><br>Muestra la primera página. |
| lastPage                | `void`          | `lastPage()`<br><br>Muestra la última página. |
| prevPage                | `void`          | `prevPage()`<br><br>Muestra la página anterior. |
| nextPage                | `void`          | `nextPage()`<br><br>Muestra la página siguiente. |
| hasPrevPage             | `boolean`       | `hasPrevPage()`<br><br>Retorna si existe una página anterior. |
| hasNextPage             | `boolean`       | `hasNextPage()`<br><br>Retorna si existe una página siguiente. |
| closeModal              | `void`          | `closeModal()`<br><br>Cierra el modal de filtros. |
| resize                  | `void`          | `resize(side, width)`<br><br>Parámetros:<br>**• side:** `string`, `left` o `right`; debe coincidir con `modalSlidePosition`.<br>**• width:** `number`, ancho en píxeles.<br><br>Cambia el ancho del modal de filtros en modo `slidepage`. |
| reset                   | `void`          | `reset()`<br><br>Limpia la búsqueda, la selección y la página, y vuelve a cargar los datos. |

## Variables CSS

| Variable                                         | Descripción |
| ------------------------------------------------ | ----------- |
| `--wuiview-datalist-header-button-width`         | Ancho de los botones de la cabecera. |
| `--wuiview-datalist-header-button-height`        | Alto de los botones de la cabecera. Con `WUIPluginBodyTheme` toma el valor de `--wui-form-input-height`, para igualar el alto del campo de búsqueda. |
| `--wuiview-datalist-mobile-header-button-width`  | Ancho de los botones de la cabecera en móvil (ancho de pantalla menor a 768px). |
| `--wuiview-datalist-mobile-header-button-height` | Alto de los botones de la cabecera en móvil (ancho de pantalla menor a 768px); también es el alto del campo de búsqueda. |

```css
:root {
	--wuiview-datalist-header-button-width: 40px;
	--wuiview-datalist-header-button-height: 32px;
	--wuiview-datalist-mobile-header-button-width: 34px;
	--wuiview-datalist-mobile-header-button-height: 34px;
}
```

El resto de su apariencia depende de las variables de `WUIForm`, `WUIButton`, `WUIModal`, `WUIList` y `WUITable`. Con `WUIPluginBodyTheme`, el plugin asigna estas variables, por lo que no es necesario cargar `wuiview-datalist-0.1.root.css`. En móvil, el campo de búsqueda de la cabecera toma el alto de los botones de la cabecera (`--wuiview-datalist-mobile-header-button-height`), sin afectar a los demás campos de formulario. El campo de búsqueda tiene la clase `stack`, por lo que conserva su forma con cualquier `formFieldMode` (no toma la columna de etiqueta de los campos en fila). Sin elementos, el botón agregar deja de estar unido (`join` en `false`) y se muestra centrado, fuera del grupo de la cabecera.

## Implementación

Cabecera HTML:

```html
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/datalist/wuiview-datalist-0.1.root.css">
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/datalist/wuiview-datalist-0.1.css">
<script type="text/javascript" src="./libraries/wui-js/views/datalist/wuiview-datalist-0.1.js"></script>
```

Código HTML:

```html
<div class="wuiview-datalist users"></div>
```

Código JS:

```js
const init = () => {
	const datalist = new WUIViewDatalist({
		selector: ".wuiview-datalist.users",
		type: "dual",
		data: async ({ page, paging, key }) => {
			const response = await fetch(`/api/users?offset=${page * paging}&limit=${paging}&search=${key}`);
			const { items, total } = await response.json();
			return { items, total };
		},
		listColumns: [
			{ align: "left" }
		],
		listRowFormat: user => ({
			id: user.code,
			data: [user.nickname]
		}),
		tableColumns: [
			{ label: "Usuario" },
			{ label: "Correo" }
		],
		tableRowFormat: user => ({
			id: user.code,
			data: [user.nickname, user.email]
		}),
		paging: 20,
		addable: true,
		addButtonText: "Agregar",
		removable: true,
		messageText: "No hay usuarios.",
		onChoose: (index, id, enabled, user) => {
			console.log(user);
		},
		onAdd: () => {},
		onRemove: ids => {
			console.log(ids);
		}
	});
	datalist.init();
};

window.addEventListener("DOMContentLoaded", init);
```

> [!NOTE]
> Las hojas de estilo y scripts de las clases de `wuijs-main-lib` listadas en **Dependencias** deben cargarse antes que la vista.
