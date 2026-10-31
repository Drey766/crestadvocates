# Crest Advocates: Claude Code kit

This folder is a ready-to-use kit. Claude Code reads `CLAUDE.md` automatically every session, so the rules never have to be pasted again. The detailed spec is in `docs/BRIEF.md` and the build order is in `docs/PHASES.md`.

```
CLAUDE.md                      short, always-loaded rules and guardrails
docs/BRIEF.md                  the full spec (pages, copy, data, design)
docs/PHASES.md                 7 build phases, one per session
assets/                        the two original images (logo and Lynn)
scripts/prepare-assets.mjs     turns them into the web-ready images
.claude/settings.json          pre-approves lint/build/git commit so you aren't prompted every time
.claude/skills/audit-conduct/  the /audit-conduct command (checks the legal-conduct rules)
```

## 1. Install Claude Code (Windows, PowerShell)

```powershell
irm https://claude.ai/install.ps1 | iex
claude --version
```

Close and reopen PowerShell if `claude` isn't recognised. Git for Windows is recommended. You also need Node.js 20 or newer for the website itself (`node -v` to check).

## 2. Put the kit in a project folder

Unzip the kit **into** a project folder so `CLAUDE.md` sits directly inside it, not in a nested folder. The simplest way is in PowerShell (change the paths to suit):

```powershell
Expand-Archive "$HOME\Downloads\crest-advocates-claude-code-kit.zip" -DestinationPath E:\code\crest-advocates
cd E:\code\crest-advocates
dir          # you should see CLAUDE.md, docs, assets, scripts
git init
```

## 3. Start Claude Code and build

```powershell
claude
```

The first time, it asks you to sign in and to trust the folder. Say yes.

Then paste this, changing the number:

```
Read CLAUDE.md, then do Phase N from docs/PHASES.md (and read the BRIEF sections it names). Do that phase only. When lint and build pass, commit and give me a short report.
```

- **Phase 1:** press **Shift+Tab** until the mode shows *plan* first. Claude shows its plan and waits for your approval before changing files.
- After each phase, run `npm run dev` (or ask Claude to), look at http://localhost:3000, then type `/clear` and paste the prompt for the next phase.
- Finish with Phase 7, which runs `/audit-conduct` and writes the README with the checklist for Lynn.

## Handy commands inside Claude Code

| Command | What it does |
|---|---|
| `/clear` | Start fresh between phases. `CLAUDE.md` reloads; your code is untouched |
| `/compact` | Shrink a long conversation if a phase runs long |
| `/memory` | See and edit the `CLAUDE.md` files in use |
| `/permissions` | See what Claude may run without asking |
| `/audit-conduct` | Checks the site against the law-firm conduct rules |
| `@docs/BRIEF.md` | Point Claude at a file in your prompt |

You do not need `/init`, because `CLAUDE.md` is already written.

## If something goes wrong

- **`npm.ps1 cannot be loaded` in PowerShell:** run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, then try again.
- **Claude Code asks permission a lot:** that is normal for anything beyond `npm run`, `git add` and `git commit`. Approve what looks right.
- **Image script says "Missing" or wrong size:** run it from the project root, and keep the files in `assets/` named exactly `logo-original.jpg` and `owner-original.jpg`.
- **A phase stops halfway:** type `continue`, or say which item it stopped at.

## Two things to know

- `assets/owner-original.jpg` shows client files in the foreground. Phase 1 adds it to `.gitignore` so it never reaches GitHub. Don't remove that line.
- Nothing here is final copy. Services (except the retainer), mission and vision, FAQs and all six blog posts are drafts for Lynn to review before launch.
