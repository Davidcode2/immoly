# AGENTS.md - Immoly (Real Estate Investment Calculator)

## Project Overview

**Immoly** is a real estate investment calculator built with Next.js. It helps users calculate mortgage payments, analyze investment scenarios, and visualize long-term financial outcomes including special repayments (Sondertilgungen), interest rate changes (Zinswechsel), and repayment changes (Tilgungswechsel).

**Key Features:**
- Mortgage calculations with configurable parameters (principal, interest rate, down payment, rent)
- Special repayment (Sondertilgungen) planning and tracking
- Interest rate change scenarios (Zinswechsel) - modeling fixed-rate periods ending
- Repayment rate change scenarios (Tilgungswechsel) - adjusting monthly payments over time
- Amortization table (Tilgungstabelle) generation with year-by-year breakdown
- Running costs (Nebenkosten) and property tax (Grundsteuer) calculations
- Chart visualizations showing credit sum vs. interest over time
- Saved scenarios persistence (local storage for now, migrating to database)
- Embed mode for external sites (/embed route)
- German localization (finance terms in German)

## Tech Stack

- **Framework:** Next.js 15.4.8 (App Router)
- **Language:** TypeScript 5
- **UI:** React 19, Tailwind CSS 4, Radix UI primitives
- **State Management:** Zustand 5.0.7 (global state)
- **Database:** PostgreSQL with Drizzle ORM
- **Charts:** Recharts 2.15.3
- **Animations:** Motion 12.23.22, tw-animate-css 1.3.8
- **Styling:** clsx, tailwind-merge, class-variance-authority
- **Database Connection:** pg (node-postgres)

## Project Structure

```
immoly/
├── src/
│   ├── app/
│   │   ├── (main)/                      # Main application routes
│   │   │   ├── page.tsx                 # Main calculator page (dynamic = "force-dynamic")
│   │   │   ├── layout.tsx              # Main layout
│   │   │   └── (metaPages)/            # Meta pages (about, etc.)
│   │   ├── embed/                      # Embeddable calculator view (iframe-friendly)
│   │   ├── globals.css                 # Global styles with Tailwind
│   │   └── layout.tsx                  # Root layout
│   ├── components/                     # React components
│   │   ├── baseDataForm/               # USER INPUT: Forms for mortgage parameters
│   │   │   ├── finanzierungsFormContainerMedium.tsx
│   │   │   ├── finanzierungsFormContainer.tsx
│   │   │   ├── finanzierungsForm.tsx   # Main form component
│   │   │   ├── mobileFormContainer.tsx
│   │   │   ├── numberInput.tsx
│   │   │   └── optionalParameters.tsx  # Additional costs input
│   │   ├── charts/                     # Chart visualizations
│   │   │   ├── barChart.tsx
│   │   │   ├── chartsContainer.tsx     # Charts wrapper
│   │   │   └── lineChart.tsx
│   │   ├── creditSum/                  # Credit summary components
│   │   ├── drawer/                     # Drawer components
│   │   ├── header/                     # Header with navigation
│   │   ├── hero/                       # Hero section and branding
│   │   ├── nebenkosten/                # Running costs components
│   │   ├── savedScenarios/             # USER INTERACTION: Save/load/delete scenarios
│   │   │   ├── storedCalculations.tsx
│   │   │   └── storedScenario.tsx
│   │   ├── tilgungstabelle/            # Amortization table display
│   │   │   ├── tilgungstabelleContainer.tsx
│   │   │   └── mobileTilgungsTabelleContainer.tsx
│   │   ├── totalSumVsInterest/         # Chart showing total vs interest
│   │   └── ui/                         # Shared UI components
│   ├── services/                       # Business logic (accessor pattern)
│   │   ├── calculationsAccessor.ts     # Local storage operations
│   │   ├── calculationsLocalStorageSetter.ts
│   │   ├── nebenkostenGrundsteuer.ts   # Property tax calculations
│   │   ├── sondertilgungAccessor.ts    # Special repayment logic
│   │   ├── tilgungswechselAccessor.ts  # Repayment change logic
│   │   ├── zinswechselAccessor.ts      # Interest rate change logic
│   │   └── numberFormatService.ts      # Number formatting utilities
│   ├── lib/                            # Core logic and database
│   │   ├── calculateArmotizaztionTable.ts # 🧮 KEY LOGIC: Core amortization calculation
│   │   ├── calculationDatabaseService.ts  # Database CRUD for calculations
│   │   ├── sondertilgungDatabaseService.ts # 🧮 KEY LOGIC: Special repayments DB ops
│   │   ├── tilgungswechselDatabaseService.ts # 🧮 KEY LOGIC: Repayment changes DB ops
│   │   ├── configService.ts          # Configuration from database
│   │   ├── sondertilgungHandler.ts   # Special repayment event handling
│   │   ├── db/
│   │   │   ├── db.ts                 # Database connection pool
│   │   │   ├── schema.ts             # Database schema (Drizzle)
│   │   │   └── transformCalculations.ts # Data transformation utilities
│   │   └── models/                   # Data models
│   │       ├── calculationDbo.ts
│   │       ├── CashRoiModel.ts
│   │       ├── calculationId.ts
│   │       └── ArmotizationEntry.ts
│   ├── hooks/                        # Custom React hooks
│   │   ├── useReactToInputChange.ts  # React to form input changes
│   │   ├── useTilgungCalculationWorker.ts # Web worker for heavy calculations
│   │   ├── useUpdateSonderamounts.ts # Update special repayments
│   │   └── useDarkThemeClassToggler.ts
│   ├── store.ts                      # Zustand store (global state management)
│   ├── constants.ts                  # Constants and default calculations
│   ├── middleware.ts                 # Next.js middleware
│   ├── resultDisplay.tsx             # 📊 MAIN DISPLAY: Shows all results
│   ├── theme-provider.tsx            # Theme provider for dark mode
│   └── workers/                      # Web workers directory
├── drizzle/                          # Database schema and migrations
│   ├── meta/                         # Migration metadata (Drizzle)
│   └── migrations/                   # SQL migration files
├── docker-compose.yml                # Docker development setup
├── dockerfile                        # App container
├── dockerfile.migrations             # Migration container
└── drizzle.config.ts                 # Drizzle configuration
```

