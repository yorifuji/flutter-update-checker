#!/bin/bash

curl -O https://raw.githubusercontent.com/flutter/flutter/main/CHANGELOG.md

VERSION=$(grep -o -m 1 '### \[[0-9]\+\.[0-9]\+\.[0-9]\+\]' CHANGELOG.md | sed 's/[^0-9.]//g')
echo "Version: $VERSION"

echo $VERSION > version.txt
