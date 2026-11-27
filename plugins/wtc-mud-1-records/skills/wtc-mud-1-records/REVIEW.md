# wtc-mud-1-records: review log

New skill, 2026-11-26. Answers questions about Williamson-Travis Counties MUD No. 1 from the public
records site mud1.localboardinfo.com and official sources only.

## Benchmark (iteration 2, executor model: Sonnet subagents, 1 run per arm per case)

| Case | With skill | Without skill | Notes |
|---|---|---|---|
| parking-votes (shell) | 6/6, 40 s, 7 tool calls | 6/6, 18 min, 56 tool calls | Baseline downloaded and OCR'd ~217 district PDFs to reach the same votes |
| public-comment-rules (shell) | 5/5 | 2/5 | Baseline missed the adopted Feb 19, 2025 policy (30-minute total) and linked a mirror that returns 403 |
| rates-2015-coverage (shell) | 4/4 | 3/4 | Both avoided "no vote happened"; only the skill found the 2015 agenda item and the 2016 rate notice |
| sun-chase-fetch-only (no shell) | 4/4, 3 fetches | 1/4 | Baseline could not find the Jan 17, 2024 vote at all |
| **Total** | **19/19 (100%)** | **12/19 (60%)** | Mean time 32 s vs 308 s; tokens about equal |

Baselines for the three shell cases are the iteration-1 runs (same prompts, no skill), regraded with
the iteration-2 assertions. Iteration 1 (assertions that mostly checked "cites mud1") scored 14/14 vs
9/14; the reviewer rightly called that circular, so iteration 2 grades facts instead. Cited `/d/?p=N`
pages were checked against `/text/<id>.txt` page N by script; every link was checked for HTTP 200.

## Benchmark (iteration 3, 1.0.1, Sonnet subagents, 3 runs per arm per case)

| Case | With skill | Without skill | Notes |
|---|---|---|---|
| parking-votes | 18/18 | 9/18 | Baselines (11-13 min each, OCR of district PDFs) found no street-parking vote |
| public-comment-rules (now 7 graders) | 21/21 | 12/21 | Statute quotes matched tcss text in every with-skill run |
| rates-2015-coverage | 12/12 | 8/12 | |
| sun-chase-fetch-only | 12/12 | 3/12 | No baseline found the Jan 17, 2024 vote |
| draft-length-of-meetings (new) | 15/15 | 3/15 | Baselines found no meeting-length resolution at all |
| zero-hit-drones (new) | 15/15 | 12/15 | Baselines never named the years held |
| **Total** | **93/93 (100%)** | **47/93 (51%)** | |

Graded by separate Sonnet agents that re-checked facts against `/text/<id>.txt` and statute text and fetched
cited links. Limits: graders could not see tool traces, so "fetch only, no shell" is taken from the answers;
"answer first" graders pass a short wrong answer on structure (draft case baselines). Outputs and
`grading.json` per case are kept with the project's review files.

## Opus review (2026-11-26) and what changed

| # | Finding | Outcome |
|---|---|---|
| 1a | Overlaps the private district skill on the same district | Deferred, owner approved 2026-11-26: the public skill must not name a private one; the owner switches the private skill off when testing the public one |
| 1b | "near Anderson Mill or Cedar Park" fires on other districts | Fixed: "Anderson Mill West", plus "Not for other districts, even nearby ones" |
| 1c | No exclusion for bills, outages, upcoming meetings, own tax bill | Fixed in description |
| 1d | "Texas law behind them" catches generic law questions | Fixed: "what Texas law requires of this district"; general questions excluded |
| 2a | Draft, proposed and "known record, no copy held" types not explained | Fixed: new rule 2 |
| 2b | `/labels` needs JavaScript | Fixed: listed with the JavaScript-only pages; "Record conflict" explained inline |
| 2c | 552.221 deadline oversimplified, stated without opening the statute | Fixed: deadline removed; "open it before stating any deadline" |
| 2d | Open-records URL missing | Fixed: https://wtcmud1.org/open-records-requests/ |
| 2e | Per-year file sizes wrong | Fixed: size column removed; one "over about 300 KB" note |
| 2f | coverage.json fields under-described | Fixed: `here`, `gaps`, source counts, unlisted years |
| 2g | `/missing.json` `ask` field unused | Fixed: rule 4 |
| 2h | Notice law thin; no section anchors | Fixed: 551.054 and WA 49.063 added; anchor pattern `#551.007` |
| 2i | "tap ⓘ" is for people | Fixed |
| 2j | Roll-call note vague | Fixed: names come from attendance, say so |
| 3a | Site-gap notes were maintainer-internal | Fixed: moved out of the skill folder (kept with the project's review files) |
| 3b | Answers could repeat homeowners' names and house numbers from violation motions | Fixed: rule 6; tested in parking-votes grader 05 |
| 4.1 | Word ban too rigid ("secret ballot") | Fixed: reason given, examples kept |
| 4.2 | Coverage summary will go stale | Fixed: one line, read the file |
| 4.3 | "park" floods results | Fixed |
| 4.6 | Which link to prefer | Fixed: minutes page for facts a reader will check |
| 5a | With-skill grading lacked evidence | Fixed in iteration 2: per-assertion evidence, scripted page checks |
| 5b | Assertions circular ("used mud1") | Fixed: fact assertions |
| 5c | HTTP 200 doesn't catch wrong pages | Fixed: page-content check script |
| 5d | Fetch-only path untested | Fixed: sun-chase-fetch-only case |
| 5e | No trigger or near-miss cases | Fixed in 1.0.1: 30 trigger prompts in `evals/triggers.json`, results below |
| 5f | Untested rules (address leaks, OCR caveat, drafts) | Fixed in 1.0.1: new cases draft-length-of-meetings and zero-hit-drones; answer-first and statute-quote graders added (iteration 3) |
| 5g | Brittle graders | Fixed: coverage graded at run time, tone not tokens, document named |

Open: none. Iteration 3 (below) runs every case 3 times per arm.

## Trigger test (1.0.1, 2026-11-26)

skill-creator's `run_eval` (Sonnet, `claude -p`, 3 runs per prompt, fires if 2 of 3 runs load the skill), with only
this skill installed (`--setting-sources project`). `evals/triggers.json`: 20 "tune" prompts (10 should fire, 10
near-misses) used to adjust the description, and 10 "held-out" prompts written after the last change.

| Description | Tune set (20) | Held-out (10) | Misses |
|---|---|---|---|
| 1.0.0 (long) | 18/20 | not run | missed "which minutes are missing"; fired on an HOA dues question |
| Short claude.ai card text | 17/20 | 8/10 | missed "which minutes are missing"; fired on bill payment, low water pressure, a bill dispute and a tap fee |
| 1.0.1 (adds "which ones are missing, for a records request" and "HOAs") | 20/20 | 9/10 | fired on "how much is a new water tap, I need to pay it" (the rate order is a record, so this is borderline) |

Harness note: as shipped, `run_eval` writes every parallel worker's temporary command into one `.claude/commands`
folder, so each run sees up to 10 copies and usually picks another worker's. That made recall look like 10-20%.
These numbers use a patched copy that gives each run its own project folder.