## Key Logic Locations (Core Algorithms)

### 1. Core Amortization Calculation
**File:** `src/lib/calculateArmotizaztionTable.ts`

This is the heart of the calculation engine. It generates the amortization table with the following logic:
- Takes a `CashRoiModel` calculation and nebenkosten (running costs) as input
- Returns an array of `ArmotizationEntry[]` (year-by-year breakdown)
- Handles:
  - **Zinswechsel**: Interest rate changes (finds new rate for specific year)
  - **Sondertilgungen**: Special repayments (lump sum payments at specific years)
  - **Tilgungswechsel**: Repayment rate changes (changes to monthly payment amounts)
- Algorithm: Yearly iteration, calculates interest, principal, remaining balance
- Prevents infinite loops with MAX_ITERATIONS = 120 (10 years)

### 2. Special Repayment Database Service
**File:** `src/lib/sondertilgungDatabaseService.ts`
- CRUD operations for special repayments (Sondertilgungen)
- Links special repayments to specific calculation scenarios
- Date-based scheduling of repayments

### 3. Repayment Change Database Service
**File:** `src/lib/tilgungswechselDatabaseService.ts`
- Handles changes to repayment rates over time
- Models scenarios where monthly payment amounts change

### 4. Interest Rate Change Accessor
**File:** `src/services/zinswechselAccessor.ts`
- Business logic for interest rate scenarios
- Models fixed-rate period endings
- Calculates impact of interest rate changes

### 5. Property Tax and Running Costs
**File:** `src/services/nebenkostenGrundsteuer.ts`
- Calculates Nebenkosten (running costs): notary fees, court fees, real estate agent fees
- Calculates Grundsteuer (property tax) based on Bundesland (state)

### 6. Configuration Service
**File:** `src/lib/configService.ts`
- Fetches customer-specific configurations
- Handles themes per customer
- Manages per-customer database access

### 7. Number Format Service
**File:** `src/services/numberFormatService.ts`
- Formats German number format (German locale)
- Handles currency formatting
- Converts between display and calculation formats

