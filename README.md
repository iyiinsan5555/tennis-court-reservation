# Court Schedule

A static tennis court reservation board. No backend, no database — the page
reads and writes a JSON file (`data/reservations.json`) in this repo directly
through the GitHub REST API, and GitHub Pages serves the static files.

This copy is wired to:

- Repo owner: `iyiinsan5555`
- Repo: `tennis-court-reservation`
- Branch: `main`
- Data file: `data/reservations.json` (at the repo root, no subfolder wrapper)

Those are hardcoded at the top of `app.js` (`DEFAULT_CONFIG`) — there's no
connection screen in the UI anymore. If you ever fork this for a different
repo, that's the one place to change.

## How it works

- **Reading** the weekly schedule works for anyone who opens the page, no
  login needed.
- **Writing** (adding/cancelling reservations) requires a GitHub personal
  access token with write access to this repo, entered under the **Admin**
  button in the top right. The token field is masked by default like a
  password — there's a **Show** button next to it if you need to check what
  you typed, so it isn't visible on-screen to someone glancing at your
  device.
- Every save is a git commit to `data/reservations.json`, so you get a full
  reservation history for free in the repo's commit log.

## One-time setup

1. **Push these files** to the `tennis-court-reservation` repo under
   `iyiinsan5555`, keeping the structure: `index.html`, `style.css`,
   `app.js`, and `data/reservations.json`.
2. **Enable Pages**: repo → Settings → Pages → Build and deployment →
   Source: "Deploy from a branch" → branch `main`, folder `/ (root)` →
   Save. The site will be at
   `https://iyiinsan5555.github.io/tennis-court-reservation/`.
3. **Create a token**:
   - GitHub → Settings → Developer settings → Personal access tokens →
     Fine-grained tokens → Generate new token.
   - Repository access: only `tennis-court-reservation`.
   - Permissions: **Contents → Read and write**. Nothing else needed.
   - Set an expiration and regenerate it periodically.
4. **Open the site**, click **Admin**, paste the token, and click
   **Save token**. Leave "remember on this device" unchecked on
   shared/public computers — otherwise it only lasts that browser tab.

## What changed from a plain day view

The schedule now shows a full week (Mon–Sun) at once as a grid — time slots
down the side, days across the top. Use the arrows to move a week at a time,
**This week** to jump back to today's week, or the date field to jump to any
specific week. Clicking an open cell books it; clicking a booked cell shows
the reservation details and (if you're signed in with a token) a cancel
button.

## Things to know before you rely on this

- **The data file is public** if this repo is public, which it needs to be
  for free GitHub Pages hosting in most cases. Anyone who knows the repo URL
  can read `data/reservations.json` directly — names, phone numbers, and
  notes included. If that's a concern, drop phone numbers from the form, or
  look into a private repo plus GitHub's current docs on private Pages
  access for your account type.
- **Rate limits**: authenticated requests get 5,000/hour; unauthenticated
  reads (visitors without a token) get 60/hour from the same network — fine
  for one court's traffic.
- **Concurrent edits**: the app uses the file's git SHA to avoid silently
  overwriting someone else's change. If two admins save at once, the second
  save is rejected and the app reloads the latest data so they can retry.
- **Court/hours config**: edit the constants at the top of `app.js`
  (`COURTS`, `OPEN_HOUR`, `CLOSE_HOUR`, `SLOT_MINUTES`) to match your setup.

## Data format (`data/reservations.json`)

```json
{
  "reservations": [
    {
      "id": "unique-id",
      "court": "Court 1",
      "date": "2026-09-05",
      "startTime": "14:00",
      "customerName": "Jane Doe",
      "phone": "555-1234",
      "notes": ""
    }
  ]
}
```
