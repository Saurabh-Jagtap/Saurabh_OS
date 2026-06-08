# SaurabhOS

> A personal engineering workspace documenting my journey from developer to engineer through projects, experiments, and systems thinking.

## Overview

SaurabhOS is more than a traditional portfolio website. It serves as a personal engineering workspace where I showcase projects, document my learning journey, experiment with modern web technologies, and build features incrementally in public.

The project is being built as part of my Web Development Cohort journey and focuses on applying real-world engineering concepts such as monorepo architecture, type-safe APIs, database design, ownership-based authorization, and scalable frontend architecture.

---
<img width="1897" height="886" alt="SaurabhOS_LandingPage" src="https://github.com/user-attachments/assets/437f7467-ec1d-4ba0-ba63-02d9fcef9d46" />
<img width="1894" height="906" alt="SaurabhOS_ProjectsPage" src="https://github.com/user-attachments/assets/c4d7e071-9dbd-4b3f-ae5e-94ec94d91882" />
<img width="1897" height="906" alt="SaurabhOS_Architecture" src="https://github.com/user-attachments/assets/d39bee1e-e13e-43a8-a0b9-1480fed7b2ef" />
<img width="1898" height="905" alt="SaurabhOS_Contact" src="https://github.com/user-attachments/assets/15fd1466-c4a3-4e30-ae2e-fc579793d282" />



## Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Lucide React

### Backend

* tRPC
* Node.js
* TypeScript

### Database

* PostgreSQL
* Drizzle ORM

### Monorepo

* Turborepo
* PNPM Workspaces

### Other Tools

* Zod
* Vercel
* Git & GitHub

---

## Features Implemented

### Portfolio Showcase

* Modern custom UI
* Responsive layout
* Dynamic project showcase
* Database-driven project rendering

### Guestbook System

* Create guestbook entries
* Edit guestbook entries
* Soft delete guestbook entries
* Visitor ownership validation
* Recent entries display

### Visitor Tracking

* Visitor identification
* Persistent visitor sessions
* Ownership-based actions

### Project Reactions

* Multiple reaction types
* Per-visitor reactions
* Reaction aggregation

### Engineering Journey

* Timeline of learning milestones
* Cohort progress documentation
* Project evolution tracking

### Monorepo Architecture

* Shared packages
* Shared types
* Shared services
* Shared database layer

---

## Architecture

```text
SaurabhOS
│
├── Presentation Layer
│   ├── Hero
│   ├── Projects
│   ├── Journey
│   ├── Guestbook
│   └── Contact
│
├── Application Layer
│   ├── tRPC Routers
│   ├── Services
│   ├── Validation
│   └── Shared Types
│
└── Data Layer
    ├── Visitors
    ├── Projects
    ├── Guestbook
    └── Reactions
```

---

## Project Structure

```text
apps/
└── web/

packages/
├── database/
├── services/
├── trpc/
└── types/
```

---

## Database Tables

### Visitors

Stores unique visitor identities.

### Projects

Stores project metadata and showcase information.

### Guestbook

Stores public visitor messages.

### Reactions

Stores project reactions and engagement data.

---

## Routes / Pages

### Current Pages

```text
/
```

### Planned Pages

```text
/projects
/projects/[slug]

/journey

/guestbook
```

---

## API Layer

### tRPC Procedures

#### Health

```text
health.getHealth
```

#### Visitor

```text
visitor.identify
```

#### Guestbook

```text
guestbook.createEntry
guestbook.getEntries
guestbook.updateEntry
guestbook.deleteEntry
```

#### Projects

```text
project.getProjects
```

#### Reactions

```text
reaction.reactToProject
reaction.getReactionCounts
```

---

## Server Actions

Currently not implemented.

Planned use cases:

* Contact form submission
* Admin project management
* Guestbook moderation

---

## Rendering Strategies

### SSR (Server Side Rendering)

Planned

### SSG (Static Site Generation)

Planned

### ISR (Incremental Static Regeneration)

Planned

Current focus has been on architecture, database integration, and feature implementation before introducing advanced rendering strategies.

---

## Concepts Covered

This project demonstrates concepts learned throughout the Web Development Cohort:

* Git & GitHub
* HTML & CSS
* JavaScript Fundamentals
* React
* Next.js
* TypeScript
* API Design
* Database Integration
* PostgreSQL
* Drizzle ORM
* Validation using Zod
* tRPC
* Monorepo Architecture
* Ownership-based Authorization
* Soft Deletion Patterns
* Component Architecture

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=

NEXT_PUBLIC_API_URL=
```

---

## Database Setup

### Install Dependencies

```bash
pnpm install
```

### Generate Migrations

```bash
pnpm db:generate
```

### Run Migrations

```bash
pnpm db:migrate
```

### Seed Database

```bash
pnpm db:seed
```

---

## Running Locally

### Install Dependencies

```bash
pnpm install
```

### Start Development Server

```bash
pnpm dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## Current Status

🚧 Active Development

The project is still under active development.

Upcoming work includes:

* Dynamic project detail pages
* Public API routes
* Server Actions
* SSR / SSG / ISR implementation
* Contact system backend
* Improved project analytics
* Real-time reactions
* Additional engineering features

---

## Lessons Learned

Building SaurabhOS has helped me transition from thinking purely as a developer to thinking more like an engineer by focusing on:

* Architecture decisions
* Scalability
* Ownership and authorization
* Maintainability
* Reusability
* System design

---

## Author

**Saurabh Jagtap**

Building in public, learning continuously, and documenting the journey one project at a time.

⭐ If you found this project interesting, feel free to explore the codebase and share feedback.