### 8. Local Storage Operations
**File:** `src/services/calculationsAccessor.ts`
- Stores/retrieves calculations from localStorage (migration to DB in progress)
- Handles save, load, delete operations for scenarios
- Dispatches events for React re-renders

## User Interaction Points

### 1. Main Calculator Form (Primary Input)
**Location:** `src/components/baseDataForm/`
**Component:** `finanzierungsForm.tsx`, `finanzierungsFormContainerMedium.tsx`
- **Available on:** Desktop and mobile (different layouts)
- **User actions:**
  - Enter loan amount (principal / Kreditsumme)
  - Enter interest rate (nominal / Sollzins)
  - Enter monthly payment (Monatliche Rate)
  - Enter down payment (Eigenkapital)
  - Enter expected rent (Mieteinnahmen pro Monat)
  - Configure additional costs (Nebenkosten) via optional parameters

### 2. Results Display (Main Output)
**Location:** `src/resultDisplay.tsx`
**Component:** `ResultDisplay`
- **Shows:**
  - 📊 Charts: Credit sum vs. interest over time, total breakdown
  - 📈 Statistics: Total interest paid, total paid, duration
  - 📋 Amortization table (Tilgungstabelle): Year-by-year breakdown
  - 💰 Running costs (Nebenkosten): Calculated additional costs
- **Features:**
  - Live updates as user adjusts inputs
  - Hover tooltips on charts
  - Zoom/pan on timeline charts

### 3. Special Repayments Manager
**Location:** `src/services/` and `src/components/drawer/`
**Components:** Special repayment modal/drawer
- **User actions:**
  - Add multiple special repayments (Sondertilgungen)
  - Set amount and year for each repayment
  - See immediate impact on amortization table
  - Delete or edit scheduled repayments

### 4. Interest Rate Change Manager
**Location:** `src/services/zinswechselAccessor.ts`
**Components:** Zinswechsel modal/drawer
- **User actions:**
  - Model fixed-rate periods ending
  - Set new interest rate for specific year
  - Configure multiple rate changes over time
  - See impact on monthly payments and total cost

### 5. Repayment Change Manager
**Location:** `src/services/tilgungswechselAccessor.ts`
**Components:** Tilgungswechsel modal/drawer
- **User actions:**
  - Model increased/decreased monthly payments
  - Set year when change occurs
  - Multiple changes over loan lifetime
  - See impact on payoff timeline

### 6. Saved Scenarios (Persistence)
**Location:** `src/components/savedScenarios/`
**Components:** `storedCalculations.tsx`, `storedScenario.tsx`
- **User actions:**
  - Save current calculation with a name
  - Load previous scenario (restores all parameters)
  - Delete unwanted scenarios
  - View summary of saved scenarios
  - Share calculation via URL (query parameters)
- **Storage:** Currently localStorage (migration to PostgreSQL in progress)

### 7. Additional Costs Configuration
**Location:** `src/components/baseDataForm/optionalParameters.tsx`
**Settings:**
- **Nebenkosten aktivieren/aktiv** - Enable running costs
- **Bundesland** - Select German state for property tax (Grunderwerbsteuer) rate
- **Maklergebühr %** - Real estate agent fee percentage
- **Notarkosten %** - Notary costs percentage
- **Grundbuchkosten %** - Court registration fees
- **Grunderwerbsteuer** - Calculated based on Bundesland selection

### 8. Embed Mode
**Location:** `src/app/embed/`
- **Purpose:** Allow embedding calculator in external websites
- **Features:**
  - Simplified UI (no navigation)
  - URL parameters for pre-filled values
  - Customizable styling via query parameters
  - Responsive design for iframe integration

## User Flow Example

1. **User lands on main page** (`/(main)/page.tsx`)
2. **Page loads** `ResultDisplay` component
   - Checks for calculationId in URL params (loads saved scenario)
   - Otherwise shows default/empty state
3. **User fills form** (`finanzierungsForm`)
   - Inputs principal, interest rate, monthly payment, down payment, rent
   - Configures optional costs
4. **Real-time calculation**
   - Hook: `useReactToInputChange` detects input changes
   - Calls: `useTilgungCalculationWorker` (web worker) or direct calculation
   - Executes: `calculateArmotizaztionTable.ts` core logic
