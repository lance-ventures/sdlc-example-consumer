import { readFileSync, writeFileSync } from 'node:fs';

const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) throw new Error('GITHUB_EVENT_PATH is required');

const event = JSON.parse(readFileSync(eventPath, 'utf8'));
const issue = event.issue;
if (!Number.isSafeInteger(issue?.number) || typeof issue?.title !== 'string')
  throw new Error('a GitHub issue event is required');

writeFileSync(
  'canary/latest.json',
  `${JSON.stringify({ issue: issue.number, request: issue.title }, null, 2)}\n`,
);
