# Private Packages Guide (GitHub Packages)

Reference for making `@nuraindev/hello-world-button` and `@nuraindev/red-button`
private on GitHub Packages, and for letting another GitHub account install them.

## How visibility works here

These packages publish to **GitHub Packages** (`https://npm.pkg.github.com`).
On GitHub Packages, package visibility is controlled in the **GitHub UI**, not in
`package.json`. The `publishConfig.access` field only records intent:

- `public` = anyone with any valid GitHub token can install.
- `restricted` = only accounts granted access to the package/repo can install.

Both packages are set to `"access": "restricted"` in their `package.json`.
Actual private/public status is set on GitHub as described below.

> Note: GitHub Packages requires a token for **every** install, even public ones.
> The difference with private is *who* is allowed, not *whether* a token is needed.

---

## Part 1 — Make both packages private

Do this once per package in the GitHub web UI.

1. Go to the package page:
   `https://github.com/users/nuraindev/packages/npm/package/hello-world-button`
   (repeat for `red-button`).
2. Open **Package settings** (right-hand side).
3. Scroll to **Danger Zone** -> **Change visibility**.
4. Select **Private** and confirm by typing the package name.
5. Repeat for the second package.

If a package's visibility is locked to the repo, set the **repository** itself to
private: Repo -> **Settings** -> **General** -> **Danger Zone** -> **Change
repository visibility** -> **Private**.

### Effect on existing installs
- Projects that already have the package in `node_modules` keep working (nothing
  is re-downloaded at runtime).
- Any fresh `npm install`, `npm ci`, or CI build **without proper access** fails
  with `401`, `403`, or `404`.

---

## Part 2 — Install from a different GitHub account (no repo access yet)

### Step 1: Grant that account access

**Personal repo (this case, `nuraindev/...`):**
1. Repo -> **Settings** -> **Collaborators** -> **Add people**.
2. Enter the other account's GitHub username and send the invite.
3. They accept the invite (email or `https://github.com/notifications`).

Repo read access is enough to install. Write/admin is only needed to publish.

**If packages are under an organization instead:**
- Invite the account to the org/team and give the team repo access, or
- Package page -> **Package settings** -> **Manage access** -> add the account
  directly to the package.

### Step 2: The invited account creates a token

1. On **their own** account: **Settings** -> **Developer settings** ->
   **Personal access tokens** -> **Tokens (classic)** -> **Generate new token**.
2. Scope required: **`read:packages`** (add `repo` if the repo is private).
3. Copy the token (starts with `ghp_...`). Store it safely; it is shown once.

Each person uses their own token. Never share yours.

### Step 3: Configure `.npmrc` in the consuming project

Create/edit `.npmrc` in the project that installs the package:

```
@nuraindev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then export the token in the shell (keeps it out of source control):

```bash
export GITHUB_TOKEN=ghp_theirTokenHere
```

You can also paste the token literally after `_authToken=`, but do **not** commit
that file. Prefer the env-var form and add `.npmrc` to `.gitignore` if it holds a
literal token.

### Step 4: Install

```bash
npm install @nuraindev/red-button
# or
npm install @nuraindev/hello-world-button
```

---

## Troubleshooting

| Error | Likely cause |
| --- | --- |
| `401 Unauthorized` | Missing/invalid token, or token lacks `read:packages`. |
| `403 Forbidden` | Token valid but account not granted access to the package/repo. |
| `404 Not Found` | Private package the account cannot see (GitHub hides it), or wrong package name/scope. |

Checklist:
- Token has `read:packages` (and `repo` if the source repo is private).
- Invite to the repo/org was **accepted**.
- `.npmrc` scope line matches the package scope (`@nuraindev`).
- `GITHUB_TOKEN` is actually exported in the current shell / CI environment.

---

## CI note

In GitHub Actions, `secrets.GITHUB_TOKEN` can read/publish packages within the
same repo (see `.github/workflows/publish.yml`). To install a private package in a
**different** repo's workflow, use a PAT with `read:packages` stored as a secret,
not the default `GITHUB_TOKEN`.