5. **Display results**
   - Charts update with new data
   - Amortization table refreshes
   - Statistics update (total interest, duration, ROI)
6. **User can add special repayments**
   - Opens modal/drawer
   - Adds Sondertilgungen for specific year
   - Re-calculates and updates display
7. **User saves scenario**
   - Inputs name for scenario
   - Stores in localStorage (or DB if configured)
   - Appears in saved scenarios list
8. **User can share**
   - URLs contain calculationId (like `/main?calculationId=abc123`)
   - Shareable link for others to view same parameters

## Database Schema

### Core Tables

**calculations**
- `id` (PK, integer, auto-increment)
- `principal` (integer, NOT NULL) - Loan amount
- `interest_rate` (numeric(8,4), NOT NULL) - Annual interest rate (nominal)
- `monthly_rate` (integer, NOT NULL) - Monthly payment
- `down_payment` (integer, default 0) - Initial down payment (Eigenkapital)
- `rent` (integer, default 0) - Expected rental income per month
- `annual_percentage_rate` (integer, NOT NULL) - Effective APR (Effektivzins)
- `created_at` (timestamp, NOT NULL, default now())

**sondertilgungen** (special repayments)
- `id` (PK, integer)
- `calculation_id` (FK) - Reference to calculations.id
- `amount` (integer) - Special repayment amount
- `date` (date) - When the repayment occurs (year/month)

**tilgungswechsel** (repayment rate changes)
- `id` (PK, integer)
- `calculation_id` (FK) - Reference to calculations.id
- `amount` (integer) - New monthly rate amount
- `date` (date) - When the change occurs

**zinswechsel** (interest rate changes)
- `id` (PK, integer)
- `calculation_id` (FK) - Reference to calculations.id
- `amount` (numeric) - New interest rate (percentage)
- `date` (date) - When the change occurs

**config**
- `id` (PK, integer)
- `customer_id` (string) - Customer/tenant identifier
- Various configuration columns...

**theme**
- `id` (PK, integer)
- Theme configuration columns (colors, logos, etc.)

**config_theme** (junction table)
- Links config to theme (many-to-many)

## Configuration and Constants

**File:** `src/constants.ts`
- `DEFAULT_CALCULATION` - Default values for new calculations
- `VALID_CALCULATION_INPUT_NAMES` - Array of valid input field names
- Bundled tax rates per German state (Grunderwerbsteuer)
- Notary cost percentages
- Court registration fees

## Development Commands

