[English](wuiview-datalist-en.md) | [Español](wuiview-datalist-es.md)

[wuijs-views-lib](../../README-en.md)

# WUIViewDatalist

Version: `0.1`

Data listing view with paging, search, modal filters, selection and add and remove buttons, shown as a list (`WUIList`), a table (`WUITable`) or both depending on screen width.

## Sources

| Type | File |
|:----:| ---- |
| JS   | [src/wui-js/views/datalist/wuiview-datalist-0.1.js](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/datalist/wuiview-datalist-0.1.js) |
| CSS  | [src/wui-js/views/datalist/wuiview-datalist-0.1.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/datalist/wuiview-datalist-0.1.css) |
| CSS  | [src/wui-js/views/datalist/wuiview-datalist-0.1.root.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/datalist/wuiview-datalist-0.1.root.css) |

## Dependencies

| Class             | Version | Description |
| ----------------- |:-------:| ----------- |
| `WUIForm`         | `0.15`  | Main form (header and body) and filter form. Required. |
| `WUIButton`       | `0.16`  | Paging, filter, add, remove, apply and clear buttons. Required. |
| `WUISelectpicker` | `0.15`  | Header options menu and `wui-selectpicker` filters. Required. |
| `WUIIcon`         | `0.14`  | Header icons. Required. |
| `WUIList`         | `0.12`  | List presentation (`type` `list` or `dual`). |
| `WUITable`        | `0.13`  | Table presentation (`type` `table` or `dual`). |
| `WUIModal`        | `0.13`  | Filter modal (`filterable`). |
| `WUIDatepicker`   | `0.14`  | `wui-datepicker` filters. |
| `WUITimepicker`   | `0.13`  | `wui-timepicker` filters. |
| `WUIColorpicker`  | `0.14`  | `wui-colorpicker` filters. |
| `WUISwitch`       | `0.10`  | `wui-switch` filters. |

## Constructor

| Type            | Description |
| --------------- | ----------- |
| WUIViewDatalist | `WUIViewDatalist([properties])`<br><br>Arguments:<br>**• properties:** `object` *optional* |

The constructor creates the view's HTML structure inside the `selector` element and, if `filterable` is `true`, the filter modal.

## Class Properties

| Property | Type     | Description |
| -------- | -------- | ----------- |
| version  | `string` | Class version. |
| colors   | `object` | (get)<br><br>`WUIButton` `submit` and `warning` colors, read from the `--wui-button-submit-bgcolor-out` and `--wui-button-warning-bgcolor-out` CSS variables. |

## Properties

