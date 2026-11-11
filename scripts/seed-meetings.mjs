import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

// Load .env.local without extra deps
for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (!match) continue;
  const key = match[1].trim();
  let value = match[2].trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  if (!process.env[key]) process.env[key] = value;
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS meetings (
    id             SERIAL        PRIMARY KEY,
    date           DATE          NOT NULL UNIQUE,
    meeting_type   VARCHAR(20)   NOT NULL
                                 CHECK (meeting_type IN
                                   ('testimony','regular','stake','general','special')),
    presiding      VARCHAR(255)  NOT NULL,
    conducting     VARCHAR(255)  NOT NULL,
    announcements  TEXT[]        DEFAULT '{}',
    opening_hymn   JSONB         NOT NULL,
    opening_prayer VARCHAR(255)  NOT NULL,
    ward_business  JSONB         DEFAULT '[]',
    stake_business BOOLEAN       DEFAULT false,
    sacrament_hymn JSONB         NOT NULL,
    speakers       JSONB         DEFAULT '[]',
    closing_hymn   JSONB         NOT NULL,
    closing_prayer VARCHAR(255)  NOT NULL
  )
`;

await sql`TRUNCATE meetings RESTART IDENTITY`;

await sql`
  INSERT INTO meetings (
    date, meeting_type, presiding, conducting, announcements,
    opening_hymn, opening_prayer, ward_business, stake_business,
    sacrament_hymn, speakers, closing_hymn, closing_prayer
  ) VALUES
  (
    '2026-01-04','testimony','Bishop Thompson','Brother Nakamura',
    ARRAY[]::TEXT[],
    '{"number":134,"title":"I Believe in Christ"}'::jsonb,'Sister Park',
    '[]'::jsonb,false,
    '{"number":175,"title":"God, Our Father, Hear Us Pray"}'::jsonb,
    '[]'::jsonb,
    '{"number":219,"title":"Because I Have Been Given Much"}'::jsonb,'Brother Alvarez'
  ),
  (
    '2026-01-11','regular','Bishop Thompson','Brother Nakamura',
    ARRAY['Ward temple night: Jan 30'],
    '{"number":2,"title":"The Spirit of God"}'::jsonb,'Sister Ramirez',
    '[{"description":"Sustaining of new Sunday School president"}]'::jsonb,true,
    '{"number":169,"title":"In Remembrance of Thy Suffering"}'::jsonb,
    '[{"name":"Sister Chen","topic":"The Sacrament","type":"speaker"},{"name":"Brother Osei","topic":"Covenant Keeping","type":"speaker"}]'::jsonb,
    '{"number":31,"title":"O God, Our Help in Ages Past"}'::jsonb,'Brother Lewis'
  ),
  (
    '2026-01-18','regular','Bishop Thompson','Sister Torres',
    ARRAY['Ministering interviews this week'],
    '{"number":85,"title":"How Firm a Foundation"}'::jsonb,'Brother Kim',
    '[{"description":"Release - Sister Martinez - Primary Teacher"}]'::jsonb,false,
    '{"number":173,"title":"While of These Emblems We Partake"}'::jsonb,
    '[{"name":"Sister Nakamura","topic":"Personal Revelation","type":"speaker"},{"name":"Youth Choir","topic":"","type":"musical-number"},{"name":"Brother Santos","topic":"Temple Covenants","type":"speaker"}]'::jsonb,
    '{"number":226,"title":"Improve the Shining Moments"}'::jsonb,'Sister Jensen'
  ),
  (
    '2026-01-25','stake','President Gimenez','President Alvarez',
    ARRAY[]::TEXT[],
    '{"number":5,"title":"High on the Mountain Top"}'::jsonb,'Sister Cole',
    '[]'::jsonb,true,
    '{"number":193,"title":"I Stand All Amazed"}'::jsonb,
    '[{"name":"President Gimenez","topic":"Stake conference address","type":"speaker"}]'::jsonb,
    '{"number":30,"title":"Come, Come, Ye Saints"}'::jsonb,'Brother Park'
  ),
  (
    '2026-02-01','testimony','Bishop Thompson','Brother Smith',
    ARRAY['Fast offerings can be given to the bishopric'],
    '{"number":136,"title":"I Know That My Redeemer Lives"}'::jsonb,'Sister Clark',
    '[{"description":"Sustaining of new ward missionaries"}]'::jsonb,false,
    '{"number":194,"title":"There Is a Green Hill Far Away"}'::jsonb,
    '[]'::jsonb,
    '{"number":98,"title":"I Need Thee Every Hour"}'::jsonb,'Brother Lewis'
  ),
  (
    '2026-02-08','regular','Bishop Thompson','Sister Torres',
    ARRAY['Youth temple trip signup in foyer'],
    '{"number":19,"title":"We Thank Thee, O God, for a Prophet"}'::jsonb,'Brother Kim',
    '[]'::jsonb,false,
    '{"number":172,"title":"In Humility, Our Savior"}'::jsonb,
    '[{"name":"Sister Brown","topic":"Faith","type":"speaker"},{"name":"Brother Miller","topic":"Prayer","type":"speaker"}]'::jsonb,
    '{"number":85,"title":"How Firm a Foundation"}'::jsonb,'Sister Wilson'
  ),
  (
    '2026-11-01','testimony','Bishop Luis Ramirez','Brother Ethan Cole',
    ARRAY['Fast Sunday'],
    '{"number":2,"title":"The Spirit of God"}'::jsonb,'Sister Maria Lopez',
    '[]'::jsonb,false,
    '{"number":193,"title":"I Stand All Amazed"}'::jsonb,
    '[]'::jsonb,
    '{"number":152,"title":"God Be with You Till We Meet Again"}'::jsonb,'Brother Ortiz'
  ),
  (
    '2026-11-08','regular','Bishop Luis Ramirez','Sister Elena Vargas',
    ARRAY['Temple trip signup sheets are in the foyer'],
    '{"number":227,"title":"There Is Sunshine in My Soul Today"}'::jsonb,'Sister Olivia Grant',
    '[{"description":"Call of Sister Mia Torres as Relief Society counselor"}]'::jsonb,false,
    '{"number":169,"title":"As Now We Take the Sacrament"}'::jsonb,
    '[{"name":"Sister Ava Chen","topic":"Faith in Jesus Christ","type":"speaker"},{"name":"Ward Choir","topic":"Come, Follow Me","type":"musical-number"},{"name":"Brother Jacob Miles","topic":"Daily repentance","type":"speaker"}]'::jsonb,
    '{"number":100,"title":"Nearer, My God, to Thee"}'::jsonb,'Brother Daniel Ortiz'
  ),
  (
    '2026-11-15','special','Bishop Luis Ramirez','Brother Ethan Cole',
    ARRAY['Primary program practice after church'],
    '{"number":96,"title":"Dearest Children, God Is Near You"}'::jsonb,'Sister Hannah Brooks',
    '[]'::jsonb,false,
    '{"number":176,"title":"Tis Sweet to Sing the Matchless Love"}'::jsonb,
    '[{"name":"Primary Children","topic":"Primary Program","type":"musical-number"}]'::jsonb,
    '{"number":152,"title":"God Be with You Till We Meet Again"}'::jsonb,'Sister Claire Dunn'
  )
`;

const rows = await sql`SELECT id, date, meeting_type, presiding FROM meetings ORDER BY date`;
console.log(JSON.stringify(rows, null, 2));