```bash
npm run dev          # Start development server on http://localhost:3000
npm run debug        # Start with Node inspector (--inspect flag)
npm run build        # Build for production (check SKIP_BUILD_STATIC_GENERATION)
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Build Note:**
- `SKIP_BUILD_STATIC_GENERATION` can be set to skip static generation for dynamic builds
- Useful for builds where database is not available at build time

## Database Migrations

Run migrations with drizzle-kit:

```bash
npx drizzle-kit push      # Push schema changes to database
npx drizzle-kit migrate   # Run pending migrations
npx drizzle-kit generate  # Generate new migration from schema changes
npx drizzle-kit studio    # Launch Drizzle Studio (GUI for DB)
```

**Migration Files Location:** `drizzle/migrations/*.sql`
**Schema Definition:** `drizzle/meta/_journal.json`

## Common Tasks for Agents

### Adding a New Field to Calculation
1. **Add to schema:** Edit `drizzle/schema.ts`, add column to calculations table
2. **Generate migration:** `npx drizzle-kit generate`
3. **Run migration:** `npx drizzle-kit migrate`
4. **Update model:** Edit `src/lib/models/CashRoiModel.ts`
5. **Update form:** Add input field to `src/components/baseDataForm/finanzierungsForm.tsx`
6. **Update calculation logic:** Modify `calculateArmotizaztionTable.ts` if needed
7. **Update display:** Modify `resultDisplay.tsx` if needed

### Modifying the Calculation Algorithm
1. **Primary file:** `src/lib/calculateArmotizaztionTable.ts`
2. **Key function:** `calculateArmotizationTable()`
3. **Add new logic:** Handle inside the yearly iteration loop
4. **Update types:** Modify `ArmotizationEntry` in `src/lib/models/ArmotizationEntry.ts`

### Adding UI Components
1. **Use Radix UI primitives** when possible (already installed)
2. **Follow Tailwind CSS 4 patterns** and use `tw-animate-css`
3. **Use `class-variance-authority`** for variant management
4. **Add to `src/components/ui/`** if reusable across app
5. **Test on mobile** - component should be responsive

### Working with State
- **Global state:** `src/store.ts` (Zustand store)
  - Bundlesland (state for property tax)
  - Nebenkosten toggles (active/inactive)
  - Calculation parameters
- **Server state:** React Server Components in `src/app/`
- **Database state:** Drizzle services in `src/lib/`
- **Local storage:** Used for saving scenarios (migration to DB planned)

### Debugging Calculation Issues
1. **Add console.log** in `calculateArmotizaztionTable.ts` before/after key calculations
2. **Check input values** by logging the CashRoiModel object
3. **Verify table entries** - log the ArmotizationEntry array
4. **Use web worker debugging** - logs from worker thread appear in browser console
5. **Check database values** - query calculations table directly

### Adding a New Chart
1. **Use Recharts** components (already installed)
2. **Add component** in `src/components/charts/`
3. **Import in resultDisplay.tsx**
4. **Pass data** from `ArmotizationEntry[]` or calculated aggregations
5. **Test responsiveness** - charts should resize on small screens

## Environment Variables

**Database:**
- `DATABASE_URL` - PostgreSQL connection string format: `postgresql://user:password@host:port/dbname`

**Build:**
- `SKIP_BUILD_STATIC_GENERATION` - Set to "true" to skip static generation

**Next.js:**
- Standard Next.js env variables apply

## Deployment

**Primary target:** Vercel (optimized for Next.js)
- Automatic deployments from main branch
- Environment variable configuration in Vercel dashboard

**Docker support:**
- `docker-compose.yml` for local development with PostgreSQL
- `dockerfile` for app container
- `dockerfile.migrations` for running migrations

**Self-hosted:**
- Standard Node.js deployment
- Requires PostgreSQL database
- Build: `npm run build`, then `npm run start`
- Database migrations must be run separately

## Notes for AI Agents

**Architecture Decision Records:**
- **App Router** chosen over Pages Router for React Server Component support
- **Zustand** over Redux for simpler global state (less boilerplate)
- **Drizzle ORM** over Prisma for migration control and developer experience
- **Web Worker** (`useTilgungCalculationWorker.ts`) for heavy calculations to avoid blocking UI
- **LocalStorage** used for saved scenarios (migrating to DB for multi-device support)

**German Focus:**
- All finance terms in German (Effektivzins, Sondertilgungen, etc.)
- Property tax rates for German Bundesländer
- German real estate cost structure (Makler, Notar, Grundbuch)

**Key Calculations Understand:**
- **Annuity calculation** (Tilgung + Zins = Rate)
- **Amortization** (remaining balance reduction over time)
- **Effective APR** (Effektivzins) calculation including fees
- **ROI** (Return on Investment) for rental properties
- **Cash-on-Cash ROI** with rental income

**Potential Performance Bottlenecks:**
- Calculation of very long amortization tables (30+ years)
- Large numbers of special repayments (10+)
- Complex Zinswechsel/Tilgungswechsel scenarios
- Solution: Use `useTilgungCalculationWorker.ts` (web worker) for background processing

**Browser Compatibility:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Web Worker support required for calculation worker
- LocalStorage required for saved scenarios
- ES2022+ features (Reflect, bigint, etc.)

**Testing Strategy:**
- Manual testing currently (no automated test suite yet)
- Test calculation accuracy against verified financial calculators
- Verify German tax rates annually (government changes)
- Test embed mode on various host pages

**Security Considerations:**
- SQL injection prevention via Drizzle ORM
- XSS prevention via Next.js automatic escaping
- User data stored in localStorage (client-side only, no PII transmitted)
- Database access controlled by connection string (use restricted DB user)

**Code Style:**
- TypeScript strict mode enabled
- ESLint + Prettier configured (run `npm run lint` before committing)
- Prettier plugin for Tailwind CSS (automatic class sorting)
- Follow existing component patterns in `src/components/ui/`
- German comments and variable names acceptable (domain-specific)