| Property                 | Type                 | Default value          | Description |
| ------------------------ | -------------------- | ---------------------- | ----------- |
| selector                 | `string`             | `".wuiview-datalist"`  | (get/set)<br><br>CSS selector of the `HTMLDivElement` element that holds the view. |
| lang                     | `string`             | `"en"`                 | (get/set)<br><br>2-letter language code, used by the filter pickers. |
| locale                   | `string`             | `"en-US"`              | (get/set)<br><br>Locale code (`xx-XX`), used by `wui-datepicker` filters. |
| type                     | `string`             | `"list"`               | (get/set)<br><br>Data presentation: `list` (`WUIList`), `table` (`WUITable`) or `dual` (list below 768px wide and table from 768px). |
| data                     | `array\|function`    | `[]`                   | (get/set)<br><br>Data. An array of objects is paged, searched, filtered and sorted locally. An async function `({ page, paging, key, filters }) => ({ items, total })` delegates paging, search and filters to the server. |
| options                  | `array`              | `[]`                   | (get/set)<br><br>Additional header menu options, in the `WUISelectpicker` option format (`value`, `text`, `iconClass`, etc.). Choosing one executes `onSelectOption`. |
| sort                     | `function\|null`     | `null`                 | (get/set)<br><br>Compare function (`(a, b) => number`). With local data it sorts all filtered items; with function data, the items of each page. |
| active                   | `boolean`            | `true`                 | (get/set)<br><br>Active state of the view. Deactivating it closes the filter modal and reactivating it reopens the modal if it was open. |
| modalId                  | `string`             | `null`                 | (get/set)<br><br>Filter modal id. If `null`, it is generated automatically (`wuiviewDatalist{N}Modal`). |
| modalMode                | `string`             | `"slidepage"`          | (get/set)<br><br>Filter modal mode: `message`, `page`, `smallpage` or `slidepage`. |
| modalSlidePosition       | `string`             | `"right"`              | (get/set)<br><br>Modal side in `slidepage` mode: `left` or `right`. |
| modalFixedMinwidth       | `number`             | `Infinity`             | (get/set)<br><br>Minimum width (from `768`) at which the filter modal stays open and fixed next to the view. `Infinity` disables it. |
| modalOverlay             | `boolean`            | `false`                | (get/set)<br><br>Shows the filter modal overlay background. Does not apply when `modalFixedMinwidth` is set. |
| modalPriority            | `boolean`            | `true`                 | (get/set)<br><br>Filter modal priority over other open modals. |
| modalTitle               | `string`             | `""`                   | (get/set)<br><br>Filter modal title. |
| modalTitleData           | `object`             | `{}`                   | (get/set)<br><br>`data-*` attributes of the modal title (for example, `{ key: "filters.title" }` for `WUILanguage`). |
| modalSelector            | `string`             | `"#{modalId}"`         | (get)<br><br>CSS selector of the filter modal. |
| formFieldStyle           | `string`             | `"fill"`               | (get/set)<br><br>Form field style: `fill`, `roundfill`, `border`, `roundborder` or `line` (equivalent to `WUIForm`'s `fieldStyle`). |
| formHeaderButtonStyle    | `string`             | `"none"`               | (get/set)<br><br>Form header button style: `none` or `join`. |
| formBodyButtonStyle      | `string`             | `"none"`               | (get/set)<br><br>Form body button style: `none` or `join`. |
| formFooterButtonStyle    | `string`             | `"none"`               | (get/set)<br><br>Form footer button style: `none` or `join`. |
| listColumns              | `array`              | `[]`                   | (get/set)<br><br>`WUIList` columns (`columns` property). |
| listRowFormat            | `function\|null`     | `null`                 | (get/set)<br><br>Function that converts each item into a `WUIList` row (`item => ({ id, data, ... })`). |
| listButtons              | `array`              | `[]`                   | (get/set)<br><br>`WUIList` row buttons (`buttons` property). With `removable`, a remove button is added. |
| listButtonsStyle         | `string`             | `"stretch"`            | (get/set)<br><br>`WUIList` row button style: `round` or `stretch`. |
| tableColumns             | `array`              | `[]`                   | (get/set)<br><br>`WUITable` columns (`columns` property). |
| tableRowFormat           | `function\|null`     | `null`                 | (get/set)<br><br>Function that converts each item into a `WUITable` row (`item => ({ id, data, ... })`). |
| tableSortable            | `boolean`            | `true`                 | (get/set)<br><br>Allows sorting the table columns. |
| tableResizable           | `boolean`            | `true`                 | (get/set)<br><br>Allows resizing the table columns. |
| tableDraggable           | `boolean`            | `true`                 | (get/set)<br><br>Allows moving the table columns. |
| tableSelectable          | `boolean`            | `true`                 | (get/set)<br><br>Allows selecting table rows. `removable` also enables it. |
| pageable                 | `boolean`            | `true`                 | (get/set)<br><br>Shows the previous and next page buttons. |
| paging                   | `number`             | `0`                    | (get/set)<br><br>Items per page. `0` shows all items on a single page. |
| page                     | `number`             | `0`                    | (get)<br><br>Current page, from `0`. |
| pages                    | `number`             | `1`                    | (get)<br><br>Number of pages. |
| total                    | `number`             | `0`                    | (get)<br><br>Total number of items (after search and filters). |
| searchable               | `boolean`            | `true`                 | (get/set)<br><br>Shows the search field. |
| searchKey                | `string`             | `""`                   | (get)<br><br>Current search text. |
| searchDelay              | `number`             | `300`                  | (get/set)<br><br>Wait in milliseconds between the last keystroke and the search. |
| searchStaticMatch        | `function\|null`     | `null`                 | (get/set)<br><br>Match function for local data (`(item, key) => boolean`). If `null`, `key` is searched in the text and number values of each item. |
| filterable               | `boolean`            | `false`                | (get/set)<br><br>Shows the filter button and creates the filter modal. |
| filterInputs             | `array`              | `[]`                   | (get/set)<br><br>Filter form fields, in the `WUIForm` `bodyItems` format. Fields of type `wui-selectpicker`, `wui-datepicker`, `wui-timepicker`, `wui-colorpicker` and `wui-switch` create their component; `properties` is passed to its constructor. |
| applyButtonText          | `string`             | `""`                   | (get/set)<br><br>Filter modal apply button text. |
| applyButtonTextData      | `object`             | `{}`                   | (get/set)<br><br>`data-*` attributes of the apply button text. |
| clearButtonText          | `string`             | `""`                   | (get/set)<br><br>Filter modal clear button text. |
| clearButtonTextData      | `object`             | `{}`                   | (get/set)<br><br>`data-*` attributes of the clear button text. |
| addable                  | `boolean`            | `false`                | (get/set)<br><br>Shows the add button. On screens below 768px wide, if the menu has its own options, the button moves into the menu. |
| addButtonIconClass       | `string`             | `""`                   | (get/set)<br><br>CSS class of the add button icon. If empty, `wui-icon plus-line` is used. |
| addButtonText            | `string`             | `""`                   | (get/set)<br><br>Add button text. |
| addButtonTextData        | `object`             | `{}`                   | (get/set)<br><br>`data-*` attributes of the add button text. |
| removable                | `boolean`            | `false`                | (get/set)<br><br>Shows the remove button (hidden below 768px wide) and adds a remove button to the list rows. |
| removeButtonIconClass    | `string`             | `""`                   | (get/set)<br><br>CSS class of the remove button icon. If empty, `wui-icon trash-line` is used (`trash-fill` in the list rows). |
| menuSelectPageText       | `string`             | `""`                   | (get/set)<br><br>Text of the "select page" menu option. |
| menuSelectPageTextData   | `object`             | `{}`                   | (get/set)<br><br>`data-*` attributes of the "select page" option. |
| menuSelectAllText        | `string`             | `""`                   | (get/set)<br><br>Text of the "select all" menu option. |
| menuSelectAllTextData    | `object`             | `{}`                   | (get/set)<br><br>`data-*` attributes of the "select all" option. |
| menuUnselectPageText     | `string`             | `""`                   | (get/set)<br><br>Text of the "unselect page" menu option. |
| menuUnselectPageTextData | `object`             | `{}`                   | (get/set)<br><br>`data-*` attributes of the "unselect page" option. |
| menuUnselectAllText      | `string`             | `""`                   | (get/set)<br><br>Text of the "unselect all" menu option. |
| menuUnselectAllTextData  | `object`             | `{}`                   | (get/set)<br><br>`data-*` attributes of the "unselect all" option. |
| message                  | `string`             | `""`                   | (get/set)<br><br>Unused in version `0.1`. Use `messageText`. |
| messageText              | `string`             | `""`                   | (get/set)<br><br>Text shown when there are no items. |
| messageData              | `object`             | `{}`                   | (get/set)<br><br>`data-*` attributes of the no-items text (for example, `{ key: "messages.empty" }` for `WUILanguage`). |
| onPrint                  | `function\|null`     | `null`                 | (get/set)<br><br>Function executed after a page is shown. Receives `(page, pages, total)`. |
| onFilter                 | `function\|null`     | `null`                 | (get/set)<br><br>Function executed when the filter modal opens or closes. Receives `(opened)`. |
| onAdd                    | `function\|null`     | `null`                 | (get/set)<br><br>Function executed when add is pressed (button or menu option). |
| onRemove                 | `function\|null`     | `null`                 | (get/set)<br><br>Function executed on remove. Receives an array with the ids selected in the table, or with the id of the list row. |
| onChoose                 | `function\|null`     | `null`                 | (get/set)<br><br>Function executed when an item is chosen (click on the list or double click on the table). Receives `(index, id, enabled, item)`, where `item` is the original `data` item. |
| onSelectOption           | `function\|null`     | `null`                 | (get/set)<br><br>Function executed when one of the menu's own options (`options`) is chosen. Receives `(value)`. |

## Instance Methods

| Method                  | Return type     | Description |
| ----------------------- | --------------- | ----------- |
| getElement              | `HTMLElement`   | `getElement()`<br><br>Returns the view's HTML element. |
| getModal                | `WUIModal`      | `getModal()`<br><br>Returns the filter `WUIModal` object, or `null` if `filterable` is `false`. |
| getModalForm            | `WUIForm`       | `getModalForm()`<br><br>Returns the filter `WUIForm` object. |
| getMainForm             | `WUIForm`       | `getMainForm()`<br><br>Returns the main `WUIForm` object. |
| getPageItems            | `array`         | `getPageItems()`<br><br>Returns the items of the current page. |
| init                    | `void`          | `init()`<br><br>Initializes the object and loads the first page. |
| load                    | `Promise<void>` | `load()`<br><br>Loads and shows the current page. With function `data`, it queries the data; if the page no longer exists, it loads the last one. |
| print                   | `void`          | `print()`<br><br>Shows the loaded items and updates paging, selection, menu and the no-items message. |
| search                  | `void`          | `search([key])`<br><br>Arguments:<br>**• key:** `string` *optional*, search text.<br><br>Searches from the first page. If the text does not change, it does nothing. |
| refreshFilterComponents | `void`          | `refreshFilterComponents()`<br><br>Applies `lang` and `locale` to the filter components, after those properties change. |
| goPage                  | `void`          | `goPage(page)`<br><br>Arguments:<br>**• page:** `number`, page from `0`.<br><br>Shows the given page. |
| firstPage               | `void`          | `firstPage()`<br><br>Shows the first page. |
| lastPage                | `void`          | `lastPage()`<br><br>Shows the last page. |
| prevPage                | `void`          | `prevPage()`<br><br>Shows the previous page. |
| nextPage                | `void`          | `nextPage()`<br><br>Shows the next page. |
| hasPrevPage             | `boolean`       | `hasPrevPage()`<br><br>Returns whether a previous page exists. |
| hasNextPage             | `boolean`       | `hasNextPage()`<br><br>Returns whether a next page exists. |
| closeModal              | `void`          | `closeModal()`<br><br>Closes the filter modal. |
| resize                  | `void`          | `resize(side, width)`<br><br>Arguments:<br>**• side:** `string`, `left` or `right`; must match `modalSlidePosition`.<br>**• width:** `number`, width in pixels.<br><br>Changes the filter modal width in `slidepage` mode. |
| reset                   | `void`          | `reset()`<br><br>Clears the search, the selection and the page, and reloads the data. |

## CSS Variables

The class defines no CSS variables of its own. Its appearance depends on the `WUIForm`, `WUIButton`, `WUIModal`, `WUIList` and `WUITable` variables.

## Implementation

HTML header:

```html
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/datalist/wuiview-datalist-0.1.root.css">
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/datalist/wuiview-datalist-0.1.css">
<script type="text/javascript" src="./libraries/wui-js/views/datalist/wuiview-datalist-0.1.js"></script>
```

HTML code:

```html
<div class="wuiview-datalist users"></div>
```

JS code:

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
			{ label: "User" },
			{ label: "Email" }
		],
		tableRowFormat: user => ({
			id: user.code,
			data: [user.nickname, user.email]
		}),
		paging: 20,
		addable: true,
		addButtonText: "Add",
		removable: true,
		messageText: "There are no users.",
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
> The stylesheets and scripts of the `wuijs-main-lib` classes listed in **Dependencies** must be loaded before the view.
