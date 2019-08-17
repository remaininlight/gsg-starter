#!/usr/bin/env bash
# Adds local node modules to the global path, run this before another command, like:
# ./env.sh webpack

# Add your local node_modules bin to the path for this command
export PATH="../node_modules/.bin:$PATH"

# execute the rest of the command
exec "$@"