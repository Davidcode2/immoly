# AGENTS.md - Immoly (Real Estate Investment Calculator)

## Project Overview

**Immoly** is a real estate investment calculator built with Next.js. It helps users calculate mortgage payments, analyze investment scenarios, and visualize long-term financial outcomes including special repayments (Sondertilgungen), interest rate changes (Zinswechsel), and repayment changes (Tilgungswechsel).

**Key Features:**
- Mortgage calculations with configurable parameters (principal, interest rate, down payment)
- Special repayment (Sondertilgungen) planning
- Interest rate change scenarios (Zinswechsel)
- Repayment rate change scenarios (Tilgungswechsel)
- Amortization table (Tilgungstabelle) generation
- Running costs (Nebenkosten) and property tax (Grundsteuer) calculations
- Chart visualizations (credit sum vs. interest over time)
- Saved scenarios persistence
- Embed mode for external sites

## Tech Stack

- **Framework:** Next.js 15.4.8 (App Router)
- **Language:** TypeScript 5
- **UI:** React 19, Tailwind CSS 4, Radix UI primitives
- **State Management:** Zustand 5.0.7
- **Database:** PostgreSQL with Drizzle ORM
- **Charts:** Recharts 2.15.3
- **Animations:** Motion 12.23.22, tw-animate-css 1.3.8
- **Styling:** clsx, tailwind-merge, class-variance-authority

## Project Structure

```
immoly/
├── src/
│   ├── app/
│   │   ├── (main)/              # Main application routes
│   │   │   ├── page.tsx         # Main calculator page
│   │   │   ├── layout.tsx       # Main layout
│   │   │   └── (metaPages)/     # Meta pages (about, etc.)
│   │   ├── embed/               # Embeddable calculator view
│   │   ├── globals.css          # Global styles
│   │   └── layout.tsx           # Root layout
│   ├── components/              # React components
│   │   ├── about/               # About page component
│   │   ├── bankLinkList.tsx     # Bank offer links
│   │   ├── bankOffer.tsx        # Bank offer display
│   │   ├── baseDataForm/        # Form for base calculation data
│   │   ├── charts/              # Chart components
│   │   ├── creditSum/           # Credit summary components
│   │   ├── drawer/              # Drawer components
│   │   ├── header/              # Header component
│   │   ├── hero/                # Hero section
│   │   ├── monthlyRateInPercent.tsx
│   │   ├── nebenkosten/         # Running costs components
│   │   ├── prices/              # Price display
│   │   ├── savedScenarios/      # Saved calculations management
│   │   ├── slider/              # Slider components
│   │   ├── tilgungstabelle/     # Amortization table
│   │   ├── totalSumVsInterest/  # Sum vs interest chart
│   │   └── ui/                  # Shared UI components
│   ├── services/                # Business logic
│   │   ├── calculationsAccessor.ts
│   │   ├── calculationsLocalStorageSetter.ts
│   │   ├── calculationAccessor.ts
│   │   ├── centerVertically.tsx
│   │   ├── nebenkostenGrundsteuer.ts
│   │   ├── numberFormatService.ts
│   │   ├── sonderAmountBrowserUpdater.ts
│   │   ├── sonderCalculationsHelper.ts
│   │   ├── sondertilgungAccessor.ts
│   │   ├── tilgungswechselAccessor.ts
│   │   └── zinswechselAccessor.ts
│   ├── lib/                     # Utilities and database
│   │   ├── calculateArmotizaztionTable.ts
│   │   ├── calculationAccessor.ts
│   │   ├── calculationDatabaseService.ts
│   │   ├── configService.ts
│   │   ├── db/                  # Database connection
│   │   ├── models/              # Data models
│   │   ├── sondertilgungDatabaseService.ts
│   │   ├── sondertilgungHandler.ts
│   │   ├── tilgungswechselDatabaseService.ts
│   │   └── utils.ts
│   ├── hooks/                   # Custom React hooks
│   ├── store.ts                 # Zustand store
│   ├── constants.ts             # Constants
│   ├── middleware.ts            # Next.js middleware
│   ├── resultDisplay.tsx        # Main results display
│   ├── theme-provider.tsx       # Theme provider
│   └── workers/                 # Web workers
├── drizzle/                     # Database schema and migrations
│   ├── meta/
│   └── migrations/
├── db-customer.sql              # Customer database setup
├── db-seed.sql                  # Seed data
├── db-theme-config.sql          # Theme configuration
├── db-theme.sql                 # Theme setup
├── docker-compose.yml           # Docker development setup
├── dockerfile                   # App container
├── dockerfile.migrations        # Migration container
├── drizzle.config.ts            # Drizzle configuration
├── rename_columns.sql           # Column rename script
├── next.config.ts               # Next.js configuration
├── package.json
└── tailwind.config.js
```

