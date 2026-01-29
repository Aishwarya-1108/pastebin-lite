# Pastebin Lite

A lightweight Pastebin-like web application built with Next.js.  
Users can create text pastes and access them via a unique shareable URL.

---

## Features
- Create and store text pastes
- Access pastes using a unique URL
- Server-side rendering with Next.js App Router
- Redis-backed persistence layer

---

## Tech Stack
- Next.js (App Router)
- TypeScript
- Redis
- Vercel (deployment)

---

## Persistence Layer
Redis is used to store paste content keyed by a unique paste ID.  
Optional expiration (TTL) can be applied to automatically clean up old pastes.  
All persistence is handled externally, making the app safe for serverless environments.

---

