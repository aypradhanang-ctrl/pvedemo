# Temporary Client Demo Setup

This project now supports a simple password gate for temporary client review.

## Environment variables

Add these variables to your local `.env.local` or your hosting platform:

```bash
DEMO_MODE_ENABLED=true
DEMO_PASSWORD=your-temporary-client-password
DEMO_SESSION_SECRET=your-long-random-secret
```

To disable the password gate later:

```bash
DEMO_MODE_ENABLED=false
```

## How it works

- When `DEMO_MODE_ENABLED=true`, all public pages redirect to `/demo-login`
- Entering the correct password sets a secure HTTP-only cookie
- The cookie stays active for 7 days
- Visiting `/demo-logout` clears demo access

## Recommended use

- Use this only for short-term client review
- Rotate the password before sharing it with a new group
- Use a different `DEMO_SESSION_SECRET` for production than for local testing