## Database Schema

### Core Tables

**calculations**
- `id` (PK, integer, auto-increment)
- `principal` (integer, NOT NULL) - Loan amount
- `interest_rate` (numeric(8,4), NOT NULL) - Annual interest rate
- `monthly_rate` (integer, NOT NULL) - Monthly payment
- `down_payment` (integer, default 0) - Initial down payment
- `rent` (integer, default 0) - Expected rental income
- `annual_percentage_rate` (integer, NOT NULL) - APR
- `created_at` (timestamp, NOT NULL, default now())

**sondertilgungen** (special repayments)
- `id` (PK, integer)
- `calculation_id` (FK) - Reference to calculations
- `amount` (integer) - Special repayment amount
- `date` (date) - When the repayment occurs

**Other tables** (from service files):
- `tilgungswechsel` (repayment rate changes)
- `zinswechsel` (interest rate changes)

## Key Calculation Concepts

### Mortgage Calculations
- **Principal:** Total loan amount
- **Interest Rate:** Annual interest rate (nominal)
- **Monthly Rate:** Monthly payment amount
- **Down Payment:** Initial payment toward property
- **Annual Percentage Rate (Effektivzins):** Total cost including fees

### Special Repayments (Sondertilgungen)
- Additional payments beyond regular monthly payments
- Can be scheduled at specific dates
- Affect amortization schedule and total interest paid

### Interest Rate Changes (Zinswechsel)
- Modeling fixed-rate periods ending
- New interest rates applied after Zinswechsel
- Affects future monthly payments

### Repayment Rate Changes (Tilgungswechsel)
- Adjusting the repayment rate over time
- Can increase or decrease monthly payments
- Affects loan payoff timeline

### Additional Costs
- **Nebenkosten:** Monthly/yearly running costs (maintenance, insurance, etc.)
- **Grundsteuer:** Property tax calculations

## Development Commands

```bash
npm run dev          # Start development server
npm run debug        # Start with Node inspector
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Environment Variables

- `SKIP_BUILD_STATIC_GENERATION` - Skip static generation (for dynamic builds)
- `DATABASE_URL` - PostgreSQL connection string
- Other standard Next.js environment variables

## Database Migrations

Run migrations with drizzle-kit:
```bash
npx drizzle-kit push    # Push schema changes
npx drizzle-kit migrate # Run migrations
npx drizzle-kit generate # Generate new migration
```

## Common Tasks for Agents

### Adding a New Calculation Type
1. Add column to `drizzle/schema.ts`
2. Create migration in `drizzle/migrations/`
3. Add accessor service in `src/services/`
4. Add component in `src/components/`
5. Update `resultDisplay.tsx` if needed

### Modifying the Database Schema
1. Edit `drizzle/schema.ts`
2. Generate migration: `npx drizzle-kit generate`
3. Review migration file
4. Run migration: `npx drizzle-kit migrate`

### Adding UI Components
1. Use Radix UI primitives when possible (already installed)
2. Follow Tailwind CSS 4 patterns
3. Use `class-variance-authority` for variant management
4. Add to `src/components/ui/` if reusable

### Working with State
- Global state in `src/store.ts` (Zustand)
- Server state via React Server Components
- Database state via Drizzle services in `src/lib/`

## Code Style

- TypeScript strict mode enabled
- ESLint + Prettier configured
- Prettier plugin for Tailwind CSS
- Follow existing component patterns in `src/components/ui/`

## Deployment

Built for Vercel (Next.js platform). Docker support available for other deployments.

## Notes

- This project uses Next.js App Router with React Server Components
- Database is PostgreSQL, connected via Drizzle ORM
- Frontend is primarily client-side interactive with server-side initial render
- Embed mode available at `/embed` route for iframe integration
- Dark mode support via `next-themes` and Radix UI
