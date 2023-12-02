const Parser = require('rss-parser');
const parser = new Parser();
const core = require('@actions/core');

async function getFlutterReleaseVersion() {
  const feedUrl = 'https://github.com/flutter/flutter/wiki.atom';
  const hotfixesUrl = 'https://github.com/flutter/flutter/wiki/Hotfixes-to-the-Stable-Channel';
  const githubUrl = 'https://github.com/flutter/flutter/releases/tag/';

  try {
    const feed = await parser.parseURL(feedUrl);
    const targetItem = feed.items.find(item => item.id?.includes(hotfixesUrl));

    if (!targetItem) {
      return null;
    }

    const versionPattern = new RegExp(`${githubUrl}([0-9.]+)`);
    const versionMatch = targetItem.content?.match(versionPattern);

    if (versionMatch) {
      return versionMatch[1];
    } else {
      throw new Error('Version number not found.');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
}

getFlutterReleaseVersion()
  .then(version => {
    core.setOutput('version', version || '');
  })
  .catch(error => {
    core.setFailed(error.message);
  });