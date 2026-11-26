# Changelog: wtc-mud-1-records

Each release bumps `version` in `.claude-plugin/plugin.json`. Installed copies update when that number changes.

## 1.0.1 (2026-11-26)

- Description now names finding missing minutes for a records request, and excludes HOAs. Trigger test:
  20/20 on the tuning prompts and 9/10 on held-out prompts (1.0.0: 18/20). Prompts in
  `skills/wtc-mud-1-records/evals/triggers.json`.
- Tests: trigger prompts must exist, REVIEW.md must record trigger results, and no review finding may be left
  unfixed without the owner's dated OK.

## 1.0.0 (2026-11-26)

- First release. Answers from mud1.localboardinfo.com plain-text lists (`/llms.txt`), document text,
  `coverage.json` and official Texas statute text, with a page link for every fact.
- Tested with and without the skill on four questions (19 of 19 checks vs 12 of 19), including one with
  web fetch only. Details: `skills/wtc-mud-1-records/REVIEW.md`.
