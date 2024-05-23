#!/bin/bash

rm -rf tmp
mkdir tmp
cd tmp
git clone --depth 1 --branch main git@github.com:flutter/flutter.git

filePath="./flutter/docs/releases/Hotfixes-to-the-Stable-Channel.md"
#VERSION=$(grep -o -m 1 '### \[[0-9]\+\.[0-9]\+\.[0-9]\+\]' "$filePath" | sed -E 's/[^0-9.]//g')
VERSION=$(grep -o -m 1 '### \[[0-9]\+\.[0-9]\+\.[0-9]\+\]' "$filePath" | sed 's/[^0-9.]//g')
echo "Version: $VERSION"

echo $VERSION > version.txt
