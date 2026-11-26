# Changelog: wtc-mud-1-records

Each release bumps `version` in `.claude-plugin/plugin.json`. Installed copies update when that number changes.

## 1.0.0 (2026-11-26)

- First release. Answers from mud1.localboardinfo.com plain-text lists (`/llms.txt`), document text,
  `coverage.json` and official Texas statute text, with a page link for every fact.
- Tested with and without the skill on four questions (19 of 19 checks vs 12 of 19), including one with
  web fetch only. Details: `skills/wtc-mud-1-records/REVIEW.md`.
