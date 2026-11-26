# mud1-skills

Skills for AI assistants that answer questions about **Williamson-Travis Counties Municipal Utility
District No. 1** (WTC MUD #1, Cedar Park, Texas) from its public records on
[mud1.localboardinfo.com](https://mud1.localboardinfo.com/) ↗. Every fact comes with a link to the
page it came from. Not run by or affiliated with the district. Not legal advice.

| Plugin | What it does | Version |
|---|---|---|
| [wtc-mud-1-records](plugins/wtc-mud-1-records/) | Board votes, minutes, documents, maps, records coverage and the Texas law behind them | see [CHANGELOG](plugins/wtc-mud-1-records/CHANGELOG.md) |

## Install

**Claude Code** (gets updates):

```
/plugin marketplace add otoolec/mud1-skills
/plugin install wtc-mud-1-records@mud1-skills
```

Updates: marketplaces outside Anthropic's own don't auto-update by default. Turn it on once in
`/plugin` > Marketplaces > mud1-skills, or update by hand with `/plugin marketplace update mud1-skills`.

**Claude app (claude.ai, desktop):** download `wtc-mud-1-records-<version>.zip` from
[Releases](https://github.com/otoolec/mud1-skills/releases) ↗ (or build it with
`scripts/build-zips.sh`) and upload it under Customize > Skills. The app does not check for updates;
compare your version with the CHANGELOG and upload the new zip when it changes.

**Other AI tools:** point them at https://mud1.localboardinfo.com/llms.txt ↗, the site's plain-text guide.

## Versions

Each plugin's version is in its `.claude-plugin/plugin.json` (semantic versioning). Any change to a
skill bumps it and adds a CHANGELOG entry: patch for wording fixes, minor for new behavior, major when
the skill's scope changes. Installed copies update only when the version changes.

↗ opens another site.
