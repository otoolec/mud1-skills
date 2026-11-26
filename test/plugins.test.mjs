// Checks the marketplace and each plugin so installed copies get updates and claude.ai zips match.
// Run: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const market = JSON.parse(read('.claude-plugin/marketplace.json'));
const semver = /^\d+\.\d+\.\d+$/;

test('marketplace has a name, an owner and at least one plugin', () => {
  assert.match(market.name, /^[a-z0-9-]+$/);
  assert.ok(market.owner?.name);
  assert.ok(market.plugins.length > 0);
});

for (const entry of market.plugins) {
  const dir = entry.source.replace(/^\.\//, '');
  test(`${entry.name}: plugin.json has the same name and a semver version`, () => {
    const pj = JSON.parse(read(`${dir}/.claude-plugin/plugin.json`));
    assert.equal(pj.name, entry.name);
    assert.match(pj.version, semver);
    // Version lives in plugin.json only, so the two can never disagree.
    assert.equal(entry.version, undefined, 'set version in plugin.json, not marketplace.json');
  });

  test(`${entry.name}: CHANGELOG's newest entry is the plugin version`, () => {
    const pj = JSON.parse(read(`${dir}/.claude-plugin/plugin.json`));
    const first = read(`${dir}/CHANGELOG.md`).match(/^## (\d+\.\d+\.\d+)/m);
    assert.ok(first, 'CHANGELOG.md needs a "## x.y.z" heading');
    assert.equal(first[1], pj.version);
  });

  test(`${entry.name}: every skill has SKILL.md whose name matches its folder`, () => {
    const skills = fs.readdirSync(path.join(root, dir, 'skills'));
    assert.ok(skills.length > 0);
    for (const s of skills) {
      const md = read(`${dir}/skills/${s}/SKILL.md`);
      const name = md.match(/^---\n[\s\S]*?^name:\s*(.+)$/m)?.[1].trim();
      assert.equal(name, s);
      const desc = md.match(/^description:\s*(.+)$/m)?.[1] || '';
      assert.ok(desc.length > 0 && desc.length <= 1024, 'description must be 1-1024 characters');
    }
  });
}

test('no private paths or personal email in published files', () => {
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
    e.name === '.git' || e.name === 'node_modules' || e.name === 'dist' ? [] :
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  for (const f of walk(root)) {
    if (f.endsWith('plugins.test.mjs')) continue;
    const t = fs.readFileSync(f, 'utf8');
    assert.doesNotMatch(t, /\/mnt\/project-files|C:\\Users\\|@gmail\.com/, f);
  }
});

// Skill-creator's trigger check must have run, and no review finding may be waived without the owner's OK.
for (const entry of market.plugins) {
  const dir = entry.source.replace(/^\.\//, '');
  for (const s of fs.readdirSync(path.join(root, dir, 'skills'))) {
    const base = `${dir}/skills/${s}`;
    test(`${s}: trigger prompts exist, with 8+ that should fire and 8+ near-misses`, () => {
      const set = JSON.parse(read(`${base}/evals/triggers.json`));
      assert.ok(set.filter(q => q.should_trigger === true).length >= 8);
      assert.ok(set.filter(q => q.should_trigger === false).length >= 8);
    });
    test(`${s}: REVIEW.md records trigger results`, () => {
      assert.match(read(`${base}/REVIEW.md`), /^## Trigger test/m);
    });
    test(`${s}: every unfixed or partly fixed review finding has the owner's dated OK`, () => {
      const rows = read(`${base}/REVIEW.md`).split('\n').filter(l => /^\|.*\|\s*(Not fixed|Partly fixed|Deferred)/i.test(l));
      for (const r of rows) assert.match(r, /owner approved \d{4}-\d{2}-\d{2}/, r);
    });
  }
}
