# Engagement Hub — Full-Stack Challenge (Frontend)

Build a **React + TypeScript + Vite** web application using **ui5-webcomponents-react**, connected to **your own backend**.  
The goal is to design and implement a small CRUD system for managing **Propositions** and their **Plans**.

---

## Tech Constraints

- **Language:** TypeScript
- **Framework:** React
- **Bundler:** Vite
- **Design System:** [ui5-webcomponents-react](https://sap.github.io/ui5-webcomponents-react/v2/?path=/docs/getting-started--docs)
- **Charts:** [ui5-webcomponents-react-charts](https://www.npmjs.com/package/@ui5/webcomponents-react-charts) - documentation available within ui5-webcomponents-react docs
- **(Optional)** Tests with Cypress or Vitest Testing Library

---

## Overview

Implement an app that allows users to:

1. View a list of **Propositions**
2. View **Proposition Details**
3. **Create** a new proposition (and add plans while creating)
4. **Edit** a proposition (and its plans)
5. **Delete** a proposition

Use a clean, consistent UI with **ui5-webcomponents-react**.

---

## Pages & Features

### 1) Global Header

A persistent header must be present across the app:

- **App Name** (your choice). Clicking it should navigate to the **home screen**.
- A **button** that navigates to the **Propositions Library** (the list of propositions page).

---


### 2) Home Dashboard

**Route:** `/`

Display a dashboard with **two charts**, backed by the backend API:

1. **Bar chart** — **Average premium by proposition status**  
   (e.g., `ACTIVE`, `INACTIVE`, `DRAFT` → average of plan base premiums per status)

2. **Line chart** — **Number of created propositions per day**  
   (time series by creation date)

Show a **BusyIndicator** while loading, and reasonable empty/error states.  
Chart styling is up to you; use any charting library.

---

### 3) Propositions List

**Route:** `/propositions`

Display a table of propositions fetched from the backend.

**Each row includes:**
- **ID**
- **Name**
- **Line of Business** (e.g., `TRAVEL`, `AUTO`, `HOME`)
- **Number of Plans**
- **Minimum Premium** (lowest plan premium, formatted as currency e.g., `$100.00`)
- **Status** (e.g., `ACTIVE`, `INACTIVE`, `DRAFT`) shown as a Tag/Badge
- **Actions:** View Details, Edit, Delete

**Requirements:**
- Sorting, filtering, and pagination are **server-side**.
- Show a **BusyIndicator** while loading and an **IllustratedMessage** for empty states.
- Confirm before deleting.
- **Optional** Filtering by Line of Business and Status.

---

### 4) Proposition Details

**Route:** `/propositions/:id`

Use a **DynamicPage** (or **ObjectPage**) to show:

**Header (key facts):**
- Name
- Line of Business
- Status
- Description (optional field)

**Content: Plans Table**
- **Plan ID**
- **Plan Name**
- **Base Premium** (currency)

**Optional** Add/remove plans here (inline actions or a modal).

---

### 5) Create Proposition

**Route:** `/propositions/new`

Form to create a proposition using **Form**, **Input**, **Select**, **Button**.

**Fields:**
- **Name**
- **Line of Business**
- **Status**
- **Description** (optional)

**Plans subsection (on the same page):**
- Add multiple plans before submitting.
- Each plan: **Name**, **Base Premium**.
- Allow add/remove of plan rows.

**On submit:** Create the proposition (and its plans) and redirect to the details page.

---

### 6) Edit Proposition

**Route:** `/propositions/:id`

Same form as creation, prefilled with existing data.  
Allow editing proposition fields and managing plans (add/remove/update).  
**On submit:** persist the changes and switch to details view.

---

### 7) Delete Proposition

Allow deletion from the list and/or details page with a confirmation dialog.

---

## UI Component Suggestions

| Area | Components |
| --- | --- |
| Tables | `AnalyticalTable` |
| Forms | `Form`, `FormItem`, `Input`, `Select`, `CheckBox`, `Button` |
| Layout | `DynamicPage`, `ObjectPage`, `FlexBox`, `VBox` |
| Loading | `BusyIndicator` |
| Empty/Error | `IllustratedMessage`, `MessageStrip` |
| Icons | `add`, `edit`, `delete`, `accept`, `decline`, `navigation-right-arrow` |

---

## Functional Requirements

- Full **CRUD** against your backend.
- **Server-side** sorting, filtering, and pagination for list tables.
- Clear TypeScript models (e.g., `Proposition`, `Plan`).
- Robust async state handling (loading, error, empty).
- Clean project structure and modular code.

---

## Expectations

- Idiomatic React + TypeScript.
- Consistent **ui5-webcomponents-react** usage.
- Thoughtful UX (validation, confirmations, errors).
- Clean commit history and clear instructions to run the app.

---

## Optional Enhancements

- React Query (caching, mutations).
- Component/Cypress tests.
- Dockerfile.
- Toasts for feedback on save/delete.
