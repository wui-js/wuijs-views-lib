[English](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/README-en.md) |
[Español](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/README-es.md)
---

# wuijs-views-lib

|                      | |
| -------------------- | --- |
| **Library name**     | `wuijs-views-lib` |
| **Library version**  | `0.1.0` ([Change Log](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/CHANGELOG-en.md)) |
| **NPM package**      | `@wui-js/views` |
| **Document version** | `0.1.0.20261107.0` |
| **License**          | `Apache License 2.0` |
| **Author**           | `Sergio E. Belmar V. <wuijs.project@gmail.com>` |
| **Repository**       | [https://github.com/wui-js/wuijs-views-lib](https://github.com/wui-js/wuijs-views-lib) |
| **Documentation**    | [https://docs.wuijs.dev](https://docs.wuijs.dev) |
| **Website**          | [https://wuijs.dev](https://wuijs.dev) |

## Index

*   [Overview](#overview)
	*   [About the WUI/JS Project](#project)
	*   [Classes Table](#classtable)
	*   [Directory Map](#dirmap)
*   [Install](#install)
*   [Classes](#classes)
	*   [WUIViewMessage](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/message/wuiview-message-en.md)
	*   [WUIViewProgress](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/progress/wuiview-progress-en.md)
	*   [WUIViewDatalist](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/datalist/wuiview-datalist-en.md)

<a name="overview"></a>

## Overview

WUI/JS Views Lib is an open-source JavaScript/CSS library that provides composite views: sets of WUI/JS Main Lib classes that build a complete interface (messages, progress, data listings) from a single HTML element and a configuration object.

<a name="project"></a>

### About the WUI/JS Project

WUI/JS Views Lib is part of the WUI/JS project, which currently consists of 8 repositories:

-	[https://github.com/wui-js/wuijs-main-lib](https://github.com/wui-js/wuijs-main-lib)<br>
	UI Main library.<br><br>
-	[https://github.com/wui-js/wuijs-data-lib](https://github.com/wui-js/wuijs-data-lib)<br>
	Reference Data library.<br><br>
-	[https://github.com/wui-js/wuijs-plugins-lib](https://github.com/wui-js/wuijs-plugins-lib)<br>
	UI Plugins library.<br><br>
-	[https://github.com/wui-js/wuijs-views-lib](https://github.com/wui-js/wuijs-views-lib)<br>
	UI Views library.<br><br>
-	[https://github.com/wui-js/wuijs-environment-lib](https://github.com/wui-js/wuijs-environment-lib)<br>
	UI Bridge library between web environments and native web rendering engines.<br><br>
-	[https://github.com/wui-js/wuijs-lab-lib](https://github.com/wui-js/wuijs-lab-lib)<br>
	Experimental UI components library.<br><br>
-	[https://github.com/wui-js/wuijs-specs-lib](https://github.com/wui-js/wuijs-specs-lib)<br>
	Universal code and content Specifications library.<br><br>
-	[https://github.com/wui-js/wuijs-demos](https://github.com/wui-js/wuijs-demos)<br>
	Repository with demos and usage examples for the project libraries.<br><br>

<a name="classtable"></a>

### Classes Table

| Class Name                                                                                                          | Version | Description |
| ------------------------------------------------------------------------------------------------------------------- |:-------:| ----------- |
| [WUIViewMessage](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/message/wuiview-message-en.md)    | `0.1`   | Modal message view with icon, text and cancel and accept buttons. |
| [WUIViewProgress](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/progress/wuiview-progress-en.md) | `0.1`   | Modal progress view with label, bar, text and cancel button. |
| [WUIViewDatalist](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/datalist/wuiview-datalist-en.md) | `0.1`   | Data listing view with paging, search, filters, selection and add and remove buttons. |

<a name="dirmap"></a>

### Directory Map

```bash
wuijs-views-lib/
├── docs/
│   └── classes/
└── src/
    └── wui-js/
        └── views/
```

| Path                                                                                          | Description |
| --------------------------------------------------------------------------------------------- | ----------- |
| [docs](https://github.com/wui-js/wuijs-views-lib/tree/main/docs/)                             | Documentation. |
| [docs/classes](https://github.com/wui-js/wuijs-views-lib/tree/main/docs/classes/)             | Documentation of each class. |
| [src](https://github.com/wui-js/wuijs-views-lib/tree/main/src/)                               | Main sources of the latest version. |
| [src/wui-js](https://github.com/wui-js/wuijs-views-lib/tree/main/src/wui-js)                  | WUI/JS Project directory. |
| [src/wui-js/views](https://github.com/wui-js/wuijs-views-lib/tree/main/src/wui-js/views/)     | WUI/JS Views library. |

<a name="install"></a>

## Install

**Option 1: Install from source**

To install the WUI/JS Views library, it must be cloned from the official GitHub repository (`wui-js/wuijs-views-lib`).
Assuming the project where it will be deployed has a source directory: `./src` and within that, a `./src/libraries` library directory, you must type the following in the terminal:

```bash
git clone --branch v0.1.0 https://git@github.com/wui-js/wuijs-views-lib.git
cp -r ./wuijs-views-lib/src/wui-js/ ../src/libraries/
```

Optionally, it can be downloaded from the same repository in ZIP format.

```bash
wget https://github.com/wui-js/wuijs-views-lib/archive/refs/heads/main.zip
unzip main.zip
cp -r ./wuijs-views-lib-main/src/wui-js/ ../src/libraries/
```

> [!TIP]
> It is recommended that the `/views` directory be located in the same directory as the main library `/main`.

**Option 2: Install via npm**

To install the WUI/JS Views library via npm:

```bash
npm i @wui-js/views
```

The resources will be available in the `./node_modules/@wui-js/views` path.

> [!IMPORTANT]
> The views require the `wuijs-main-lib` classes listed in the **Dependencies** section of each class document.

<a name="classes"></a>

## Classes

The documentation of each class is in its own document, in the [`docs/classes/`](https://github.com/wui-js/wuijs-views-lib/tree/main/docs/classes) directory:

*   <a name="wuiview-message"></a>[WUIViewMessage](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/message/wuiview-message-en.md)
*   <a name="wuiview-progress"></a>[WUIViewProgress](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/progress/wuiview-progress-en.md)
*   <a name="wuiview-datalist"></a>[WUIViewDatalist](https://github.com/wui-js/wuijs-views-lib/blob/main/docs/classes/datalist/wuiview-datalist-en.md)
