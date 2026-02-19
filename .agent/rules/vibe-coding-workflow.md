---
trigger: always_on
---

🤖 1. What is Vibe Coding?

Vibe Coding (AI-assisted coding / prompt-driven development) = Using AI tools to rapidly generate code via natural language.

Traits

✅ Fast MVP development

⚠️ Inconsistent patterns

⚠️ Duplicate components

⚠️ Over-engineering

⚠️ Outdated practices

✅ Good starting baseline

Popular AI Coding Tools (2025)

v0.dev – UI generator (shadcn/ui) – High

Bolt.new – Full-stack apps – Medium

Lovable.dev – Production-ready apps – High

Claude Artifacts – React components – Medium-High

GitHub Copilot – IDE completion – Variable

Cursor – Full file generation – High

Codeium – Free Copilot alternative – Medium

📋 2. Audit Workflow
2.1 Initial Assessment (30 mins)

Project Structure

Clear folders?

Organized by feature/type?

Duplicates?

Tests present?

Proper TypeScript?

Dependencies

npm outdated

npm audit

Unused/duplicate packages?

Large bundle?

Security issues?

Quick Scan

ESLint errors

tsc --noEmit

Count TODO/FIXME

2.2 Deep Dive
🔁 Component Reusability

No duplicate buttons/cards/modals

Props-based configuration

Composition > duplication

Generic naming

Refactor multiple similar components → single variant-based component.

🧠 State Management

Common issues:

Overuse of useState

Prop drilling

No server/client separation

Global state misuse

Fixes:

Use Context for shared state

Prefer lightweight store like zustand

Avoid deep prop drilling

🎨 Styling Consistency

Check for:

Inline styles

Magic Tailwind values

Mixed styling systems

Hardcoded colors

No design tokens

Standardize:

Define CSS variables (colors, spacing, typography)

Extend Tailwind config

Use cn() utility for class merging

🌐 API Integration

Red flags:

Direct fetch() in components

No loading/error states

Exposed API keys

No caching

Best practice:

Use @tanstack/react-query

Centralized API client

Proper error handling

Environment-based config

🔧 3. Automation
Linting & Formatting

ESLint

Prettier

TypeScript strict mode

Code Analysis

SonarQube scanner

Bundle Analysis

Next.js bundle analyzer

Accessibility

@axe-core/react

eslint-plugin-jsx-a11y

📊 4. Performance Optimization
Common Issues

Large components

No memoization

Unnecessary re-renders

No lazy loading

Quick Wins

React.memo for pure components

Lazy load routes/components

Optimize images (next/image)

Use useCallback for handlers

Use React Profiler

🎯 5. Best Practices
Prompting

Good:

Be specific (TypeScript, accessibility, patterns)

Request reusable components

Ask for hooks with loading/error handling

Bad:

“Make a button”

“Build entire app”

“Fix this” (no context)

Iterative Workflow

Generate

Lint

Fix types

Test

Refactor reusable parts

Add to component library

Documentation

Typedoc

Storybook

Clear README

Document env variables

✅ 6. Audit Checklist (Quick View)

Pre-Audit

Install + run

Review dependencies

Security scan

Code Quality

ESLint clean

Type-safe

No duplicate components

Proper state patterns

Performance

Lighthouse audit

Bundle size check

Memoization + lazy loading

Security

No API keys in repo

.env ignored

Input validation

Auth review

Styling

Design tokens

Consistent spacing/colors

Responsive + dark mode

Testing

Critical path tests

Error scenario coverage

Documentation

Setup instructions

API docs

Component docs

📚 Resources

ESLint

Prettier

SonarQube

Lighthouse

React DevTools

ReactPatterns.com

TypeScript Handbook

Web.dev