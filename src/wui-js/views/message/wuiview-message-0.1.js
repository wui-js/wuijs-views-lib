/*
 * @file wuiview-message-0.1.js
 * @class WUIViewMessage
 * @version 0.1
 * @author Sergio E. Belmar V. (wuijs.project@gmail.com)
 * @copyright Sergio E. Belmar V. (wuijs.project@gmail.com)
 */

class WUIViewMessage {

	static version = "0.1";
	static #defaults = {
		selector: ".wuiview-message",
		lang: "en",
		modalId: null,
		modalOverlay: true,
		modalPriority: true,
		cancelButtonHidden: false,
		cancelButtonText: "",
		cancelButtonTextData: {},
		acceptButtonHidden: false,
		acceptButtonText: "",
		acceptButtonTextData: {},
		acceptButtonWarning: false,
		acceptButtonLockOnAccept: false,
		onAccept: null,
		onCancel: null,
		onClose: null
	};
	static #icons = {
		info: "info-circle-line",
		invalid: "exclamation-circle-line",
		offline: "cloud-slash-line",
		error: "error-circle-line",
		privacy: "shield-check-line",
		confirm: "question-circle-line",
		warning: "warning-triangle-line",
		delete: "trash-line",
		success: "check-circle-line",
		download: "cloud-download-line",
		signout: "logout-line"
	};
	static #cancelButtonHiddenTypes = /^(offline|invalid|error|success)$/;
	static #acceptButtonWarningTypes = /^(warning|delete)$/;
	static #autoId = 1;

	#properties = {};
	#htmlElement;
	#htmlElements = {
		modal: null,
		modalBox: null,
		modalBody: null,
		modalIcon: null,
		modalText: null,
		modalFooter: null,
		cancelButton: null,
		acceptButton: null,
		acceptButtonIcon: null
	};
	#wuiComponents = {
		modal: null,
		cancelButton: null,
		acceptButton: null
	};
	#current = {
		acceptButtonLockOnAccept: false,
		onAccept: null,
		onCancel: null,
		onClose: null
	};

	constructor(properties = {}) {
		const defaults = structuredClone(WUIViewMessage.#defaults);
		Object.entries(defaults).forEach(([key, value]) => {
			this[key] = key in properties ? properties[key] : value;
		});
		if (!this.modalId) {
			this.modalId = `wuiviewMessage${WUIViewMessage.#autoId}Modal`;
			WUIViewMessage.#autoId++;
		}
		this.#properties.modalSelector = "#" + this.modalId;
		this.#initHtml();
	}

	get selector() {
		return this.#properties.selector;
	}

	get lang() {
		return this.#properties.lang;
	}

	get modalId() {
		return this.#properties.modalId;
	}

	get modalOverlay() {
		return this.#properties.modalOverlay;
	}

	get modalPriority() {
		return this.#properties.modalPriority;
	}

	get modalSelector() {
		return this.#properties.modalSelector;
	}

	get cancelButtonHidden() {
		return this.#properties.cancelButtonHidden;
	}

	get cancelButtonText() {
		return this.#properties.cancelButtonText;
	}

	get cancelButtonTextData() {
		return this.#properties.cancelButtonTextData;
	}

	get acceptButtonHidden() {
		return this.#properties.acceptButtonHidden;
	}

	get acceptButtonText() {
		return this.#properties.acceptButtonText;
	}

	get acceptButtonTextData() {
		return this.#properties.acceptButtonTextData;
	}

	get acceptButtonWarning() {
		return this.#properties.acceptButtonWarning;
	}

	get acceptButtonLockOnAccept() {
		return this.#properties.acceptButtonLockOnAccept;
	}

	get onAccept() {
		return this.#properties.onAccept;
	}

	get onCancel() {
		return this.#properties.onCancel;
	}

	get onClose() {
		return this.#properties.onClose;
	}

	set selector(value) {
		if (typeof (value) === "string" && value !== "") {
			this.#properties.selector = value;
		}
	}

	set lang(value) {
		if (typeof (value) === "string" && value.match(/^\w{2}$/)) {
			this.#properties.lang = value;
		}
	}

	set modalId(value) {
		if (typeof (value) === "string" && value !== "") {
			this.#properties.modalId = value;
		}
	}

	set modalOverlay(value) {
		if (typeof (value) === "boolean") {
			this.#properties.modalOverlay = value;
		}
	}

	set modalPriority(value) {
		if (typeof (value) === "boolean") {
			this.#properties.modalPriority = value;
		}
	}

	set cancelButtonHidden(value) {
		if (typeof (value) === "boolean") {
			this.#properties.cancelButtonHidden = value;
		}
	}

	set cancelButtonText(value) {
		if (typeof (value) === "string") {
			this.#properties.cancelButtonText = value;
		}
	}

	set cancelButtonTextData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.cancelButtonTextData = value;
		}
	}

	set acceptButtonHidden(value) {
		if (typeof (value) === "boolean") {
			this.#properties.acceptButtonHidden = value;
		}
	}

	set acceptButtonText(value) {
		if (typeof (value) === "string") {
			this.#properties.acceptButtonText = value;
		}
	}

	set acceptButtonTextData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.acceptButtonTextData = value;
		}
	}

	set acceptButtonWarning(value) {
		if (typeof (value) === "boolean") {
			this.#properties.acceptButtonWarning = value;
		}
	}

	set acceptButtonLockOnAccept(value) {
		if (typeof (value) === "boolean") {
			this.#properties.acceptButtonLockOnAccept = value;
		}
	}

	set onAccept(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onAccept = value;
		}
	}

	set onCancel(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onCancel = value;
		}
	}

	set onClose(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onClose = value;
		}
	}

	#loadHtml() {
		const modalSel = this.modalSelector;
		this.#htmlElement = document.querySelector(this.selector);
		this.#htmlElements = {
			modal: document.querySelector(modalSel),
			modalBox: document.querySelector(modalSel + " > .box"),
			modalBody: document.querySelector(modalSel + " > .box > .body"),
			modalIcon: document.querySelector(modalSel + " > .box > .body > .icon"),
			modalText: document.querySelector(modalSel + " > .box > .body > .text"),
			modalFooter: document.querySelector(modalSel + " > .box > .footer"),
			cancelButton: document.querySelector(modalSel + " > .box > .footer > .wui-button.cancel"),
			acceptButton: document.querySelector(modalSel + " > .box > .footer > .wui-button.accept"),
			acceptButtonIcon: document.querySelector(modalSel + " > .box > .footer > .wui-button.accept > .wui-icon")
		};
	}

	#buildHtml() {
		const htmlElement = this.#htmlElement;
		const htmlElements = this.#htmlElements;
		if (htmlElement instanceof HTMLDivElement) {
			if (!htmlElements.modal) {
				htmlElements.modal = document.createElement("div");
				htmlElements.modal.id = this.modalId;
				htmlElements.modal.classList.add("wui-modal", "message");
				document.body.append(htmlElements.modal);
			}
			if (!htmlElements.modalBox) {
				htmlElements.modalBox = document.createElement("div");
				htmlElements.modalBox.classList.add("box");
				htmlElements.modal.append(htmlElements.modalBox);
			}
			if (!htmlElements.modalBody) {
				htmlElements.modalBody = document.createElement("div");
				htmlElements.modalBody.classList.add("body");
				htmlElements.modalBox.append(htmlElements.modalBody);
			}
			if (!htmlElements.modalIcon) {
				htmlElements.modalIcon = document.createElement("div");
				htmlElements.modalIcon.classList.add("icon", "wui-icon");
				htmlElements.modalBody.append(htmlElements.modalIcon);
			}
			if (!htmlElements.modalText) {
				htmlElements.modalText = document.createElement("div");
				htmlElements.modalText.classList.add("text");
				htmlElements.modalBody.append(htmlElements.modalText);
			}
			if (!htmlElements.modalFooter) {
				htmlElements.modalFooter = document.createElement("div");
				htmlElements.modalFooter.classList.add("footer");
				htmlElements.modalBox.append(htmlElements.modalFooter);
			}
			if (!htmlElements.cancelButton) {
				htmlElements.cancelButton = document.createElement("button");
				htmlElements.cancelButton.classList.add("wui-button", "cancel");
				htmlElements.modalFooter.append(htmlElements.cancelButton);
			}
			if (!htmlElements.acceptButton) {
				htmlElements.acceptButton = document.createElement("button");
				htmlElements.acceptButton.classList.add("wui-button", "accept");
				htmlElements.modalFooter.append(htmlElements.acceptButton);
			}
			if (!htmlElements.acceptButtonIcon) {
				htmlElements.acceptButtonIcon = document.createElement("div");
				htmlElements.acceptButtonIcon.classList.add("wui-icon", "animation-loarder-ring", "float-left");
				htmlElements.acceptButton.prepend(htmlElements.acceptButtonIcon);
			}
		}
	}

	#buildComponents() {
		const modalSel = this.modalSelector;
		this.#wuiComponents.modal = new WUIModal({
			selector: modalSel,
			mode: "message",
			overlay: this.modalOverlay,
			priority: this.modalPriority
		});
		this.#wuiComponents.cancelButton = new WUIButton({
			selector: modalSel + " > .box > .footer > .wui-button.cancel",
			text: this.cancelButtonText,
			textClass: "wui-language",
			textData: this.cancelButtonTextData,
			flat: true,
			onClick: () => { this.#onCancelClick(); }
		});
		this.#wuiComponents.acceptButton = new WUIButton({
			selector: modalSel + " > .box > .footer > .wui-button.accept",
			text: this.acceptButtonText,
			textClass: "wui-language",
			textData: this.acceptButtonTextData,
			submit: true,
			onClick: () => { this.#onAcceptClick(); }
		});
	}

	#initHtml() {
		this.#loadHtml();
		this.#buildHtml();
	}

	init() {
		const htmlElement = this.#htmlElement;
		if (htmlElement instanceof HTMLDivElement) {
			this.#buildComponents();
			Object.values(this.#wuiComponents).forEach(component => {
				if (component !== null) {
					component.init();
				}
			});
		}
	}

	#onCancelClick() {
		if (typeof (this.#current.onCancel) === "function") {
			this.#current.onCancel();
		}
		this.close();
	}

	#onAcceptClick() {
		const { acceptButtonLockOnAccept, onAccept } = this.#current;
		if (acceptButtonLockOnAccept) {
			this.#enableAcceptButton(false);
			this.#lockAcceptButton(true);
		}
		if (typeof (onAccept) === "function") {
			onAccept();
		}
		if (!acceptButtonLockOnAccept) {
			this.close();
		}
	}

	#enableAcceptButton(enabled) {
		const { acceptButton } = this.#wuiComponents;
		acceptButton.enabled = enabled;
	}

	#lockAcceptButton(locked) {
		const { acceptButton } = this.#wuiComponents;
		const icon = acceptButton.getIcon();
		acceptButton.locked = locked;
		if (locked) {
			icon.wuiFadein();
		} else {
			icon.wuiFadeout();
		}
	}

	open(type, options = {}) {
		const { modal, cancelButton, acceptButton } = this.#wuiComponents;
		const { modalIcon, modalText } = this.#htmlElements;
		const iconClass = options.iconClass || (WUIViewMessage.#icons[type] ? "wui-icon " + WUIViewMessage.#icons[type] : "");
		const cancelButtonHidden = typeof (options.cancelButtonHidden) === "boolean" ? options.cancelButtonHidden : (this.cancelButtonHidden || WUIViewMessage.#cancelButtonHiddenTypes.test(type));
		const cancelButtonInitText = cancelButton.getText().innerHTML;
		const cancelButtonText = typeof (options.cancelButtonText) === "string" ? options.cancelButtonText : cancelButtonInitText;
		const acceptButtonHidden = typeof (options.acceptButtonHidden) === "boolean" ? options.acceptButtonHidden : this.acceptButtonHidden;
		const acceptButtonInitText = acceptButton.getText().innerHTML;
		const acceptButtonText = typeof (options.acceptButtonText) === "string" ? options.acceptButtonText : acceptButtonInitText;
		const acceptButtonWarning = typeof (options.acceptButtonWarning) === "boolean" ? options.acceptButtonWarning : (this.acceptButtonWarning || WUIViewMessage.#acceptButtonWarningTypes.test(type));
		const acceptButtonLockOnAccept = typeof (options.acceptButtonLockOnAccept) === "boolean" ? options.acceptButtonLockOnAccept : (typeof (options.lockOnAccept) === "boolean" ? options.lockOnAccept : this.acceptButtonLockOnAccept);
		this.#current = {
			acceptButtonLockOnAccept,
			onAccept: typeof (options.onAccept) === "function" ? options.onAccept : this.onAccept,
			onCancel: typeof (options.onCancel) === "function" ? options.onCancel : this.onCancel,
			onClose: typeof (options.onClose) === "function" ? options.onClose : this.onClose
		};
		modalIcon.setAttribute("class", "icon " + iconClass);
		modalText.innerHTML = (options.text || "") + (options.detail ? `<p>${options.detail}</p>` : "");
		cancelButton.getElement().innerHTML = cancelButtonText;
		cancelButton.getElement().style.display = cancelButtonHidden ? "none" : "flex";
		acceptButton.getElement().innerHTML = acceptButtonText;
		acceptButton.getElement().style.display = acceptButtonHidden ? "none" : "flex";
		acceptButton.getElement().classList.toggle("warning", acceptButtonWarning);
		acceptButton.enabled = true;
		acceptButton.locked = false;
		acceptButton.getIcon().style.display = "none";
		modal.onOpen = () => {
			if (!acceptButtonHidden) {
				acceptButton.focus();
			} else if (!cancelButtonHidden) {
				cancelButton.focus();
			}
		};
		modal.onClose = () => {
			if (typeof (this.#current.onClose) === "function") {
				this.#current.onClose();
			}
			this.close();
			cancelButton.getElement().innerHTML = cancelButtonInitText;
			acceptButton.getElement().innerHTML = acceptButtonInitText;
		};
		if (!modal.isOpen()) {
			modal.open();
		} else {
			setTimeout(() => {
				acceptButton.getIcon().style.display = "none";
			}, 100);
		}
	}

	close() {
		const { modal } = this.#wuiComponents;
		modal.close();
	}

	isOpen() {
		const { modal } = this.#wuiComponents;
		return modal.isOpen();
	}

	getModal() {
		return this.#wuiComponents.modal;
	}
}
