# Dev SOPs — Practical AI

Index of team **SOPs** and **Cursor skills** — links to each onboarding course. No course content lives here.

**Live hub (GitHub Pages):** https://practical-office.github.io/dev-sops/

## SOP courses

| Loop | Ticket Type (Team Work) | Course |
| --- | --- | --- |
| Bug | `Bug` | [bug-handling-sop](https://practical-office.github.io/bug-handling-sop/) |
| Update | `Update` | [update-sop](https://practical-office.github.io/update-sop/) |
| BML | `BML` | [bml-onboarding](https://practical-office.github.io/bml-onboarding/) |
| Foundation | — | [Cursor-AI-dev](https://practical-office.github.io/Cursor-AI-dev/) (Cursor + Matt Skills) |

**Intake board:** [Team Work (project 2)](https://github.com/orgs/Practical-Office/projects/2)

## Local multi-repo workspace

Open this file in Cursor to work the hub and all SOP courses in one window (each folder stays its own git repo):

[`dev-sops.code-workspace`](dev-sops.code-workspace)

| Folder | Local path |
| --- | --- |
| Hub | `p-ai/dev-sops` |
| Bug | `p-ai/bug-handling-sop` |
| Update | `p-ai/update-sop` |
| BML | `p-ai/bml-onboarding` |
| Cursor AI | `p-ai/Cursor-AI-dev` |

## Local preview

```bash
cd docs && python3 -m http.server 4176
```

## Deploy

GitHub Pages from `/docs` on `main`. See [`docs/reference/DEPLOY.md`](docs/reference/DEPLOY.md).
