# Rules for changes

- Every skill change bumps `version` in its plugin's `.claude-plugin/plugin.json` and adds a matching
  `## x.y.z (date)` entry at the top of its `CHANGELOG.md`. Version lives only in plugin.json.
- Change a skill test-first: add or change an eval case in `skills/<name>/evals/` that fails before
  the change, run with and without the skill, and record the benchmark and an independent review in
  `skills/<name>/REVIEW.md`.
- Public repo: no personal data, private paths or project-internal notes in any file. Eval prompts
  use invented people.
- Before a pull request: `node --test` and `claude plugin validate --strict .` both pass.
