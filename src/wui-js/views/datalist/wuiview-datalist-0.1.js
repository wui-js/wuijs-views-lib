/*
 * @file wuiview-datalist-modal-0.1.js
 * @class WUIViewDatalist
 * @version 0.1
 * @author Sergio E. Belmar V. (wuijs.project@gmail.com)
 * @copyright Sergio E. Belmar V. (wuijs.project@gmail.com)
 */

class WUIViewDatalist {

	static version = "0.1";
	static #defaults = {
		selector: ".wuiview-datalist",
		lang: "en",
		locale: "en-US",
		type: "list",
		data: [],
		options: [],
		sort: null,
		active: true,
		modalId: null,
		modalMode: "slidepage",
		modalSlidePosition: "right",
		modalFixedMinwidth: Infinity,
		modalOverlay: false,
		modalPriority: true,
		modalTitle: "",
		modalTitleData: {},
		formFieldStyle: "fill",
		formHeaderButtonStyle: "none",
		formBodyButtonStyle: "none",
		formFooterButtonStyle: "none",
		listColumns: [],
		listRowFormat: null,
		listButtons: [],
		listButtonsStyle: "stretch",
		tableColumns: [],
		tableRowFormat: null,
		tableSortable: true,
		tableResizable: true,
		tableDraggable: true,
		tableSelectable: true,
		pageable: true,
		paging: 0,
		searchable: true,
		searchDelay: 300,
		searchStaticMatch: null,
		filterable: false,
		filterInputs: [],
		applyButtonText: "",
		applyButtonTextData: {},
		clearButtonText: "",
		clearButtonTextData: {},
		addable: false,
		addButtonIconClass: "",
		addButtonText: "",
		addButtonTextData: {},
		removable: false,
		removeButtonIconClass: "",
		menuSelectPageText: "",
		menuSelectPageTextData: {},
		menuSelectAllText: "",
		menuSelectAllTextData: {},
		menuUnselectPageText: "",
		menuUnselectPageTextData: {},
		menuUnselectAllText: "",
		menuUnselectAllTextData: {},
		message: "",
		messageText: "",
		messageData: {},
		onPrint: null,
		onFilter: null,
		onAdd: null,
		onRemove: null,
		onChoose: null,
		onSelectOption: null,
	};
	static #autoId = 1;

	static get colors() {
		const style = getComputedStyle(document.body);
		return {
			submit: style.getPropertyValue("--wui-button-submit-bgcolor-out").trim(),
			warning: style.getPropertyValue("--wui-button-warning-bgcolor-out").trim()
		};
	}

	#properties = {};
	#htmlElement;
	#htmlElements = {
		modal: null,
		modalBox: null,
		modalHeader: null,
		modalTopbar: null,
		modalTitle: null,
		modalClose: null,
		modalBody: null,
		modalForm: null,
		modalFormBody: null,
		modalFooter: null,
		applyButton: null,
		clearButton: null,
		mainForm: null,
		mainFormHeader: null,
		mainFormBody: null,
		paging: null,
		prevButton: null,
		nextButton: null,
		search: null,
		searchField: null,
		searchInput: null,
		searchIcon: null,
		options: null,
		filterButton: null,
		addButton: null,
		addIcon: null,
		addText: null,
		removeButton: null,
		removeIcon: null,
		menuSelectpicker: null,
		message: null,
		table: null,
		list: null
	};
	#wuiComponents = {
		modal: null,
		modalForm: null,
		applyButton: null,
		clearButton: null,
		mainForm: null,
		list: null,
		table: null,
		prevButton: null,
		nextButton: null,
		filterButton: null,
		addButton: null,
		removeButton: null,
		menuSelectpicker: null
	};
	#items;
	#rowItems;
	#selectedIds;
	#selectedRowsMode;
	#asyncPendingPage;
	#asyncLoadSequence;
	#searchTimer;
	#filterValues;
	#fixedQuery;
	#mobileQuery;
	#fixed;
	#resumeModal;

	constructor(properties = {}) {
		const defaults = structuredClone(WUIViewDatalist.#defaults);
		Object.entries(defaults).forEach(([key, value]) => {
			this[key] = key in properties ? properties[key] : value;
		});
		if (!this.modalId) {
			this.modalId = `wuiviewDatalist${WUIViewDatalist.#autoId}Modal`;
			WUIViewDatalist.#autoId++;
		}
		this.#properties.modalSelector = "#" + this.modalId;
		this.#properties.searchKey = "";
		this.#properties.page = 0;
		this.#properties.total = 0;
		this.#items = [];
		this.#rowItems = new WeakMap();
		this.#selectedIds = new Set();
		this.#selectedRowsMode = null;
		this.#asyncPendingPage = null;
		this.#asyncLoadSequence = 0;
		this.#searchTimer = null;
		this.#filterValues = {};
		this.#fixedQuery = null;
		this.#mobileQuery = null;
		this.#fixed = false;
		this.#resumeModal = false;
		this.#initHtml();
	}

	get selector() {
		return this.#properties.selector;
	}

	get lang() {
		return this.#properties.lang;
	}

	get locale() {
		return this.#properties.locale;
	}

	get type() {
		return this.#properties.type;
	}

	get data() {
		return this.#properties.data;
	}

	get options() {
		return this.#properties.options;
	}

	get sort() {
		return this.#properties.sort;
	}

	get active() {
		return this.#properties.active;
	}

	get modalId() {
		return this.#properties.modalId;
	}

	get modalMode() {
		return this.#properties.modalMode;
	}

	get modalSlidePosition() {
		return this.#properties.modalSlidePosition;
	}

	get modalFixedMinwidth() {
		return this.#properties.modalFixedMinwidth;
	}

	get modalOverlay() {
		return this.#properties.modalOverlay;
	}

	get modalPriority() {
		return this.#properties.modalPriority;
	}

	get modalTitle() {
		return this.#properties.modalTitle;
	}

	get modalTitleData() {
		return this.#properties.modalTitleData;
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

	get listColumns() {
		return this.#properties.listColumns;
	}

	get listRowFormat() {
		return this.#properties.listRowFormat;
	}

	get listButtons() {
		return this.#properties.listButtons;
	}

	get listButtonsStyle() {
		return this.#properties.listButtonsStyle;
	}

	get tableColumns() {
		return this.#properties.tableColumns;
	}

	get tableRowFormat() {
		return this.#properties.tableRowFormat;
	}

	get tableSortable() {
		return this.#properties.tableSortable;
	}

	get tableResizable() {
		return this.#properties.tableResizable;
	}

	get tableDraggable() {
		return this.#properties.tableDraggable;
	}

	get tableSelectable() {
		return this.#properties.tableSelectable;
	}

	get pageable() {
		return this.#properties.pageable;
	}

	get paging() {
		return this.#properties.paging;
	}

	get page() {
		return this.#properties.page;
	}

	get pages() {
		return this.paging === 0 ? 1 : Math.max(1, Math.ceil(this.total / this.paging));
	}

	get total() {
		return this.#properties.total;
	}

	get searchable() {
		return this.#properties.searchable;
	}

	get searchKey() {
		return this.#properties.searchKey;
	}

	get searchDelay() {
		return this.#properties.searchDelay;
	}

	get searchStaticMatch() {
		return this.#properties.searchStaticMatch;
	}

	get filterable() {
		return this.#properties.filterable;
	}

	get filterInputs() {
		return this.#properties.filterInputs;
	}

	get applyButtonText() {
		return this.#properties.applyButtonText;
	}

	get applyButtonTextData() {
		return this.#properties.applyButtonTextData;
	}

	get clearButtonText() {
		return this.#properties.clearButtonText;
	}

	get clearButtonTextData() {
		return this.#properties.clearButtonTextData;
	}

	get addable() {
		return this.#properties.addable;
	}

	get addButtonIconClass() {
		return this.#properties.addButtonIconClass;
	}

	get addButtonText() {
		return this.#properties.addButtonText;
	}

	get addButtonTextData() {
		return this.#properties.addButtonTextData;
	}

	get removable() {
		return this.#properties.removable;
	}

	get removeButtonIconClass() {
		return this.#properties.removeButtonIconClass;
	}

	get menuSelectPageText() {
		return this.#properties.menuSelectPageText;
	}

	get menuSelectPageTextData() {
		return this.#properties.menuSelectPageTextData;
	}

	get menuSelectAllText() {
		return this.#properties.menuSelectAllText;
	}

	get menuSelectAllTextData() {
		return this.#properties.menuSelectAllTextData;
	}

	get menuUnselectPageText() {
		return this.#properties.menuUnselectPageText;
	}

	get menuUnselectPageTextData() {
		return this.#properties.menuUnselectPageTextData;
	}

	get menuUnselectAllText() {
		return this.#properties.menuUnselectAllText;
	}

	get menuUnselectAllTextData() {
		return this.#properties.menuUnselectAllTextData;
	}

	get message() {
		return this.#properties.message;
	}

	get messageText() {
		return this.#properties.messageText;
	}

	get messageData() {
		return this.#properties.messageData;
	}

	get onPrint() {
		return this.#properties.onPrint;
	}

	get onFilter() {
		return this.#properties.onFilter;
	}

	get onAdd() {
		return this.#properties.onAdd;
	}

	get onRemove() {
		return this.#properties.onRemove;
	}

	get onChoose() {
		return this.#properties.onChoose;
	}

	get onSelectOption() {
		return this.#properties.onSelectOption;
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

	set locale(value) {
		if (typeof (value) === "string" && value.match(/^[a-z]{2}-[a-z]{2}$/i)) {
			this.#properties.locale = value.split("-").map((x, i) => {
				return i === 0 ? x.toLowerCase() : x.toUpperCase();
			}).join("-");
		}
	}

	set type(value) {
		if (typeof (value) === "string" && value.match(/^(list|table|dual)$/i)) {
			this.#properties.type = value.toLowerCase();
		}
	}

	set data(value) {
		if (Array.isArray(value) || typeof (value) === "function") {
			this.#properties.data = value;
		}
	}

	set options(value) {
		if (Array.isArray(value) || typeof (value) === "function") {
			this.#properties.options = value;
		}
	}

	set sort(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.sort = value;
		}
	}

	set active(value) {
		if (typeof (value) === "boolean") {
			this.#properties.active = value;
			this.#updateActive();
		}
	}

	set modalId(value) {
		if (typeof (value) === "string" && value !== "") {
			this.#properties.modalId = value;
		}
	}

	set modalMode(value) {
		if (typeof (value) === "string" && value.match(/^(message|page|smallpage|slidepage)$/i)) {
			this.#properties.modalMode = value.toLowerCase();
		}
	}

	set modalSlidePosition(value) {
		if (typeof (value) === "string" && value.match(/^(left|right)$/i)) {
			this.#properties.modalSlidePosition = value.toLowerCase();
		}
	}

	set modalFixedMinwidth(value) {
		if (typeof (value) === "number" && value >= 768) {
			this.#properties.modalFixedMinwidth = value;
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

	set modalTitle(value) {
		if (typeof (value) === "string") {
			this.#properties.modalTitle = value;
		}
	}

	set modalTitleData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.modalTitleData = value;
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

	set listColumns(value) {
		if (Array.isArray(value)) {
			this.#properties.listColumns = value;
		}
	}

	set listRowFormat(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.listRowFormat = value;
		}
	}

	set listButtons(value) {
		if (Array.isArray(value)) {
			this.#properties.listButtons = value;
		}
	}

	set listButtonsStyle(value) {
		if (typeof (value) === "string" && value.match(/^(round|stretch)$/i)) {
			this.#properties.listButtonsStyle = value.toLowerCase();
		}
	}

	set tableColumns(value) {
		if (Array.isArray(value)) {
			this.#properties.tableColumns = value;
		}
	}

	set tableRowFormat(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.tableRowFormat = value;
		}
	}

	set tableSortable(value) {
		if (typeof (value) === "boolean") {
			this.#properties.tableSortable = value;
		}
	}

	set tableResizable(value) {
		if (typeof (value) === "boolean") {
			this.#properties.tableResizable = value;
		}
	}

	set tableDraggable(value) {
		if (typeof (value) === "boolean") {
			this.#properties.tableDraggable = value;
		}
	}

	set tableSelectable(value) {
		if (typeof (value) === "boolean") {
			this.#properties.tableSelectable = value;
		}
	}

	set pageable(value) {
		if (typeof (value) === "boolean") {
			this.#properties.pageable = value;
		}
	}

	set paging(value) {
		if (typeof (value) === "number" && value >= 0) {
			this.#properties.paging = parseInt(value);
		}
	}

	set searchable(value) {
		if (typeof (value) === "boolean") {
			this.#properties.searchable = value;
		}
	}

	set searchDelay(value) {
		if (typeof (value) === "number" && value >= 0) {
			this.#properties.searchDelay = parseInt(value);
		}
	}

	set searchStaticMatch(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.searchStaticMatch = value;
		}
	}

	set filterable(value) {
		if (typeof (value) === "boolean") {
			this.#properties.filterable = value;
		}
	}

	set filterInputs(value) {
		if (Array.isArray(value)) {
			this.#properties.filterInputs = value;
		}
	}

	set applyButtonText(value) {
		if (typeof (value) === "string") {
			this.#properties.applyButtonText = value;
		}
	}

	set applyButtonTextData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.applyButtonTextData = value;
		}
	}

	set clearButtonText(value) {
		if (typeof (value) === "string") {
			this.#properties.clearButtonText = value;
		}
	}

	set clearButtonTextData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.clearButtonTextData = value;
		}
	}

	set addable(value) {
		if (typeof (value) === "boolean") {
			this.#properties.addable = value;
		}
	}

	set addButtonIconClass(value) {
		if (typeof (value) === "string") {
			this.#properties.addButtonIconClass = value;
		}
	}

	set addButtonText(value) {
		if (typeof (value) === "string") {
			this.#properties.addButtonText = value;
		}
	}

	set addButtonTextData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.addButtonTextData = value;
		}
	}

	set removable(value) {
		if (typeof (value) === "boolean") {
			this.#properties.removable = value;
		}
	}

	set removeButtonIconClass(value) {
		if (typeof (value) === "string") {
			this.#properties.removeButtonIconClass = value;
		}
	}

	set menuSelectPageText(value) {
		if (typeof (value) === "string") {
			this.#properties.menuSelectPageText = value;
		}
	}

	set menuSelectPageTextData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.menuSelectPageTextData = value;
		}
	}

	set menuSelectAllText(value) {
		if (typeof (value) === "string") {
			this.#properties.menuSelectAllText = value;
		}
	}

	set menuSelectAllTextData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.menuSelectAllTextData = value;
		}
	}

	set menuUnselectPageText(value) {
		if (typeof (value) === "string") {
			this.#properties.menuUnselectPageText = value;
		}
	}

	set menuUnselectPageTextData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.menuUnselectPageTextData = value;
		}
	}

	set menuUnselectAllText(value) {
		if (typeof (value) === "string") {
			this.#properties.menuUnselectAllText = value;
		}
	}

	set menuUnselectAllTextData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.menuUnselectAllTextData = value;
		}
	}

	set message(value) {
		if (typeof (value) === "string") {
			this.#properties.message = value;
		}
	}

	set messageText(value) {
		if (typeof (value) === "string") {
			this.#properties.messageText = value;
		}
	}

	set messageData(value) {
		if (typeof (value) === "object" && !Array.isArray(value) && value !== null) {
			this.#properties.messageData = value;
		}
	}

	set onPrint(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onPrint = value;
		}
	}

	set onChoose(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onChoose = value;
		}
	}

	set onFilter(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onFilter = value;
		}
	}

	set onAdd(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onAdd = value;
		}
	}

	set onRemove(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onRemove = value;
		}
	}

	set onSelectOption(value) {
		if (typeof (value) === "function" || value == null) {
			this.#properties.onSelectOption = value;
		}
	}

	#loadHtml() {
		const viewSel = this.selector;
		const modalSel = this.modalSelector;
		this.#htmlElement = document.querySelector(viewSel);
		this.#htmlElements = {
			modal: document.querySelector(modalSel),
			modalBox: document.querySelector(modalSel + " > .box"),
			modalHeader: document.querySelector(modalSel + " > .box > .header"),
			modalTopbar: document.querySelector(modalSel + " > .box > .header > .topbar"),
			modalTitle: document.querySelector(modalSel + " > .box > .header > .title"),
			modalClose: document.querySelector(modalSel + " > .box > .header > .close"),
			modalBody: document.querySelector(modalSel + " > .box > .body"),
			modalForm: document.querySelector(modalSel + " > .box > .body > .wui-form"),
			modalFormBody: document.querySelector(modalSel + " > .box > .body > .wui-form > .body"),
			modalFooter: document.querySelector(modalSel + " > .box > .footer"),
			clearButton: document.querySelector(modalSel + " > .box > .footer > .wui-button.cancel"),
			applyButton: document.querySelector(modalSel + " > .box > .footer > .wui-button.submit"),
			mainForm: document.querySelector(viewSel + " > .wui-form"),
			mainFormHeader: document.querySelector(viewSel + " > .wui-form > .header"),
			mainFormBody: document.querySelector(viewSel + " > .wui-form > .body"),
			paging: document.querySelector(viewSel + " > .wui-form > .header > fieldset.paging"),
			prevButton: document.querySelector(viewSel + " > .wui-form > .header > fieldset.paging > .wui-button.prev"),
			nextButton: document.querySelector(viewSel + " > .wui-form > .header > fieldset.paging > .wui-button.next"),
			search: document.querySelector(viewSel + " > .wui-form > .header > fieldset.search"),
			searchField: document.querySelector(viewSel + " > .wui-form > .header > fieldset.search > .field"),
			searchInput: document.querySelector(viewSel + " > .wui-form > .header > fieldset.search > .field > input"),
			searchIcon: document.querySelector(viewSel + " > .wui-form > .header > fieldset.search > .field > .wui-icon"),
			options: document.querySelector(viewSel + " > .wui-form > .header > fieldset.options"),
			filterButton: document.querySelector(viewSel + " > .wui-form > .header > fieldset.options > .wui-button.filter"),
			addButton: document.querySelector(viewSel + " > .wui-form > .header > fieldset.options > .wui-button.add"),
			addIcon: document.querySelector(viewSel + " > .wui-form > .header > fieldset.options > .wui-button.add > div"),
			addText: document.querySelector(viewSel + " > .wui-form > .header > fieldset.options > .wui-button.add > span"),
			removeButton: document.querySelector(viewSel + " > .wui-form > .header > fieldset.options > .wui-button.remove"),
			removeIcon: document.querySelector(viewSel + " > .wui-form > .header > fieldset.options > .wui-button.remove > div"),
			menuSelectpicker: document.querySelector(viewSel + " > .wui-form > .header > fieldset.options > .wui-selectpicker.menu"),
			menuSelect: document.querySelector(viewSel + " > .wui-form > .header > fieldset.options > .wui-selectpicker.menu > .wui-selectpicker-options select"),
			message: document.querySelector(viewSel + " > .wui-form > .body > .message"),
			table: document.querySelector(viewSel + " > .wui-form > .body > .wui-table"),
			list: document.querySelector(viewSel + " > .wui-form > .body > .wui-list")
		};
	}

	#buildHtml() {
		const htmlElement = this.#htmlElement;
		const htmlElements = this.#htmlElements;
		if (htmlElement instanceof HTMLDivElement) {
			const withList = this.type.match(/^(list|dual)$/) !== null;
			const withTable = this.type.match(/^(table|dual)$/) !== null;
			if (!htmlElements.modal) {
				htmlElements.modal = document.createElement("div");
				htmlElements.modal.id = this.modalId;
				htmlElements.modal.classList.add("wui-modal");
				document.body.append(htmlElements.modal);
			}
			htmlElements.modal.classList.add("wuiview-datalist-modal");
			if (!htmlElements.modalBox) {
				htmlElements.modalBox = document.createElement("div");
				htmlElements.modalBox.classList.add("box");
				htmlElements.modal.append(htmlElements.modalBox);
			}
			if (!htmlElements.modalHeader) {
				htmlElements.modalHeader = document.createElement("div");
				htmlElements.modalHeader.classList.add("header");
				htmlElements.modalBox.append(htmlElements.modalHeader);
			}
			if (!htmlElements.modalTopbar) {
				htmlElements.modalTopbar = document.createElement("div");
				htmlElements.modalTopbar.classList.add("topbar");
				htmlElements.modalHeader.append(htmlElements.modalTopbar);
			}
			if (!htmlElements.modalTitle) {
				htmlElements.modalTitle = document.createElement("div");
				htmlElements.modalTitle.classList.add("title");
				htmlElements.modalHeader.append(htmlElements.modalTitle);
			}
			if (!htmlElements.modalClose) {
				htmlElements.modalClose = document.createElement("div");
				htmlElements.modalClose.classList.add("close", "wui-icon", "close-lg-line");
				htmlElements.modalHeader.append(htmlElements.modalClose);
			}
			if (!htmlElements.modalBody) {
				htmlElements.modalBody = document.createElement("div");
				htmlElements.modalBody.classList.add("body");
				htmlElements.modalBox.append(htmlElements.modalBody);
			}
			if (!htmlElements.modalForm) {
				htmlElements.modalForm = document.createElement("form");
				htmlElements.modalForm.classList.add("wui-form");
				htmlElements.modalBody.append(htmlElements.modalForm);
			}
			if (!htmlElements.modalFormBody) {
				htmlElements.modalFormBody = document.createElement("div");
				htmlElements.modalFormBody.classList.add("body");
				htmlElements.modalForm.append(htmlElements.modalFormBody);
			}
			if (!htmlElements.modalFooter) {
				htmlElements.modalFooter = document.createElement("div");
				htmlElements.modalFooter.classList.add("footer");
				htmlElements.modalBox.append(htmlElements.modalFooter);
			}
			if (!htmlElements.clearButton) {
				htmlElements.clearButton = document.createElement("button");
				htmlElements.clearButton.classList.add("wui-button", "cancel");
				htmlElements.modalFooter.append(htmlElements.clearButton);
			}
			if (!htmlElements.applyButton) {
				htmlElements.applyButton = document.createElement("button");
				htmlElements.applyButton.classList.add("wui-button", "submit");
				htmlElements.modalFooter.append(htmlElements.applyButton);
			}
			if (!htmlElements.mainForm) {
				htmlElements.mainForm = document.createElement("form");
				htmlElements.mainForm.action = "javascript:";
				htmlElements.mainForm.autocomplete = "off";
				htmlElements.mainForm.noValidate = true;
				htmlElements.mainForm.classList.add("wui-form");
				htmlElement.append(htmlElements.mainForm);
			}
			if (!htmlElements.mainFormHeader) {
				htmlElements.mainFormHeader = document.createElement("div");
				htmlElements.mainFormHeader.classList.add("header");
				htmlElements.mainForm.append(htmlElements.mainFormHeader);
			}
			if (this.pageable) {
				if (!htmlElements.paging) {
					htmlElements.paging = document.createElement("fieldset");
					htmlElements.paging.classList.add("buttons", "paging");
					htmlElements.mainFormHeader.append(htmlElements.paging);
				}
				if (!htmlElements.prevButton) {
					htmlElements.prevButton = document.createElement("button");
					htmlElements.prevButton.classList.add("wui-button", "prev");
					htmlElements.paging.append(htmlElements.prevButton);
				}
				if (!htmlElements.nextButton) {
					htmlElements.nextButton = document.createElement("button");
					htmlElements.nextButton.classList.add("wui-button", "next");
					htmlElements.paging.append(htmlElements.nextButton);
				}
			}
			if (this.searchable) {
				if (!htmlElements.search) {
					htmlElements.search = document.createElement("fieldset");
					htmlElements.search.classList.add("search");
					htmlElements.mainFormHeader.append(htmlElements.search);
				}
				if (!htmlElements.searchField) {
					htmlElements.searchField = document.createElement("div");
					htmlElements.searchField.classList.add("field", "icon-right");
					htmlElements.search.append(htmlElements.searchField);
				}
				if (!htmlElements.searchInput) {
					htmlElements.searchInput = document.createElement("input");
					htmlElements.searchInput.type = "text";
					htmlElements.searchInput.name = "key";
					htmlElements.searchField.append(htmlElements.searchInput);
				}
				if (!htmlElements.searchIcon) {
					htmlElements.searchIcon = document.createElement("div");
					htmlElements.searchIcon.classList.add("wui-icon", "search-line");
					htmlElements.searchField.append(htmlElements.searchIcon);
				}
			}
			if (this.filterable || this.addable || this.removable) {
				if (!htmlElements.options) {
					htmlElements.options = document.createElement("fieldset");
					htmlElements.options.classList.add("buttons", "options");
					htmlElements.mainFormHeader.append(htmlElements.options);
				}
				if (this.filterable && !htmlElements.filterButton) {
					htmlElements.filterButton = document.createElement("button");
					htmlElements.filterButton.classList.add("wui-button", "filter");
					htmlElements.options.append(htmlElements.filterButton);
				}
				if (this.addable && !htmlElements.addButton) {
					htmlElements.addButton = document.createElement("button");
					htmlElements.addButton.classList.add("wui-button", "submit", "add");
					htmlElements.options.append(htmlElements.addButton);
				}
				if (this.removable && !htmlElements.removeButton) {
					htmlElements.removeButton = document.createElement("button");
					htmlElements.removeButton.classList.add("wui-button", "warning", "remove");
					htmlElements.options.append(htmlElements.removeButton);
				}
				if (!htmlElements.menuSelectpicker) {
					htmlElements.menuSelectpicker = document.createElement("div");
					htmlElements.menuSelectpicker.classList.add("wui-selectpicker", "menu");
					htmlElements.options.append(htmlElements.menuSelectpicker);
				}
				if (!htmlElements.menuSelect) {
					htmlElements.menuSelect = document.createElement("select");
					htmlElements.menuSelectpicker.append(htmlElements.menuSelect);
				}
			}
			if (!htmlElements.mainFormBody) {
				htmlElements.mainFormBody = document.createElement("div");
				htmlElements.mainFormBody.classList.add("body", "scroll");
				htmlElements.mainForm.append(htmlElements.mainFormBody);
			}
			if (!htmlElements.message) {
				htmlElements.message = document.createElement("div");
				htmlElements.message.classList.add("message", "wui-language");
				htmlElements.mainFormBody.append(htmlElements.message);
			}
			if (withTable && !htmlElements.table) {
				htmlElements.table = document.createElement("div");
				htmlElements.table.classList.add("wui-table");
				htmlElements.mainFormBody.append(htmlElements.table);
			}
			if (withList && !htmlElements.list) {
				htmlElements.list = document.createElement("div");
				htmlElements.list.classList.add("wui-list");
				htmlElements.mainFormBody.append(htmlElements.list);
			}
		}
	}

	#buildComponents() {
		const { modal, modalForm, applyButton, clearButton, mainForm, list, table, prevButton, nextButton, filterButton, addButton, removeButton, menuSelectpicker } = this.#htmlElements;
		const colors = WUIViewDatalist.colors;
		const viewSel = this.selector;
		const modalSel = this.modalSelector;
		const onChoose = (index, id, enabled, row) => {
			if (typeof (this.onChoose) === "function") {
				this.onChoose(index, id, enabled, this.#rowItems.get(row));
			}
		};
		this.#wuiComponents.modal = this.filterable && modal instanceof HTMLDivElement ? new WUIModal({
			selector: modalSel,
			mode: this.modalMode,
			slidePosition: this.modalSlidePosition,
			overlay: this.modalOverlay && this.modalFixedMinwidth === Infinity,
			priority: this.modalPriority,
			onStartClose: () => {
				if (this.#fixed) {
					return false;
				}
				const { filterButton } = this.#wuiComponents;
				filterButton.unselect();
				filterButton.blur();
				if (typeof (this.onFilter) === "function") {
					this.onFilter(false);
				}
			}
		}) : null;
		this.#wuiComponents.modalForm = modalForm instanceof HTMLFormElement ? new WUIForm({
			selector: modalSel + " > .box > .body > .wui-form",
			bodyItems: [{ items: this.filterInputs }],
			fieldStyle: this.formFieldStyle,
			headerButtonStyle: this.formHeaderButtonStyle,
			bodyButtonStyle: this.formBodyButtonStyle,
			footerButtonStyle: this.formFooterButtonStyle,
			submit: false,
			onSubmit: () => { this.#applyFilter(); }
		}) : null;
		this.#wuiComponents.mainForm = mainForm instanceof HTMLFormElement ? new WUIForm({
			selector: viewSel + " > .wui-form",
			fieldStyle: this.formFieldStyle,
			headerButtonStyle: this.formHeaderButtonStyle,
			bodyButtonStyle: this.formBodyButtonStyle,
			footerButtonStyle: this.formFooterButtonStyle,
			submit: false
		}) : null;
		this.#wuiComponents.list = this.type.match(/list|dual/) && list instanceof HTMLDivElement ? new WUIList({
			selector: viewSel + " > .wui-form > .body > .wui-list",
			columns: this.listColumns,
			buttons: [...this.listButtons, ...(this.removable ? [{
				iconClass: (this.removeButtonIconClass || "wui-icon trash-fill"),
				bgcolor: colors.warning,
				onClick: (_, id) => {
					if (typeof (this.onRemove) === "function") {
						this.onRemove([id]);
					}
				}
			}] : [])],
			buttonsStyle: this.listButtonsStyle,
			onClick: onChoose
		}) : null;
		this.#wuiComponents.table = this.type.match(/table|dual/) && table instanceof HTMLDivElement ? new WUITable({
			selector: viewSel + " > .wui-form > .body > .wui-table",
			width: "100%",
			columns: this.tableColumns,
			sortable: this.tableSortable,
			resizable: this.tableResizable,
			draggable: this.tableDraggable,
			selectable: this.tableSelectable || this.removable,
			onClick: () => { this.#updateSelection(); },
			onDblClick: onChoose
		}) : null;
		this.#wuiComponents.prevButton = this.pageable && prevButton instanceof HTMLButtonElement ? new WUIButton({
			selector: viewSel + " .wui-button.prev",
			iconClass: "wui-icon arrowhead-left-line",
			enabled: false,
			onClick: () => { this.prevPage(); },
			onDblClick: () => { this.firstPage(); }
		}) : null;
		this.#wuiComponents.nextButton = this.pageable && nextButton instanceof HTMLButtonElement ? new WUIButton({
			selector: viewSel + " .wui-button.next",
			iconClass: "wui-icon arrowhead-right-line",
			enabled: false,
			onClick: () => { this.nextPage(); },
			onDblClick: () => { this.lastPage(); }
		}) : null;
		this.#wuiComponents.filterButton = this.filterable && filterButton instanceof HTMLButtonElement ? new WUIButton({
			selector: viewSel + " .wui-button.filter",
			iconClass: "wui-icon filter-lg-line",
			selectable: true,
			onClick: selected => {
				const { modal } = this.#wuiComponents;
				if (selected) {
					modal.open();
				} else {
					modal.close();
				}
				if (typeof (this.onFilter) === "function") {
					this.onFilter(selected);
				}
			}
		}) : null;
		this.#wuiComponents.addButton = this.addable && addButton instanceof HTMLButtonElement ? new WUIButton({
			selector: viewSel + " .wui-button.add",
			iconClass: (this.addButtonIconClass || "wui-icon plus-line") + " float-left",
			text: this.addButtonText,
			textClass: "wui-language",
			textData: this.addButtonTextData,
			onClick: () => {
				if (typeof (this.onAdd) === "function") {
					this.onAdd();
				}
			}
		}) : null;
		this.#wuiComponents.removeButton = this.removable && removeButton instanceof HTMLButtonElement ? new WUIButton({
			selector: viewSel + " .wui-button.remove",
			iconClass: (this.removeButtonIconClass || "wui-icon trash-line") + " float-left",
			warning: true,
			enabled: false,
			onClick: () => {
				if (this.type.match(/table|dual/) && typeof (this.onRemove) === "function") {
					const { table } = this.#wuiComponents;
					this.onRemove(table.getSelectedIds());
				}
			}
		}) : null;
		this.#wuiComponents.applyButton = applyButton instanceof HTMLButtonElement ? new WUIButton({
			selector: modalSel + " > .box > .footer > .wui-button.submit",
			text: this.applyButtonText,
			textClass: "wui-language",
			textData: this.applyButtonTextData,
			submit: true,
			onClick: () => { this.#applyFilter(); }
		}) : null;
		this.#wuiComponents.clearButton = clearButton instanceof HTMLButtonElement ? new WUIButton({
			selector: modalSel + " > .box > .footer > .wui-button.cancel",
			text: this.clearButtonText,
			textClass: "wui-language",
			textData: this.clearButtonTextData,
			onClick: () => { this.#clearFilter(); }
		}) : null;
		this.#wuiComponents.menuSelectpicker = menuSelectpicker instanceof HTMLDivElement ? new WUISelectpicker({
			selector: viewSel + " > .wui-form > .header > fieldset.options > .wui-selectpicker.menu",
			lang: this.lang,
			options: [...[
				{ value: "", text: "", hidden: true },
				{ value: "select-page", iconClass: "wui-icon page-check-line", textClass: "wui-language", text: this.menuSelectPageText, textData: this.menuSelectPageTextData, hidden: false },
				{ value: "unselect-page", iconClass: "wui-icon page-check-fill", textClass: "wui-language", text: this.menuUnselectPageText, textData: this.menuUnselectPageTextData, hidden: false },
				{ value: "select-all", iconClass: "wui-icon pages-check-line", textClass: "wui-language", text: this.menuSelectAllText, textData: this.menuSelectAllTextData, hidden: false },
				{ value: "unselect-all", iconClass: "wui-icon pages-check-fill", textClass: "wui-language", text: this.menuUnselectAllText, textData: this.menuUnselectAllTextData, hidden: false },
				{ value: "add", iconClass: this.addButtonIconClass || "wui-icon plus-line", textClass: "wui-language", text: this.addButtonText, textData: this.addButtonTextData, hidden: true }
			], ...this.options],
			boxAlign: "right",
			required: true,
			multiple: false,
			filterable: false,
			viewicon: false,
			viewtext: false,
			onStartOpen: () => { this.#hiddenOptionsMenu(); },
			onChange: (value) => { this.#selectOptionMenu(value);}
		}) : null;
	}

	#buildFilterComponents() {
		const modalSel = this.modalSelector;
		this.filterInputs.filter(item => item.name && item.type.match(/^wui-/)).forEach(item => {
			const selector = `${modalSel} > .box > .body > .wui-form > .body .${item.type}.${item.class || item.name.toLowerCase()}`;
			const name = item.name.toLowerCase() + item.type.toLowerCase().replace(/^wui-/).replace(/\b\w/g, letra => letra.toUpperCase());
			const properties = Object.assign({
				selector,
				lang: this.lang,
				name: item.name,
				boxAlign: "center",
				onOpen: () => { this.#closeFilterPickers(name); }
			}, item.type === "wui-datepicker" ? {
				locale: this.locale
			} : {}, item.properties || {});
			const componente =
				item.type === "wui-selectpicker" ? new WUISelectpicker(properties) :
				item.type === "wui-datepicker" ? new WUIDatepicker(properties) :
				item.type === "wui-timepicker" ? new WUITimepicker(properties) :
				item.type === "wui-colorpicker" ? new WUIColorpicker(properties) :
				item.type === "wui-switch" ? new WUISwitch(properties) :
				null;
			if (componente) {
				componente.init();
				this.#wuiComponents[name] = componente;
			}
		});
	}

	#initHtml() {
		this.#loadHtml();
		this.#buildHtml();
	}

	getElement() {
		return this.#htmlElement;
	}

	getModal() {
		return this.#wuiComponents.modal;
	}

	getModalForm() {
		return this.#wuiComponents.modalForm;
	}

	getMainForm() {
		return this.#wuiComponents.mainForm;
	}

	getPageItems() {
		return typeof (this.data) !== "function" && this.paging > 0 ? this.#items.slice(this.page * this.paging, (this.page + 1) * this.paging) : this.#items;
	}

	#getRows(format, selectable = false) {
		return typeof (format) === "function" ? this.#items.map(item => {
			const row = format(item);
			if (selectable) {
				row.selected = this.#selectedIds.has(row.id);
			}
			this.#rowItems.set(row, item);
			return row;
		}) : [];
	}

	#matchStaticItem(item, key) {
		return Object.values(item).some(value => {
			return (typeof (value) === "string" || typeof (value) === "number") && String(value).toLowerCase().includes(key);
		});
	}

	#matchStaticFilters(item) {
		return this.filterInputs.every(input => {
			const value = input.name ? this.#filterValues[input.name] : "";
			if (!value) {
				return true;
			}
			const itemValue = item[input.name];
			if (typeof (itemValue) === "undefined") {
				return false;
			}
			if (Array.isArray(value)) {
				return value.includes(String(itemValue));
			}
			return input.type === "text"
				? String(itemValue).toLowerCase().includes(String(value).toLowerCase())
				: String(itemValue) === String(value);
		});
	}

	#searchStaticItems(items) {
		const key = this.searchKey.toLowerCase();
		const match = typeof (this.searchStaticMatch) === "function" ? this.searchStaticMatch : (item, value) => this.#matchStaticItem(item, value);
		const filtered = items.filter(item => (key === "" || match(item, key)) && this.#matchStaticFilters(item));
		return this.#sortItems(filtered);
	}

	#sortItems(items) {
		return typeof (this.sort) === "function" ? items.slice().sort(this.sort) : items;
	}

	init() {
		const htmlElement = this.#htmlElement;
		const { modalTitle, searchInput, message } = this.#htmlElements;
		if (htmlElement instanceof HTMLDivElement) {
			htmlElement.classList.add(this.type);
			modalTitle.classList.add("wui-language");
			Object.assign(modalTitle.dataset, this.modalTitleData);
			modalTitle.innerHTML = this.modalTitle;
			if (searchInput instanceof HTMLInputElement) {
				searchInput.addEventListener("input", () => {
					clearTimeout(this.#searchTimer);
					this.#searchTimer = setTimeout(() => {
						this.search(searchInput.value);
					}, this.searchDelay);
				});
			}
			Object.assign(message.dataset, this.messageData);
			message.innerHTML = this.messageText;
			this.#buildComponents();
			Object.entries(this.#wuiComponents).forEach(([name, component]) => {
				if (component !== null) {
					component.init();
					if (name.match(/cancel/i)) {
						component.getElement().classList.add("flat");
					}
				}
			});
			this.#buildFilterComponents();
			if (this.filterable && this.modalFixedMinwidth !== Infinity) {
				this.#fixedQuery = window.matchMedia(`(min-width: ${this.modalFixedMinwidth}px)`);
				this.#fixedQuery.addEventListener("change", () => { this.#updateFixed(); });
				this.#updateFixed();
			}
			if (this.#htmlElements.options instanceof HTMLElement) {
				this.#mobileQuery = window.matchMedia("(max-width: 767px)");
				this.#mobileQuery.addEventListener("change", () => { this.#updateOptionsButtons(); });
				this.#updateOptionsButtons();
			}
			this.load();
		}
	}

	#updateActive() {
		const { modal, filterButton } = this.#wuiComponents;
		if (modal !== null && modal !== undefined) {
			if (!this.active) {
				if (modal.isOpen()) {
					this.#resumeModal = !this.#fixed;
				}
				this.#updateFixed();
				if (modal.isOpen()) {
					modal.close();
				}
			} else {
				this.#updateFixed();
				if (this.#resumeModal && !modal.isOpen()) {
					filterButton.select();
					modal.open();
					if (typeof (this.onFilter) === "function") {
						this.onFilter(true);
					}
				}
				this.#resumeModal = false;
			}
		}
	}

	#updateOptionsButtons() {
		const { addButton, removeButton, menuSelectpicker } = this.#htmlElements;
		const mobile = this.#mobileQuery.matches;
		const withMenuOptions = menuSelectpicker instanceof HTMLElement && menuSelectpicker.querySelector(".option:not(.hidden, [data-value=\"\"], [data-value^=\"select-\"], [data-value^=\"unselect-\"], [data-value=\"add\"])") !== null;
		if (addButton instanceof HTMLButtonElement) {
			addButton.classList.toggle("hidden", mobile && withMenuOptions);
		}
		if (removeButton instanceof HTMLButtonElement) {
			removeButton.classList.toggle("hidden", mobile);
		}
	}

	#updateFixed() {
		const { modal: modalElement } = this.#htmlElements;
		const { modal, filterButton } = this.#wuiComponents;
		const fixed = this.active && this.#fixedQuery !== null && this.#fixedQuery.matches;
		if (fixed !== this.#fixed) {
			this.#fixed = fixed;
			modalElement.classList.toggle("fixed", fixed);
			filterButton.enabled = !fixed;
			if (fixed) {
				filterButton.select();
				if (!modal.isOpen()) {
					modal.open();
				}
				if (typeof (this.onFilter) === "function") {
					this.onFilter(true);
				}
			} else if (modal.isOpen()) {
				modal.close();
			}
		}
	}

	async load() {
		const sequence = ++this.#asyncLoadSequence;
		if (typeof (this.data) === "function") {
			await this.#loadPage(this.#asyncPendingPage ?? this.page, sequence);
		} else {
			this.print();
		}
	}

	async #loadPage(page, sequence) {
		this.#asyncPendingPage = page;
		const result = await this.data({ page, paging: this.paging, key: this.searchKey, filters: this.#filterValues });
		if (sequence === this.#asyncLoadSequence) {
			const items = result !== null && Array.isArray(result.items) ? result.items : [];
			const total = result !== null && typeof (result.total) === "number" ? result.total : items.length;
			const lastPage = this.paging === 0 ? 0 : Math.max(0, Math.ceil(total / this.paging) - 1);
			if (page > lastPage) {
				await this.#loadPage(lastPage, sequence);
			} else {
				this.#asyncPendingPage = null;
				this.#items = this.#sortItems(items);
				this.#properties.total = total;
				this.#properties.page = page;
				this.print();
			}
		}
	}

	print() {
		const htmlElement = this.#htmlElement;
		const { message } = this.#htmlElements;
		const { table, list, prevButton, nextButton, menuSelectpicker } = this.#wuiComponents;
		const isStatic = typeof (this.data) !== "function";
		const isEmpty = this.#items.length === 0;
		if (isStatic) {
			this.#items = this.#searchStaticItems(this.data);
			this.#properties.total = this.#items.length;
			this.#properties.page = Math.min(this.page, this.pages - 1);
		}
		[[table, this.tableRowFormat], [list, this.listRowFormat]].forEach(([component, format]) => {
			if (component !== null) {
				component.paging = isStatic ? this.paging : 0;
				component.rows = this.#getRows(format, component === table);
				component.print(isStatic ? this.page : 0);
			}
		});
		this.#updateSelection();
		if (prevButton !== null) {
			prevButton.enabled = this.hasPrevPage();
		}
		if (nextButton !== null) {
			nextButton.enabled = this.hasNextPage();
		}
		if (menuSelectpicker instanceof WUISelectpicker) {
			menuSelectpicker.enabledOption(1, !isEmpty);
			menuSelectpicker.enabledOption(2, !isEmpty);
			menuSelectpicker.enabledOption(3, !isEmpty);
			menuSelectpicker.enabledOption(4, !isEmpty);
		}
		if (htmlElement instanceof HTMLDivElement) {
			htmlElement.classList.toggle("empty", isEmpty);
		}
		if (message instanceof HTMLDivElement) {
			message.style.display = isEmpty ? "block" : "none";
		}
		if (typeof (this.onPrint) === "function") {
			this.onPrint(this.page, this.pages, this.total);
		}
	}

	#updateSelection() {
		const { table, removeButton } = this.#wuiComponents;
		this.#selectedIds = new Set(table !== null ? table.getSelectedIds() : []);
		this.#selectedRowsMode = null;
		if (removeButton !== null) {
			removeButton.enabled = this.#selectedIds.size > 0;
		}
	}

	search(key = "") {
		const { searchInput } = this.#htmlElements;
		if (searchInput instanceof HTMLInputElement && typeof (key) === "string" && searchInput.value !== key) {
			searchInput.value = key;
		}
		if (typeof (key) === "string" && key.trim() !== this.searchKey) {
			this.#properties.page = 0;
			this.#properties.searchKey = key.trim();
			this.#selectedIds.clear();
			if (typeof (this.data) === "function") {
				this.#loadPage(0, ++this.#asyncLoadSequence);
			} else {
				this.print();
			}
		}
	}

	refreshFilterComponents() {
		this.filterInputs.filter(item => item.name && item.type.match(/^wui-/)).forEach(item => {
			const name = item.name.toLowerCase() + item.type.toLowerCase().replace(/^wui-/).replace(/\b\w/g, letra => letra.toUpperCase());
			const componente = this.#wuiComponents[name];
			if (componente) {
				componente.lang = this.lang;
				if (item.type === "wui-datepicker") {
					componente.locale = this.locale;
				}
			}
		});
	}

	#applyFilter() {
		const { modalForm } = this.#wuiComponents;
		const formElement = this.#htmlElements.modalForm;
		const formData = modalForm.getFormData();
		const values = {};
		for (const name of new Set(formData.keys())) {
			const input = formElement.elements.namedItem(name);
			values[name] = input instanceof HTMLSelectElement && input.multiple ? formData.getAll(name) : formData.get(name);
		}
		this.#filterValues = values;
		this.#properties.page = 0;
		this.#selectedIds.clear();
		this.#closeFilterPickers();
		if (typeof (this.data) === "function") {
			this.#loadPage(0, ++this.#asyncLoadSequence);
		} else {
			this.print();
		}
	}

	#clearFilter() {
		const { modalForm } = this.#wuiComponents;
		this.#closeFilterPickers();
		modalForm.reset();
	}

	goPage(page) {
		if (Number.isInteger(page) && page >= 0 && page < this.pages && page !== (this.#asyncPendingPage ?? this.page)) {
			if (typeof (this.data) === "function") {
				this.#loadPage(page, ++this.#asyncLoadSequence);
			} else {
				this.#properties.page = page;
				this.print();
			}
		}
	}

	firstPage() {
		this.goPage(0);
	}

	lastPage() {
		this.goPage(this.pages - 1);
	}

	prevPage() {
		this.goPage((this.#asyncPendingPage ?? this.page) - 1);
	}

	nextPage() {
		this.goPage((this.#asyncPendingPage ?? this.page) + 1);
	}

	hasPrevPage() {
		return this.page > 0;
	}

	hasNextPage() {
		return this.page < this.pages - 1;
	}

	#hiddenOptionsMenu() {
		const { menuSelectpicker } = this.#wuiComponents;
		const mobile = Boolean(window.matchMedia("(max-width: 767px)").matches);
		menuSelectpicker.value = "";
		menuSelectpicker.hiddenOption(1, mobile || this.#selectedRowsMode === "select-page");
		menuSelectpicker.hiddenOption(2, mobile || this.#selectedRowsMode !== "select-page");
		menuSelectpicker.hiddenOption(3, mobile || this.#selectedRowsMode === "select-all");
		menuSelectpicker.hiddenOption(4, mobile || this.#selectedRowsMode !== "select-all");
		menuSelectpicker.hiddenOption(5, !this.addable || !mobile);
	}

	#selectOptionMenu(value) {
		const { table } = this.#wuiComponents;
		if (table !== null && value.match(/^(un)?select-(page|all)$/)) {
			const selected = Boolean(value.match(/^select/));
			if (value.match(/page/)) {
				table.selectPageRows(table.page, selected);
			} else if (value.match(/all/)) {
				table.selectAllRows(selected);
			}
			this.#updateSelection();
			this.#selectedRowsMode = selected ? value : null;
		} else if (value === "add" && typeof (this.onAdd) === "function") {
			this.onAdd();
		} else if (typeof (this.onSelectOption) === "function") {
			this.onSelectOption(value);
		}
	}

	closeModal() {
		const { modal, filterButton } = this.#wuiComponents;
		modal.close();
		if (!this.#fixed) {
			filterButton.unselect();
		}
	}

	resize(side, width) {
		const { modal } = this.#htmlElements;
		if (side === this.modalSlidePosition && typeof (width) === "number" && width > 0 && modal instanceof HTMLDivElement) {
			modal.style.setProperty("--wui-modal-slidepage-box-width", width + "px");
		}
	}

	#closeFilterPickers(target = "") {
		Object.keys(this.#wuiComponents).filter(name => name !== target && name.match(/picker/)).forEach(name => {
			const pikeer = this.#wuiComponents[name];
			if (typeof pikeer.close === "function") {
				pikeer.close();
			}
		});
	}

	reset() {
		const { searchInput } = this.#htmlElements;
		if (searchInput instanceof HTMLInputElement) {
			searchInput.value = "";
		}
		this.#properties.page = 0;
		this.#properties.searchKey = "";
		this.#asyncPendingPage = null;
		this.#selectedIds.clear();
		this.load();
	}
}

/*
HTML output:
<div class="wuiview-datalist {type} [empty]">
	<div class="wui-modal wuiview-datalist-modal page slide {modalSlidePosition} [fixed]"></div>
	<form action="javascript:" autocomplete="off" novalidate class="wui-form (fill-fields|border-fields|line-fields)[ round-fields]">
		<div class="header">
			<fieldset class="buttons paging">
				<button class="wui-button prev">
					<div class="wui-icon arrowhead-left-line"></div>
				</button>
				<button class="wui-button next">
					<div class="wui-icon arrowhead-right-line"></div>
				</button>
			</fieldset>
			<fieldset class="search">
				<div class="field icon-right">
					<input type="text" name="key">
					<div class="wui-icon search-line"></div>
				</div>
			</fieldset>
			<fieldset class="buttons options">
				<button class="wui-button filter">
					<div class="wui-icon filter-lg-line"></div>
				</button>
				<button class="wui-button submit add">
					<div class="{addButtonIconClass} float-left"></div>
					<span class="wui-language" data-key="{addButtonTextData}"></span>
				</button>
				<button class="wui-button warning remove">
					<div class="{removeButtonIconClass} float-left"></div>
				</button>
			</fieldset>
		</div>
		<div class="body scroll">
			<div class="message wui-language">{messageText}</div>
			<div class="wui-table"></div>
			<div class="wui-list"></div>
		</div>
	</form>
</div>

JS example:
const datalist = new WUIViewDatalist({
	selector: "#usersDatalist",
	type: "dual",
	data: async ({ page, paging, key }) => {
		const response = await fetch(`/api/users?offset=${page * paging}&limit=${paging}&search=${key}`);
		const { items, total } = await response.json();
		return { items, total };
	},
	listColumns: [
		{ align: "left" },
		{ width: 30, align: "center" }
	],
	listRowFormat: user => ({
		id: user.code,
		data: [user.nickname, "<div class='wui-icon arrowhead-right-line'></div>"]
	}),
	tableColumns: [
		{ label: "nickname" },
		{ label: "email" }
	],
	tableRowFormat: user => ({
		id: user.code,
		data: [user.nickname, user.email]
	}),
	paging: 20,
	addable: true,
	addButtonTextData: { key: "buttons.addUser" },
	removable: true,
	messageData: { key: "messages.users.empty" },
	onChoose: (index, id, enabled, user) => {},
	onAdd: () => {}
});
datalist.init();
*/
