[English](wuiview-message-en.md) | [Español](wuiview-message-es.md)

[wuijs-views-lib](../../README-en.md)

# WUIViewMessage

Version: `0.1`

Modal message view (information, confirmation, warning, error, etc.) with icon, text and cancel and accept buttons.

## Sources

| Type | File |
|:----:| ---- |
| JS   | [src/wui-js/views/message/wuiview-message-0.1.js](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/message/wuiview-message-0.1.js) |
| CSS  | [src/wui-js/views/message/wuiview-message-0.1.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/message/wuiview-message-0.1.css) |
| CSS  | [src/wui-js/views/message/wuiview-message-0.1.root.css](https://github.com/wui-js/wuijs-views-lib/blob/main/src/wui-js/views/message/wuiview-message-0.1.root.css) |

## Dependencies

| Class       | Version | Description |
| ----------- |:-------:| ----------- |
| `WUIModal`  | `0.13`  | Modal in `message` mode that holds the view. Required. |
| `WUIButton` | `0.16`  | Cancel and accept buttons. Required. |
| `WUIIcon`   | `0.14`  | Message and accept button icons. Required. |
| `WUIFade`   | `0.7`   | Accept button loading icon animation (`acceptButtonLockOnAccept`). Required. |

## Constructor

| Type           | Description |
| -------------- | ----------- |
| WUIViewMessage | `WUIViewMessage([properties])`<br><br>Arguments:<br>**• properties:** `object` *optional* |

The constructor creates the modal (`div.wui-modal.message`) at the end of `<body>` when no element with the `modalId` id exists.

## Properties

| Property                 | Type             | Default value         | Description |
| ------------------------ | ---------------- | --------------------- | ----------- |
| selector                 | `string`         | `".wuiview-message"`  | (get/set)<br><br>CSS selector of the `HTMLDivElement` element that identifies the view. |
| lang                     | `string`         | `"en"`                | (get/set)<br><br>2-letter language code. |
| modalId                  | `string`         | `null`                | (get/set)<br><br>Modal id. If `null`, it is generated automatically (`wuiviewMessage{N}Modal`). |
| modalOverlay             | `boolean`        | `true`                | (get/set)<br><br>Shows the modal overlay background. |
| modalPriority            | `boolean`        | `true`                | (get/set)<br><br>Modal priority over other open modals. |
| modalSelector            | `string`         | `"#{modalId}"`        | (get)<br><br>CSS selector of the modal. |
| cancelButtonHidden       | `boolean`        | `false`               | (get/set)<br><br>Hides the cancel button. The `offline`, `invalid`, `error` and `success` types always hide it. |
| cancelButtonText         | `string`         | `""`                  | (get/set)<br><br>Cancel button text. |
| cancelButtonTextData     | `object`         | `{}`                  | (get/set)<br><br>`data-*` attributes of the cancel button text (for example, `{ key: "buttons.cancel" }` for `WUILanguage`). |
| acceptButtonHidden       | `boolean`        | `false`               | (get/set)<br><br>Hides the accept button. |
| acceptButtonText         | `string`         | `""`                  | (get/set)<br><br>Accept button text. |
| acceptButtonTextData     | `object`         | `{}`                  | (get/set)<br><br>`data-*` attributes of the accept button text. |
| acceptButtonWarning      | `boolean`        | `false`               | (get/set)<br><br>Shows the accept button with warning style. The `warning` and `delete` types always apply it. |
| acceptButtonLockOnAccept | `boolean`        | `false`               | (get/set)<br><br>On accept, disables and locks the accept button with a loading icon and keeps the modal open. Closing is left to `onAccept`. |
| onAccept                 | `function\|null` | `null`                | (get/set)<br><br>Function executed when the accept button is pressed. |
| onCancel                 | `function\|null` | `null`                | (get/set)<br><br>Function executed when the cancel button is pressed. |
| onClose                  | `function\|null` | `null`                | (get/set)<br><br>Function executed when the modal is closed. |

## Instance Methods

| Method   | Return type | Description |
| -------- | ----------- | ----------- |
| init     | `void`      | `init()`<br><br>Initializes the object. |
| open     | `void`      | `open(type[, options])`<br><br>Arguments:<br>**• type:** `string`, message type. Sets the icon and the button state: `info`, `invalid`, `offline`, `error`, `privacy`, `confirm`, `warning`, `delete`, `success`, `download` or `signout`.<br>**• options:** `object` *optional*, message options. Each option replaces the property of the same name for this opening only: `text`, `detail`, `iconClass`, `cancelButtonHidden`, `cancelButtonText`, `acceptButtonHidden`, `acceptButtonText`, `acceptButtonWarning`, `acceptButtonLockOnAccept` (alias `lockOnAccept`), `onAccept`, `onCancel` and `onClose`.<br><br>Opens the modal with the message. `detail` is added as a paragraph below `text`. |
| close    | `void`      | `close()`<br><br>Closes the modal. |
| isOpen   | `boolean`   | `isOpen()`<br><br>Returns whether the modal is open. |
| getModal | `WUIModal`  | `getModal()`<br><br>Returns the view's `WUIModal` object. |

## CSS Variables

The class defines no CSS variables of its own. Its appearance depends on the `WUIModal` and `WUIButton` variables.

## Implementation

HTML header:

```html
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/message/wuiview-message-0.1.root.css">
<link type="text/css" rel="stylesheet" href="./libraries/wui-js/views/message/wuiview-message-0.1.css">
<script type="text/javascript" src="./libraries/wui-js/views/message/wuiview-message-0.1.js"></script>
```

HTML code:

```html
<div class="wuiview-message"></div>
```

JS code:

```js
const init = () => {
	const message = new WUIViewMessage({
		selector: ".wuiview-message",
		cancelButtonText: "Cancel",
		acceptButtonText: "Accept"
	});
	message.init();
	message.open("delete", {
		text: "Delete the document?",
		detail: "This action cannot be undone.",
		onAccept: () => {
			console.log("accepted");
		}
	});
};

window.addEventListener("DOMContentLoaded", init);
```

> [!NOTE]
> The stylesheets and scripts of the `wuijs-main-lib` classes listed in **Dependencies** must be loaded before the view.
