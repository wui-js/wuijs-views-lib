# CODING

Coding rules of `wuijs-views-lib`. The universal specs are copies of `wuijs-specs-lib`, kept with their versioned file
names in `docs/specs/` and `docs/specs/coding/` and never edited here (`specs-0.1.md` §6). A change to a universal spec
goes to `wuijs-specs-lib` first and reaches this library as a new version.

## Scope

The specs apply to:

- `src/wui-js/views/`: one directory per view class.
- `tests/`: Python checks.
- `docs/`, `NPM.md`: documentation.

Excluded:

- `legacy/`: archived versions, never edited.
- `docs/specs/specs-0.1.md` and `docs/specs/coding/`: copies of the universal specs, validated in their source library.
- Files ignored by git (`.claude/`, `CLAUDE.md`, `MEMORY.md`, `NOTES.md`, `__pycache__/`), except `NPM.md`.
- Files whose format a tool defines: `package.json`, `.gitignore`, `.npmignore`.

## Specs

| Spec                           | Version | Applies to            |
| ------------------------------ | ------- | --------------------- |
| `specs-0.1.md`                 | `0.1`   | every file in scope   |
| `coding/js-0.1.md`             | `0.1`   | every JavaScript file |
| `coding/js-components-0.1.md`  | `0.1`   | the view classes      |
| `coding/css-0.1.md`            | `0.1`   | every style sheet     |
| `coding/css-components-0.1.md` | `0.1`   | the view sheets       |
| `coding/md-0.1.md`             | `0.1`   | the documentation     |
| `coding/py-0.1.md`             | `0.1`   | the Python checks     |

## Verification

Validation follows `specs-0.1.md` §7: read this file and every enabled spec, run every command of the `Verification`
section of each spec with `{scope}` replaced by the value below, then go through its `Manual review`, and report a table
of spec, rule and status.

| Spec                           | `{scope}`                                                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `coding/js-0.1.md`             | `src/wui-js/views`                                                                                                                   |
| `coding/js-components-0.1.md`  | `src/wui-js/views`                                                                                                                   |
| `coding/css-0.1.md`            | `src/wui-js/views`                                                                                                                   |
| `coding/css-components-0.1.md` | `src/wui-js/views`                                                                                                                   |
| `coding/md-0.1.md`             | `docs/README-es.md` `docs/README-en.md` `docs/CHANGELOG-es.md` `docs/CHANGELOG-en.md` `docs/classes` `docs/specs/CODING.md` `NPM.md` |
| `coding/py-0.1.md`             | `tests`                                                                                                                              |

Library checks, run from the repository root (empty failure list = pass):

| Command                             | Checks                               |
| ----------------------------------- | ------------------------------------ |
| `python3 tests/docs-check.py -s es` | versions of the class docs (Spanish) |
| `python3 tests/docs-check.py -s en` | the same for English                 |

## Transversal rules

`specs-0.1.md` §8 applies to every language: a comment only labels, with one line; it never explains. The rules of this
library that apply to every language:

- Each class has its own version `X.Y`, carried in its file names, its `@version` header and `static version`. A version
  bump archives the current files in `legacy/` before renaming them in `src/`.
- The library version `X.Y.Z` (`VERSION`, `package.json`) follows the highest class version in `X.Y`; `Z` is the
  modification number.
- Documentation is kept in Spanish and English with the same structure and the same line count (`*-es.md` / `*-en.md`).
- `.DS_Store` files are never tracked.

## Explanations

The reasons behind non-obvious decisions (specs-0.1.md §8) live in the class documentation (`docs/classes/<name>/`) and
in the CHANGELOG entry of the change, never in code comments. This library has no codemap.

## Project specs

None.
