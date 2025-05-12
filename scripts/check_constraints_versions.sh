#!/bin/bash
REQS=requirements/requirements.txt
CONSTR=requirements/constraints.txt

awk '/^[a-zA-Z0-9_\-]+==/ {print $1"=="$2}' FS==' ' $REQS | while read -r line; do
  pkg=$(echo "$line" | cut -d= -f1)
  ver=$(echo "$line" | cut -d= -f3)
  constr_ver=$(grep -E "^$pkg==" "$CONSTR" | head -n1 | cut -d= -f3)
  if [ -z "$constr_ver" ]; then
    echo "Missing in constraints.txt: $pkg==$ver"
  elif [ "$ver" != "$constr_ver" ]; then
    echo "Version mismatch for $pkg: requirements.txt has $ver, constraints.txt has $constr_ver"
  fi
done
