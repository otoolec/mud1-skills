#!/usr/bin/env bash
# Builds one zip per skill for upload to the Claude app (Customize > Skills), named with the plugin version.
# Usage: scripts/build-zips.sh   -> dist/<skill>-<version>.zip
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p dist
for pj in plugins/*/.claude-plugin/plugin.json; do
  dir=$(dirname "$(dirname "$pj")")
  ver=$(node -p "require('./$pj').version")
  for s in "$dir"/skills/*/; do
    name=$(basename "$s")
    (cd "$dir/skills" && zip -qr "../../../dist/$name-$ver.zip" "$name" -x "$name/evals/*" "$name/REVIEW.md")
    echo "dist/$name-$ver.zip"
  done
done
