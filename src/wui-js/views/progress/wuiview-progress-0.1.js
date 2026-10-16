/*
 * @file wuiview-progress-0.1.js
 * @class WUIViewProgress
 * @version 0.1
 * @author Sergio E. Belmar V. (wuijs.project@gmail.com)
 * @copyright Sergio E. Belmar V. (wuijs.project@gmail.com)
 */

class WUIViewProgress {

	static version = "0.1";
	static #defaults = {
		selector: ".wuiview-progress",
		lang: "en",
		modalId: null,
		modalOverlay: true,
		modalPriority: true,
		formFieldStyle: "fill",
		formHeaderButtonStyle: "none",
		formBodyButtonStyle: "none",
		formFooterButtonStyle: "none",
		labelText: "",
		labelTextData: {},
		cancelButtonHidden: false,
		cancelButtonText: "",
		cancelButtonTextData: {},
		onOpen: null,
		onCancel: null,
		onReady: null,
		onClose: null
	};
	static #fieldStyles = {
		fill: ["fill-fields"],
		roundfill: ["fill-fields", "round-fields"],
		border: ["border-fields"],
		roundborder: ["border-fields", "round-fields"],
		line: ["line-fields"]
	};
	static #autoId = 1;

	#properties = {};
	#htmlElement;
	#htmlElements = {
		modal: null,
		modalBox: null,
		modalBody: null,
		form: null,
		formBody: null,
		fieldset: null,
		field: null,
		label: null,
		progress: null,
		text: null,
		modalFooter: null,
		cancelButton: null
	};
	#wuiComponents = {
		modal: null,
		cancelButton: null
	};
	#current = {
		total: 0,
		ready: false,
		labelInitText: "",
		cancelButtonInitText: "",
		onCancel: null,
		onReady: null,
		onClose: null
	};

	constructor(properties = {}) {
		const defaults = structuredClone(WUIViewProgress.#defaults);
		Object.entries(defaults).forEach(([key, value]) => {
			this[key] = key in properties ? properties[key] : value;
		});
		if (!this.modalId) {
			this.modalId = `wuiviewProgress${WUIViewProgress.#autoId}Modal`;
			WUIViewProgress.#autoId++;
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

	get formFieldStyle() {
		return this.#properties.formFieldStyle;
	}

	get formHeaderButtonStyle() {
		return this.#properties.formHeaderButtonStyle;
	}

	get formBodyButtonStyle() {
		return this.#properties.formBodyButtonStyle;
	}

	get formFooterButtonStyle() {
		return this.#properties.formFooterButtonStyle;
	}

	get labelText() {
		return this.#properties.labelText;
	}

	get labelTextData() {
		return this.#properties.labelTextData;
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

	get onOpen() {
		return this.#properties.onOpen;
	}

	get onCancel() {
		return this.#properties.onCancel;
	}

	get onReady() {
		return this.#properties.onReady;
	}

	get onClose() {
		return this.#properties.onClose;
	}

	get total() {
		return this.#current.total;
	}

	get value() {
		const { progress } = this.#htmlElements;
		return progress instanceof HTMLProgressElement && progress.hasAttribute("value") ? progress.value : 0;
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

	set formFieldStyle(value) {
		if (typeof (value) === "string" && value.match(/^(fill|roundfill|border|roundborder|line)$/i)) {
			this.#properties.formFieldStyle = value.toLowerCase();
		}
	}

	set formHeaderButtonStyle(value) {
		if (typeof (value) === "string" && value.match(/^(none|join)$/i)) {
			this.#properties.formHeaderButtonStyle = value.toLowerCase();
		}
	}

	set formBodyButtonStyle(value) {
		if (typeof (value) === "string" && value.match(/^(none|join)$/i)) {
			this.#properties.formBodyButtonStyle = value.toLowerCase();
		}
	}

	set formFooterButtonStyle(value) {
		if (typeof (value) === "string" && value.match(/^(none|join)$/i)) {
			this.#properties.formFooterButtonStyle = value.toLowerCase();
		}
	}

	set labelText(value) {
		if (typeof (value) === "string") {
			this.#properties.labelText = value;
		}
	}

	set labelTextData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.labelTextData = value;
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

	set onOpen(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onOpen = value;
		}
	}

	set onCancel(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onCancel = value;
		}
	}

	set onReady(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onReady = value;
		}
	}

	set onClose(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onClose = value;
		}
	}

	#loadHtml() {
		const modalSel = this.modalSelector;
		const fieldSel = modalSel + " > .box > .body > .wui-form > .body > fieldset";
		this.#htmlElement = document.querySelector(this.selector);
		this.#htmlElements = {
			modal: document.querySelector(modalSel),
			modalBox: document.querySelector(modalSel + " > .box"),
			modalBody: document.querySelector(modalSel + " > .box > .body"),
			form: document.querySelector(modalSel + " > .box > .body > .wui-form"),
			formBody: document.querySelector(modalSel + " > .box > .body > .wui-form > .body"),
			fieldset: document.querySelector(fieldSel),
			field: document.querySelector(fieldSel + " > .field"),
			label: document.querySelector(fieldSel + " > .field > .label"),
			progress: document.querySelector(fieldSel + " > .field > progress"),
			text: document.querySelector(fieldSel + " > .text"),
			modalFooter: document.querySelector(modalSel + " > .box > .footer"),
			cancelButton: document.querySelector(modalSel + " > .box > .footer > .wui-button.cancel")
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
			if (!htmlElements.form) {
				htmlElements.form = document.createElement("form");
				htmlElements.form.classList.add("wui-form");
				htmlElements.modalBody.append(htmlElements.form);
			}
			if (!htmlElements.formBody) {
				htmlElements.formBody = document.createElement("div");
				htmlElements.formBody.classList.add("body");
				htmlElements.form.append(htmlElements.formBody);
			}
			if (!htmlElements.fieldset) {
				htmlElements.fieldset = document.createElement("fieldset");
				htmlElements.formBody.append(htmlElements.fieldset);
			}
			if (!htmlElements.field) {
				htmlElements.field = document.createElement("div");
				htmlElements.field.classList.add("field", "inline", "noborder");
				htmlElements.fieldset.append(htmlElements.field);
			}
			if (!htmlElements.label) {
				htmlElements.label = document.createElement("div");
				htmlElements.label.classList.add("label");
				htmlElements.field.append(htmlElements.label);
			}
			if (!htmlElements.progress) {
				htmlElements.progress = document.createElement("progress");
				htmlElements.field.append(htmlElements.progress);
			}
			if (!htmlElements.text) {
				htmlElements.text = document.createElement("div");
				htmlElements.text.classList.add("text");
				htmlElements.fieldset.append(htmlElements.text);
			}
			if (!htmlElements.modalFooter) {
				htmlElements.modalFooter = document.createElement("div");
				htmlElements.modalFooter.classList.add("footer");
				htmlElements.modalBox.append(htmlElements.modalFooter);
			}
			if (!htmlElements.cancelButton) {
				htmlElements.cancelButton = document.createElement("button");
				htmlElements.cancelButton.type = "button";
				htmlElements.cancelButton.classList.add("wui-button", "cancel");
				htmlElements.modalFooter.append(htmlElements.cancelButton);
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
	}

	#initHtml() {
		this.#loadHtml();
		this.#buildHtml();
	}

	init() {
		const htmlElement = this.#htmlElement;
		const { form, formBody, label } = this.#htmlElements;
		if (htmlElement instanceof HTMLDivElement) {
			const buttonStyles = [
				[form.querySelector(":scope > .header"), this.formHeaderButtonStyle],
				[formBody, this.formBodyButtonStyle],
				[form.querySelector(":scope > .footer"), this.formFooterButtonStyle]
			];
			form.classList.add(...WUIViewProgress.#fieldStyles[this.formFieldStyle]);
			buttonStyles.forEach(([element, buttonStyle]) => {
				if (element instanceof HTMLElement && buttonStyle === "join") {
					element.classList.add("join-buttons");
				}
			});
			form.addEventListener("submit", event => { event.preventDefault(); });
			label.classList.add("wui-language");
			Object.assign(label.dataset, this.labelTextData);
			label.innerHTML = this.labelText;
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

	#finish() {
		const { label } = this.#htmlElements;
		const { cancelButton } = this.#wuiComponents;
		if (typeof (this.#current.onClose) === "function") {
			this.#current.onClose();
		}
		label.innerHTML = this.#current.labelInitText;
		cancelButton.getElement().innerHTML = this.#current.cancelButtonInitText;
		this.#current = {
			total: 0,
			ready: false,
			labelInitText: "",
			cancelButtonInitText: "",
			onCancel: null,
			onReady: null,
			onClose: null
		};
	}

	open(options = {}) {
		const { modal, cancelButton } = this.#wuiComponents;
		const { label, progress, text } = this.#htmlElements;
		const total = parseFloat(options.total);
		const cancelButtonHidden = typeof (options.cancelButtonHidden) === "boolean" ? options.cancelButtonHidden : this.cancelButtonHidden;
		const onOpen = typeof (options.onOpen) === "function" ? options.onOpen : this.onOpen;
		this.#current = {
			total: Number.isFinite(total) && total > 0 ? total : 0,
			ready: false,
			labelInitText: label.innerHTML,
			cancelButtonInitText: cancelButton.getText().innerHTML,
			onCancel: typeof (options.onCancel) === "function" ? options.onCancel : this.onCancel,
			onReady: typeof (options.onReady) === "function" ? options.onReady : this.onReady,
			onClose: typeof (options.onClose) === "function" ? options.onClose : this.onClose
		};
		if (this.#current.total > 0) {
			progress.max = this.#current.total;
			progress.value = typeof (options.value) === "number" ? options.value : 0;
		} else {
			progress.removeAttribute("value");
			progress.removeAttribute("max");
		}
		if (typeof (options.labelText) === "string") {
			label.innerHTML = options.labelText;
		}
		text.innerHTML = (options.text || "") + (options.detail ? `<p>${options.detail}</p>` : "");
		if (typeof (options.cancelButtonText) === "string") {
			cancelButton.getElement().innerHTML = options.cancelButtonText;
		}
		cancelButton.getElement().style.display = cancelButtonHidden ? "none" : "flex";
		modal.onOpen = () => {
			if (!cancelButtonHidden) {
				cancelButton.focus();
			}
			if (typeof (onOpen) === "function") {
				onOpen();
			}
		};
		modal.onClose = () => {
			this.#finish();
		};
		if (!modal.isOpen()) {
			modal.open();
		}
	}

	update(value, total = null) {
		const { progress } = this.#htmlElements;
		const newTotal = parseFloat(total);
		if (Number.isFinite(newTotal) && newTotal > 0) {
			this.#current.total = newTotal;
			progress.max = newTotal;
		}
		if (this.#current.total <= 0 || typeof (value) !== "number" || !Number.isFinite(value)) {
			return;
		}
		progress.value = Math.min(Math.max(value, 0), this.#current.total);
		if (!this.#current.ready && value >= this.#current.total) {
			this.#current.ready = true;
			if (typeof (this.#current.onReady) === "function") {
				this.#current.onReady();
			}
		}
	}

	setText(value) {
		const { text } = this.#htmlElements;
		if (typeof (value) === "string") {
			text.innerHTML = value;
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
