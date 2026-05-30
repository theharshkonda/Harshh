#!/usr/bin/env bash
set -e
cd /app
patch -p1 -R < /solution/init_state.patch
