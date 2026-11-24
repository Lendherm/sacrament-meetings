import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";

const envPath = ".env.local";
let env = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";

function upsert(key, value) {
  const line = `${key}="${value}"`;
  const re = new RegExp(`^${key}=.*$`, "m");
  if (re.test(env)) {
    env = env.replace(re, line);
  } else {
    if (env && !env.endsWith("\n")) env += "\n";
    env += `${line}\n`;
  }
}

const hash = bcrypt.hashSync("SunriseWard1", 10);
upsert("AUTH_SECRET", randomBytes(32).toString("base64"));
upsert("AUTH_URL", "http://localhost:3000");
upsert("BISHOPRIC_EMAIL", "bishop@sunriseward.local");
upsert("BISHOPRIC_PASSWORD_HASH", hash);

writeFileSync(envPath, env, "utf8");
console.log("Updated .env.local with AUTH_SECRET and bishopric credentials");
console.log("Demo login: bishop@sunriseward.local / SunriseWard1");
