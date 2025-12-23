import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

function readEnvFile(): string {
  return fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
}

function upsertEnvKey(content: string, key: string, value: string) {
  const line = `${key}=${value}`;
  const re = new RegExp(`^${key}=.*$`, 'm');
  if (re.test(content)) return content.replace(re, line);
  return (content.trimEnd() + `\n${line}\n`).replace(/^\n+/, '');
}

export function saveCredentialsToEnv(email: string, password: string) {
  let content = readEnvFile();
  content = upsertEnvKey(content, 'TEST_EMAIL', email);
  content = upsertEnvKey(content, 'TEST_PASSWORD', password);
  fs.writeFileSync(envPath, content, 'utf-8');
}

export function getPasswordFromEnv(defaultPassword = 'Osaidd@mumen123') {
  return process.env.TEST_PASSWORD?.trim() || defaultPassword;
}

export function generateEmail() {
  return `osaid_${Date.now()}_${Math.floor(Math.random() * 10000)}@gmail.com`;
}
