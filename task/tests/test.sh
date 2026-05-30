#!/usr/bin/env bash
# Harbor reward safety net — fires on ANY exit (including set -e).
# Only writes if no reward file exists yet (never overwrites LLM logic).
_dflt_reward() { local rc=$?; mkdir -p /logs/verifier; if [ ! -f /logs/verifier/reward.txt ]; then if [ $rc -eq 0 ]; then echo 1 > /logs/verifier/reward.txt; else echo 0 > /logs/verifier/reward.txt; fi; fi; }
trap _dflt_reward EXIT
set -e
cd /app

# Copy pre-extracted test files into the codebase so the evaluation tests
# are in place at the paths the project expects.
cp -rf /tests/files/. /app/

STYLE_TAB="/app/tests/playwright/pages/atomic-elements-panel/style-tab.ts"
VIDEO_TEST="/app/tests/playwright/sanity/modules/v4-tests/self-hosted-video.test.ts"
RESPONSIVE_TEST="/app/tests/playwright/sanity/modules/v4-tests/styles-editing/responsive-styles.test.ts"

set +e

FAILED=0
fail() {
    echo "FAIL: $1" >&2
    FAILED=1
}

pass() {
    echo "PASS: $1"
}

# ---- 1. Both evaluation test files must exist (they were copied in) ----
if [ -f "$VIDEO_TEST" ]; then
    pass "self-hosted-video.test.ts exists at expected path"
else
    fail "self-hosted-video.test.ts missing at $VIDEO_TEST"
fi

if [ -f "$RESPONSIVE_TEST" ]; then
    pass "responsive-styles.test.ts exists at expected path"
else
    fail "responsive-styles.test.ts missing at $RESPONSIVE_TEST"
fi

# ---- 2. style-tab.ts must exist ----
if [ ! -f "$STYLE_TAB" ]; then
    fail "style-tab.ts missing at $STYLE_TAB"
    mkdir -p /logs/verifier
    echo 0 > /logs/verifier/reward.txt
    exit 1
fi

# ---- 3. The three enums imported by responsive-styles.test.ts must be
#         exported from style-tab.ts. The test does:
#         import { BorderTypeLabel, OffsetLabel, SizeSectionLabel } from
#             '../../../../pages/atomic-elements-panel/style-tab';
#         so each enum declaration must carry the `export` keyword. ----
if grep -Eq '^[[:space:]]*export[[:space:]]+enum[[:space:]]+SizeSectionLabel\b' "$STYLE_TAB"; then
    pass "SizeSectionLabel is exported"
else
    fail "SizeSectionLabel must be exported from style-tab.ts (e.g. 'export enum SizeSectionLabel')"
fi

if grep -Eq '^[[:space:]]*export[[:space:]]+enum[[:space:]]+OffsetLabel\b' "$STYLE_TAB"; then
    pass "OffsetLabel is exported"
else
    fail "OffsetLabel must be exported from style-tab.ts (e.g. 'export enum OffsetLabel')"
fi

if grep -Eq '^[[:space:]]*export[[:space:]]+enum[[:space:]]+BorderTypeLabel\b' "$STYLE_TAB"; then
    pass "BorderTypeLabel is exported"
else
    fail "BorderTypeLabel must be exported from style-tab.ts (e.g. 'export enum BorderTypeLabel')"
fi

# ---- 4. setBorderType() must lowercase the BorderTypeLabel value before
#         passing it to changeSelectControl. The panel data-value expects
#         lowercase CSS keywords ('solid', 'dashed', ...) even though the
#         enum values are title-case labels ('Solid', 'Dashed', ...). ----
#         Extract the body of setBorderType (from its declaration to the
#         next top-level `async` method declaration or end of class).
SET_BORDER_BODY=$(awk '
    /async[[:space:]]+setBorderType[[:space:]]*\(/ { in_fn = 1 }
    in_fn { print }
    in_fn && /^[[:space:]]*\}[[:space:]]*$/ { in_fn = 0 }
' "$STYLE_TAB")

if [ -z "$SET_BORDER_BODY" ]; then
    fail "setBorderType method not found in style-tab.ts"
else
    # The body must toLowerCase the border argument.
    if echo "$SET_BORDER_BODY" | grep -q 'toLowerCase'; then
        pass "setBorderType calls toLowerCase"
    else
        fail "setBorderType must lowercase the border argument before calling changeSelectControl"
    fi

    # The lowercased result must be what's passed to changeSelectControl.
    # Accept either an inline .toLowerCase() call or an intermediate variable.
    if echo "$SET_BORDER_BODY" | grep -Eq 'changeSelectControl\(\s*control\s*,\s*\S+\.toLowerCase\(\)' || \
       (echo "$SET_BORDER_BODY" | grep -q 'toLowerCase' && \
        ! echo "$SET_BORDER_BODY" | grep -Eq 'changeSelectControl\(\s*control\s*,\s*border\s*\)'); then
        pass "setBorderType passes the lowercased value to changeSelectControl"
    else
        fail "setBorderType must pass the lowercased value (not raw border) to changeSelectControl"
    fi
fi

# Write Harbor reward file based on FAILED flag
mkdir -p /logs/verifier
if [ $FAILED -eq 0 ]; then
    echo 1 > /logs/verifier/reward.txt
    exit 0
else
    echo 0 > /logs/verifier/reward.txt
    exit 1
fi
