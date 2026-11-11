#!/bin/sh
# Re-export the Archive's words and Unique tables from the app (after an app update adds a Legendary, an attribute or
# a colour):
#   scripts/archive-data/run.sh <app checkout with node_modules, e.g. a worktree of the release branch>
# Writes public/archive/data/<code>.json (10 languages). Commit them with the site. No network.
set -eu
APP="$1"
SITE="$(cd "$(dirname "$0")/../.." && pwd)"
mkdir -p "$SITE/public/archive/data"
cp "$SITE/scripts/archive-data/zzSiteArchiveData.test.ts" "$APP/localization/__tests__/zzSiteArchiveData.test.ts"
trap 'rm -f "$APP/localization/__tests__/zzSiteArchiveData.test.ts"' EXIT
(cd "$APP" && SITE_ARCHIVE_OUT="$SITE/public/archive/data" npx jest localization/__tests__/zzSiteArchiveData.test.ts --maxWorkers=2)
