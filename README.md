# Revenue Gateway


## Placeholder & Graveyard style notes 

Your tiny apps become cash cows 🐮 by sharing one battle-tested module that you own and can theme, fork, and ship everywhere.

Vercel setup (Gateway project)
	•	Vercel Postgres for the tables above
	•	NEXT_PUBLIC_REVENUE_GATEWAY_URL=https://revenue-gateway.vercel.app
	•	Stripe/Lemon env vars (prices, secrets)
	•	Cron job (optional) for nightly usage rollups
	•	Webhook endpoint: /api/webhooks/stripe (raw body)

Vercel setup (Subsidiary apps)
	•	NEXT_PUBLIC_APP_ID=thatdamtoolbox-web
	•	NEXT_PUBLIC_REVENUE_GATEWAY_URL=https://revenue-gateway.vercel.app
	•	Middleware from SDK wired as shown
	•	An inbound webhook endpoint /api/revenue/entitlement to accept updates

⸻

Why this stays abstract yet easy per app
	•	Abstract: plans & entitlements live in one place (gateway packages/config).
	•	Per-app differences: each app registers with appId and can:
	•	override plan features/limits (merge overlay),
	•	define which routes require which plan (middleware rules),
	•	present custom marketing copy while still using the shared checkout.
	•	Provider-agnostic: adapters in lib/adapters/* (Stripe today; Lemon Squeezy next).
	•	Auth-agnostic: apps keep their own user sessions; gateway trusts only a handoff JWT and returns an entitlement JWT + webhook.

⸻

Namespacing & conventions (fits your style)
	•	App IDs: thatdamtoolbox-web, camera-monitor, repocate-ui
	•	Metrics: requests, exports, overlay-minutes, ndi-streams
	•	Feature flags: focus_peaking, zebras, false_color, priority_queue

⸻

TL;DR

Yes—run it separate and route users to/from it based on auth with a signed handoff. Call it Cdaprod/revenue-gateway. Scaffold it as a tiny Next.js portal + adapters + SDK. Subsidiary apps adopt a one-file middleware and a small webhook, keep their own auth, and inherit/override plan logic as needed. This gives you one revenue brain powering all your Vercel apps—clean, composable, monetizable. 🐮
## Development

```sh
npm install
npm test
```

