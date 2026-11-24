# Connecting Clique to Supabase + Cloudflare (free tiers)

The app has upload adapters, but setting environment variables only marks them **configured**;
it does not prove connectivity or successful uploads. Private, browser-readable cloud
photo retrieval is not implemented yet. Do not treat configuration as a release gate.
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
3. **Keep `r2.dev` public access disabled for private profile photos.** Do not
   expose a public bucket or custom-domain URL as a substitute for authenticated
   user-scoped reads. A private retrieval endpoint or short-lived authorized
   signed URLs must be implemented and tested before cross-device viewing ships.
4. Vercel → homies1 → Environment Variables:
   - `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET=clique-photos`
   - Do not set `R2_PUBLIC_BASE_URL` for private photos; an authenticated read path is still required.

## 3. Redeploy + verify

Redeploy homies1 (or merge the cloud PR — a fresh deploy picks up new env vars).
Open `/clique`: the chips may read **Supabase: configured** and
**Cloudflare R2: configured** when credentials exist. These are **not live health checks**.
Use a designated test account and private test backend for an end-to-end upload
and authenticated owner-only read test, including cross-user denial, before
claiming a usable cloud photo feature. The uploader reports the backend used
only after a successful PUT/POST response; the original remains on the device.

Upload order in code: R2 first, Supabase fallback, device-only if neither is
configured. The Flyspace sync publisher flag (`VITE_FLYSPACE_SYNC_ENABLED`)
stays OFF until the sync receiver endpoint is deployed against `clique_profiles`.

## 4. Release blockers (issue #9)

- A successful credential/configuration status is not a successful connection test.
- Private owner-only browser retrieval is not yet implemented; uploaded objects must not be exposed by public URLs.
- The 10 MiB validator/data-URL transport ceilings are now aligned in the isolated V5 fix branch, but binary/multipart upload is still preferable to a large JSON data URL.
- Authenticated cloud smoke tests, cross-user isolation, retry/orphan cleanup and production build verification remain required; do not promote without explicit approval.
