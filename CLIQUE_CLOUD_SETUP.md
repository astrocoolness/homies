# Connecting Clique to Supabase + Cloudflare (free tiers)

The code is already written. Connection = creating the two free accounts/projects
and setting environment variables on the **homies1** Vercel project, then redeploying.
Nothing here costs money on the free tiers noted.

## 1. Supabase (activates the app's existing cloud sync + photo fallback)

The app already speaks Supabase (cloud sync in `src/game/cloud.server.ts`): tables
`homie_keepers` / `custom_homies` / `homie_reels` and Storage bucket `homie-files`.
It stays in local-only mode until these are set.

1. supabase.com → New project (Free: 1 GB file storage, 500 MB DB; free projects
   pause after 1 week of inactivity — fine for now, noted in product copy later if needed).
2. Project Settings → API: copy **Project URL** and the **service_role** key (secret!).
   Project Settings → Database: copy the **connection string** (DB URL).
3. SQL Editor: run `supabase/clique.sql` from this repo once (sync receiver +
   photo metadata tables, RLS on, `clique-photos` bucket).
4. Vercel → homies1 → Settings → Environment Variables (Production + Preview):
   - `SUPABASE_URL` = Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role key (server-only, never VITE_-prefixed)
   - `SUPABASE_DB_URL` = connection string

## 2. Cloudflare R2 (photo/media storage: 10 GB free, $0 egress)

1. dash.cloudflare.com → R2 Object Storage → Create bucket: `clique-photos`.
2. R2 → Manage API Tokens → Create token (Object Read & Write, this bucket only):
   copy **Access Key ID** + **Secret Access Key** (shown once), and the **Account ID**
   from the R2 overview page.
3. Optional: enable the bucket's `r2.dev` public URL or attach a custom domain;
   if you do, set it as the public base below.
4. Vercel → homies1 → Environment Variables:
   - `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET=clique-photos`
   - `R2_PUBLIC_BASE_URL` (optional)

## 3. Redeploy + verify

Redeploy homies1 (or merge the cloud PR — a fresh deploy picks up new env vars).
Open `/clique`: the status chips should read **Supabase: connected** and
**Cloudflare R2: connected**, and a test photo upload should report
"Also backed up to Cloudflare R2."

Upload order in code: R2 first, Supabase fallback, device-only if neither is
configured. The Flyspace sync publisher flag (`VITE_FLYSPACE_SYNC_ENABLED`)
stays OFF until the sync receiver endpoint is deployed against `clique_profiles`.
