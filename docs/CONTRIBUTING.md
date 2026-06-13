# AUTO HEADS — Contributing

## Branch Naming

```
feature/short-description     # New features
fix/short-description         # Bug fixes
chore/short-description       # Config, deps, CI changes
docs/short-description        # Documentation only
```

## Commit Format

```
type: short description (max 72 chars)

Longer explanation if needed. Focus on WHY, not WHAT.
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`

Example:
```
feat: add M-Pesa STK push to FinanceModal

Safaricom requires the callback URL to be HTTPS.
Local testing uses ngrok tunnel configured in .env.local.
```

## Pull Request Process

1. Branch off `main`
2. Make changes — TypeScript strict mode, no `any` types
3. Run `npm run type-check` and `npm run lint` — both must pass
4. Open PR → GitHub Actions will post a preview URL
5. Request review from David Abel or lead developer
6. Merge only after approval + CI green

## Code Standards

- **TypeScript**: Strict mode — no `any`, no `// @ts-ignore`
- **No plain JavaScript files** in `/src` — `.ts` and `.tsx` only
- **Components**: One component per file, named export (not default)
- **Imports**: Use `@/` alias — never relative `../../` imports
- **Comments**: Only when WHY is non-obvious — no narration of what code does
- **No console.log** in committed code — use `functions.logger` in Cloud Functions

## Testing

- Unit tests in `__tests__/` adjacent to the file being tested
- Run: `npm test`
- CI runs tests on every push — PRs cannot merge if tests fail
