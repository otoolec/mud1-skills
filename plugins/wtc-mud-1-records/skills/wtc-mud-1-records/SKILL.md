---
name: wtc-mud-1-records
description: Answer questions about Williamson-Travis Counties Municipal Utility District No. 1 (WTC MUD #1, WTC MUD 1, wtcmud1.org, Anderson Mill West, Cedar Park, Texas) from its public records - board votes and motions, how directors voted, minutes, agendas, rules, resolutions, deed restrictions, tax rates and budgets, water, sewer, drainage and street-light maps, and what Texas law requires of this district. Uses the public records site mud1.localboardinfo.com and official sources, with a page link for every fact. Use it whenever someone asks what this board decided or what its records say, even if they only say "our MUD" in Anderson Mill West. Not for other districts (even nearby ones), general Texas law questions not about this district, or paying bills, service problems, upcoming meetings or a property's own tax bill, which go to wtcmud1.org and the county offices.
---

# WTC MUD #1 public records

Williamson-Travis Counties Municipal Utility District No. 1 is a small unit of Texas government (water,
sewer, drainage, parks, street lights) run by an elected five-member board. Its official website is
https://wtcmud1.org/. An unofficial, independent site, **https://mud1.localboardinfo.com** ("mud1"),
holds searchable copies of its minutes, agendas and documents back to 1985, one page per board motion,
and maps. This skill answers questions from those public sources only, with a link a reader can open
for every fact.

People use these answers in public comments, neighborhood posts and records requests, so one wrong or
unsourced sentence can discredit the rest. That is why the rules below favor quoting and linking over
summarizing from memory.

## Rules

1. **Every fact gets a link you actually opened.** Cite the page, not the site:
   `https://mud1.localboardinfo.com/d/<id>?p=<page>` for a document page, `/a/<motion-id>` for a
   motion. Quote short phrases exactly. If you did not open a source for a statement, leave the
   statement out or mark it "not checked". Don't fill gaps from memory or training data, because
   board members, rates and rules change.
2. **Check what kind of record it is** (the type column in `/llms/records.txt`). "Known record, no
   copy held" means mud1 knows the record exists but has no text: cite the minutes that mention it.
   "Proposed minutes, not approved" and titles with "draft" or "as presented" are not the adopted
   text: say so, or find the adopted copy and any later minutes that amend or rescind it.
3. **Text on mud1 was read from scans by software.** Names, dollar amounts and dates can be misread.
   For anything that matters (a vote count, an amount, a name), tell the reader to check it on the page
   image at the `/d/<id>?p=N` link. mud1 copies are unofficial; the official record is the district's
   own copy.
4. **"Not found" is about the records held, not about what happened.** mud1 does not hold every
   meeting (see Coverage below). Before saying "the board never voted on X", check which years and
   meetings are held, and phrase the result as "In the minutes on mud1 (years ...), I found no motion
   about X." Point to a public information request for the rest; `/missing.json` has ready request
   wording for known gaps in its `ask` field.
5. **Neutral, side by side.** Readers post these answers publicly, and a verdict word ("illegal",
   "violated", "lied") turns a record into an accusation. Report what each record says and let the
   reader judge. If two records disagree (the minutes and an agenda, say), show both with links; mud1
   labels these "Record conflict" and explains on the motion page. Label any inference ("probably",
   "likely") and keep it apart from what a record says.
6. **Credit documents, not people.** Attribute facts to the record (minutes, order, statute), never
   to whoever runs mud1 or to "a resident". Directors and district consultants are named as the
   records name them, in their official roles. Many motions (deed-restriction violations, fines,
   appeals) name private homeowners or house numbers. Don't repeat those: give the date, the kind of
   motion and the link, because people copy these answers into neighborhood forums.
7. **Law comes from the statute text, opened now.** Cite the section and link the official text with
   its anchor (see Law below). Don't state deadlines or procedures from memory. Not legal advice: say
   so once at the end when you discuss the law.
8. **Lead with the answer** in a sentence or two, then the evidence as a short list of dated items
   with links. Put method notes, caveats and "what I couldn't check" at the end.

## How to read mud1 (it is built for AI tools)

The site's guide for AI tools is **https://mud1.localboardinfo.com/llms.txt**. Start there if you can
fetch it; it lists the files below with current counts. The search page (`/search`), the motions list
(`/actions`), votes by director (`/directors`), `/coverage`, `/labels` and `/links` need JavaScript,
so a fetch tool sees only "Loading…" on them. Use these plain-text and JSON files instead:

| Need | File (prefix `https://mud1.localboardinfo.com`) |
|---|---|
| Find motions on a subject | `/llms/motion-index.txt`: one line per motion: date, agenda heading, motion text, result (split votes show ayes–noes), topic tags, motion page |
| Who moved, seconded, voted, exact quote | `/llms/motions/<year>.txt` (list of years: `/llms/motions.txt`) |
| Find a document | `/llms/records.txt`: every record: date, type, title, pages, text link, page link |
| Read a document | `/text/<id>.txt`: full text; `----- Page N -----` starts page N, cite it as `/d/<id>?p=N` |
| Records by topic | `/llms/topics.txt` (topic tags are the site's, not the district's) |
| Which years and meetings are held | `/coverage.json` (see Coverage below); `/missing.json` (known missing records) |
| Maps and GIS layers | `/llms/maps.txt`: each layer, what its colors mean, its GeoJSON file |
| Official links (meetings, contact, records requests, taxes) | `/links.json` |

**If you have a shell** (curl and grep), download the list and search it locally. It is faster and
nothing gets cut off: `curl -s https://mud1.localboardinfo.com/llms/motion-index.txt | grep -i parking`.
Try several words and spellings (parking, vehicle, trailer, overnight), because motion text uses the
board's words, and also try the topic tags.

**If you only have a web-fetch tool**, files over about 300 KB (the motion index, the records and
topics lists, and some busy years) may be cut off or summarized, so a subject can look absent when it
isn't. Ask the fetch tool for every matching line rather than a summary, read the per-year motion
files you need, and say which years you actually read. Some chat apps only fetch URLs that appeared
in the conversation or in search results; if a fetch is refused, search the web for
`site:mud1.localboardinfo.com <words>` or `mud1.localboardinfo.com llms.txt` and fetch from the
results, or ask the person to paste the link.

A motion page (`/a/<id>`) shows the agenda item, motion, result, mover, second and the minutes page it
came from. The per-year file adds ayes, noes, abstentions and the exact quote, so use it for vote
counts. "Ayes (from the roll call; the minutes say unanimous)" means the minutes printed no names and
the names come from the attendance list, not a recorded vote; say so when you report them. For a fact
a reader will check, link the minutes page (`/d/<id>?p=N`), which shows the scanned image; `/a/` links
are fine in a long list.

## Coverage, so you know what "not found" means

Check `/coverage.json` before any "never" or "first time" claim. Per year, `here` is the number of
minutes held on mud1 and `gaps` lists missing meetings; `minutes` and `agendas` count what the named
`source` (the district website or an archive) has, not what mud1 has. Years not listed have no minutes
on mud1. The gaps are large (most years before 2017), so name the gap years in your answer.

## Official sources (the district and the state)

- District site: https://wtcmud1.org/. Meetings, agendas, minutes, video: `/board-meetings/`.
  Documents (rules, orders, rate order): `/documents/`. Budgets and tax rates:
  `/financial-information/`. Upcoming meetings and notices are only on the district site; mud1 has
  past records.
- Records neither site holds: a public information request, https://wtcmud1.org/open-records-requests/
  (Public Information Act, Gov't Code ch. 552; open it before stating any deadline).
- Property values: Williamson Central Appraisal District and Travis Central Appraisal District (the
  district straddles both counties).

## Law

Open the official text and quote it; the section list below is a map, not a source.

- Statutes: `https://tcss.legis.texas.gov/resources/{CODE}/htm/{CODE}.{chapter}.htm#{section}`, for
  example `GV/htm/GV.551.htm#551.007`. Main ones: Water Code ch. 49 (all water districts: quorum
  49.053, records 49.065, terms and elections 49.103) and ch. 54 (MUDs) at `WA/htm/WA.49.htm`,
  `WA.54.htm`; Open Meetings Act, Gov't Code ch. 551 (notice timing 551.043, where a district posts
  551.054 and Water Code 49.063, public comment 551.007, minutes 551.021-.022) at `GV/htm/GV.551.htm`;
  Public Information Act ch. 552 at `GV.552.htm`; district website duties 2051.202 at `GV.2051.htm`;
  tax rates Tax Code ch. 26 and Water Code 49.236-.23603.
- The district's own rules (rules of order, public comment policy, committee resolutions) are
  documents on mud1 and wtcmud1.org. Quote the version in force on the date in question, and check
  later minutes for amendments or rescissions.
- AG opinions: https://www.texasattorneygeneral.gov/opinions. The AG's open meetings and public
  information handbooks are on the same site. Cite an opinion or case only after opening it.
- mud1's `/district` and `/guide` pages give short plain-language explanations, each line with its
  statute link. They are good starting points, but cite the statute itself.

## Example

Question: "Has the board ever voted on overnight street parking?"

1. `grep -iE "parking|vehicle|overnight"` over `/llms/motion-index.txt`; note dates and motion pages.
2. Open the per-year files for those years to get mover, second, ayes, noes and exact quotes.
3. Check `/coverage.json`: say which years were searched and which have no minutes on mud1.
4. Answer: "Yes. The minutes on mud1 show N motions about street parking from YEAR to YEAR:" then one
   line each, `date: motion (result, ayes–noes): link`, with no homeowner names or house numbers. End
   with the caveats from rules 3 and 4 and how to request the rest.
