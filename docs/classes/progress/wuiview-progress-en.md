[English](wuiview-progress-en.md) | [Español](wuiview-progress-es.md)

[wuijs-views-lib](../../README-en.md)

# WUIViewProgress

Version: `0.1`

Modal progress view with label, `<progress>` bar (determinate or indeterminate), text and cancel button.

## Sources

| Type | File |
|:----:| ---- |
| JS   | [src/wui-js/views/progress/wuiview-progress-0.1.js](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/progress/wuiview-progress-0.1.js) |
| CSS  | [src/wui-js/views/progress/wuiview-progress-0.1.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/progress/wuiview-progress-0.1.css) |
| CSS  | [src/wui-js/views/progress/wuiview-progress-0.1.root.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/progress/wuiview-progress-0.1.root.css) |

## Dependencies

| Class       | Version | Description |
| ----------- |:-------:| ----------- |
| `WUIModal`  | `0.14`  | Modal in `message` mode that holds the view. Required. |
| `WUIButton` | `0.17`  | Cancel button. Required. |
| `WUIForm`   | `0.16`  | Styles of the form that holds the progress bar (CSS only; the view does not instantiate `WUIForm`). Required. |

## Constructor

| Type            | Description |
| --------------- | ----------- |
| WUIViewProgress | `WUIViewProgress([properties])`<br><br>Arguments:<br>**• properties:** `object` *optional* |

The constructor creates the modal (`div.wui-modal.message`) at the end of `<body>` when no element with the `modalId` id exists.

## Properties

| Property              | Type             | Default value         | Description |
| --------------------- | ---------------- | --------------------- | ----------- |
| selector              | `string`         | `".wuiview-progress"` | (get/set)<br><br>CSS selector of the `HTMLDivElement` element that identifies the view. |
| lang                  | `string`         | `"en"`                | (get/set)<br><br>2-letter language code. |
| modalId               | `string`         | `null`                | (get/set)<br><br>Modal id. If `null`, it is generated automatically (`wuiviewProgress{N}Modal`). |
| modalOverlay          | `boolean`        | `true`                | (get/set)<br><br>Shows the modal overlay background. |
| modalPriority         | `boolean`        | `true`                | (get/set)<br><br>Modal priority over other open modals. |
| modalSelector         | `string`         | `"#{modalId}"`        | (get)<br><br>CSS selector of the modal. |
| formFieldStyle        | `string`         | `"fill"`              | (get/set)<br><br>Form field style: `fill`, `roundfill`, `border`, `roundborder` or `line` (equivalent to `WUIForm`'s `fieldStyle`). |
| labelText             | `string`         | `""`                  | (get/set)<br><br>Label text above the progress bar. |
| labelTextData         | `object`         | `{}`                  | (get/set)<br><br>`data-*` attributes of the label (for example, `{ key: "progress.label" }` for `WUILanguage`). |
| cancelButtonHidden    | `boolean`        | `false`               | (get/set)<br><br>Hides the cancel button. |
| cancelButtonText      | `string`         | `""`                  | (get/set)<br><br>Cancel button text. |
| cancelButtonTextData  | `object`         | `{}`                  | (get/set)<br><br>`data-*` attributes of the cancel button text. |
| onOpen                | `function\|null` | `null`                | (get/set)<br><br>Function executed when the modal is opened. |
| onCancel              | `function\|null` | `null`                | (get/set)<br><br>Function executed when the cancel button is pressed. |
| onReady               | `function\|null` | `null`                | (get/set)<br><br>Function executed only once, when the value reaches the total. |
| onClose               | `function\|null` | `null`                | (get/set)<br><br>Function executed when the modal is closed. |
| total                 | `number`         | `0`                   | (get)<br><br>Bar total for the current opening. `0` means an indeterminate bar. |
| value                 | `number`         | `0`                   | (get)<br><br>Current bar value. |

## Instance Methods

| Method   | Return type | Description |
| -------- | ----------- | ----------- |
| init     | `void`      | `init()`<br><br>Initializes the object. |
| open     | `void`      | `open([options])`<br><br>Arguments:<br>**• options:** `object` *optional*, opening options: `total`, `value`, `labelText`, `text`, `detail`, `cancelButtonHidden`, `cancelButtonText`, `onOpen`, `onCancel`, `onReady` and `onClose`. Each option replaces the property of the same name for this opening only.<br><br>Opens the modal. If `total` is greater than `0`, the bar is determinate; otherwise it is indeterminate. |
| update   | `void`      | `update(value[, total])`<br><br>Arguments:<br>**• value:** `number`, current value.<br>**• total:** `number` *optional*, new total.<br><br>Updates the bar (the value is clamped between `0` and the total) and executes `onReady` the first time the value reaches the total. Has no effect on an indeterminate bar. |
| setText  | `void`      | `setText(value)`<br><br>Arguments:<br>**• value:** `string`, HTML text.<br><br>Replaces the text below the bar. |
| close    | `void`      | `close()`<br><br>Closes the modal. On close, the label and cancel button are reset to their initial texts. |
| isOpen   | `boolean`   | `isOpen()`<br><br>Returns whether the modal is open. |
| getModal | `WUIModal`  | `getModal()`<br><br>Returns the view's `WUIModal` object. |

## CSS Variables

The class defines no CSS variables of its own. Its appearance depends on the `WUIModal`, `WUIForm` and `WUIButton` variables.

## Implementation

HTML header:

```html
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/progress/wuiview-progress-0.1.root.css">
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/progress/wuiview-progress-0.1.css">
<script type="text/javascript" src="./libraries/wui-js/views/progress/wuiview-progress-0.1.js"></script>
```

HTML code:

```html
<div class="wuiview-progress"></div>
```

JS code:

```js
const init = () => {
	const progress = new WUIViewProgress({
		selector: ".wuiview-progress",
		labelText: "Downloading",
		cancelButtonText: "Cancel"
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
> The stylesheets and scripts of the `wuijs-main-lib` classes listed in **Dependencies** must be loaded before the view.
