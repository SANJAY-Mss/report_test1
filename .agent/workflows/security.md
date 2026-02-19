---
description: 
---

🔐 Web Application Security Audit – Quick Checklist
1️⃣ Environment Variables & API Keys
✅ Best Practices

All secrets stored in .env (never hardcoded)

.env in .gitignore

.env.example with dummy values

Public keys prefixed (NEXT_PUBLIC_, VITE_)

Secrets 32+ characters

Separate keys for dev/staging/prod

Rotate keys every 90 days

❌ Never Do

Hardcode API keys in code

Commit .env to Git

Expose secret keys in frontend

Pass API keys in URLs

🔒 Production

Use secret managers (Vercel, AWS Secrets Manager, GCP Secret Manager, Azure Key Vault)

Restrict keys (IP/domain/rate limits)

Enable secret scanning (Gitleaks, TruffleHog)

2️⃣ Supabase Security (RLS)
✅ Required

RLS enabled on all public tables

Policies for SELECT, INSERT, UPDATE, DELETE

Use auth.uid() properly

Use app_metadata (not user_metadata) for roles

Index columns used in policies

Storage buckets protected with RLS

❌ Red Flags

No RLS enabled

USING (true) policies

Exposing service role key in frontend

Using public role carelessly

3️⃣ MongoDB Security
✅ Required

Authentication enabled

TLS/SSL enforced

IP allowlist configured

Credentials stored in environment variables

Strong passwords (16+ chars)

Least privilege user roles

Schema validation enabled

Encryption at rest enabled

Audit logging enabled

❌ Avoid

Root user in app

Hardcoded connection strings

Unfiltered queries (returning all data)

NoSQL injection risks (validate inputs)

4️⃣ API Security
Must Have

JWT verification on protected routes

Secrets in environment (32+ chars)

Rate limiting (especially login)

Input validation (Zod/Joi)

Sanitization for HTML inputs

Proper CORS (no * in production)

Security headers (Helmet.js)

HTTPS enforced

Generic error messages (no stack traces)

5️⃣ Code & DevOps

No sensitive console.log

Dependencies updated regularly

npm audit run often

Secret scanning in CI/CD

SAST tools (Snyk, SonarQube)

🚨 Incident Response (If Key Leaked)

Within 1 hour

Revoke key

Generate new key

Update production

Monitor usage

Within 24 hours

Review logs

Identify exposure source

Assess impact

Fix vulnerability

Document incident

🔎 Security Tools

Gitleaks (secret scanning)

npm audit (dependency vulnerabilities)

Snyk (SAST)

OWASP Top 10 (security reference)

If you want, I can compress this even further into a 1-page ultra-minimal audit card for quick team review.

you make too small and i need it for 12000 char

Got it 👍
You don’t want ultra-short — you want detailed but still condensed, around ~12,000 characters (structured, clean, audit-ready).

Here is a professional mid-length Security Audit Guide (detailed, but not overly bloated):

🔐 Web Application Security Audit Guide

Comprehensive Checklist for Production-Ready Applications

This guide covers:

Environment variables & API key protection

Supabase Row Level Security (RLS)

MongoDB security

API protection best practices

Deployment & DevOps security

Incident response procedures

1️⃣ Environment Variables & API Key Security
1.1 Core Principles

Environment variables protect sensitive credentials from being exposed in source code or client bundles. All secrets must be externalized and injected securely at runtime.

✅ Required Setup

Secrets stored only in .env files (local) or cloud secret managers (production):

Database URLs

API keys (Stripe, OpenAI, SendGrid, etc.)

JWT secrets

OAuth client secrets

Private encryption keys

Public vs Private Keys

Safe for frontend (with restrictions):

Stripe Publishable Key

Supabase anon key (with RLS enabled)

Firebase config

Google Maps key (restricted)

Server-side only (never exposed):

Stripe Secret Key

OpenAI API key

Database credentials

JWT signing secrets

Service role keys

1.2 Audit Checklist – Environment Security

 .env in .gitignore

 .env.example provided (dummy values only)

 No hardcoded API keys in repository

 Public keys prefixed properly (NEXT_PUBLIC_, VITE_)

 Secrets are 32+ characters

 Separate keys per environment (dev/staging/prod)

 Keys rotated every 90 days

 No .env inside public/static folders

 CI/CD secret scanning enabled (Gitleaks, GitGuardian)

🚨 Critical Violations

Hardcoded secret keys in source files

Committed .env files

API keys passed in URL query parameters

Secret keys used in client-side code

1.3 Production Secret Management

Never rely on plain .env in production. Use:

AWS Secrets Manager

Google Secret Manager

Azure Key Vault

Vercel Environment Variables

HashiCorp Vault

Security requirements:

Access control via IAM

Secret access logging

Automated rotation policies

Encrypted storage

2️⃣ Supabase Row Level Security (RLS)
2.1 Why RLS Is Critical

RLS provides database-level enforcement of authorization rules. Even if your API is bypassed, the database remains protected.

Benefits:

Multi-tenant isolation

Per-user data access

Role-based access control

Protection against direct DB misuse

2.2 Mandatory RLS Checks

 RLS enabled on ALL public schema tables

 Policies defined for SELECT, INSERT, UPDATE, DELETE

 No USING (true) policies

 No exposure of service_role key to frontend

 auth.uid() used correctly

 app_metadata used for roles (NOT user_metadata)

 Indexes added to policy columns

 Storage buckets protected with RLS

2.3 Secure Policy Patterns
User Isolation

Users can access only their own data:

SELECT restricted by auth.uid() = user_id

INSERT validated using WITH CHECK

UPDATE requires both USING and WITH CHECK

DELETE restricted to owner

Admin Access

Admins validated through secure role table or app_metadata.

Avoid:

Public role access

Metadata that users can modify

Missing UPDATE/DELETE policies

2.4 Common RLS Vulnerabilities

❌ No RLS enabled
❌ Policies granting access to public role
❌ Overly permissive policies
❌ Role stored in user-editable metadata
❌ Missing storage bucket policies

2.5 Performance Considerations

Add indexes on user_id, team_id, role columns

Use security definer functions for complex checks

Optimize subqueries for faster policy evaluation

3️⃣ MongoDB Security
3.1 Authentication & Connection Security

 Authentication enabled (--auth)

 TLS/SSL enforced

 IP allowlist configured (Atlas)

 Connection string stored in environment variable

 Strong passwords (16+ characters)

 Separate credentials per environment

Never:

Use root user in application

Hardcode connection string

Allow public IP access without restriction

3.2 Role-Based Access (Least Privilege)

Application users must have minimal access:

Read-only user for reporting

Read/write limited to specific database

Admin users restricted and monitored

Checklist:

 No application using dbOwner or root

 Roles documented

 Credential rotation every 90 days

3.3 Schema Validation

MongoDB schema validation enforces:

Required fields

Email format validation

Data types

Enum restrictions

Checklist:

 Validation enabled for user-facing collections

 Required fields enforced

 Validation level set to strict

 Invalid documents rejected

3.4 Injection Prevention

NoSQL injection occurs when unvalidated input modifies query structure.

Required Controls:

Validate input types (string, number, etc.)

Sanitize objects (mongo-sanitize)

Avoid JSON.parse with user input

Always filter queries by authenticated user ID

Never:

Run .find({}) on sensitive collections

Accept raw JSON from users

3.5 Encryption
Required:

Encryption at rest enabled

TLS in transit

Certificate validation

Private networking (VPC, VPN)

Audit:

 TLS required

 No unencrypted traffic

 Key management documented

3.6 Audit Logging

 Authentication logs enabled

 Admin action logging enabled

 Log retention ≥ 90 days

 Suspicious query monitoring

4️⃣ General API Security
4.1 Authentication & Authorization

Every protected route must:

Verify JWT

Validate token expiration

Use strong JWT secret (32+ chars)

Reject invalid or missing tokens

Checklist:

 Middleware applied globally

 No protected route without auth check

 Token verification errors handled safely

4.2 Rate Limiting

Protect against brute force & abuse:

Global API rate limit

Stricter limits on login endpoints

IP-based throttling

Account lockout after repeated failures

4.3 Input Validation & Sanitization

All inputs must be validated using schemas:

Zod / Joi / Yup

Email format validation

Password complexity enforcement

Numeric boundaries

Enum restrictions

Sanitize:

HTML inputs (prevent XSS)

Database inputs (prevent injection)

4.4 CORS Security

Production must NOT use wildcard origin.

Checklist:

 Specific origin configured

 Credentials allowed only when needed

 Preflight handling configured

4.5 Security Headers

Use Helmet.js or equivalent.

Required headers:

Content-Security-Policy

X-Frame-Options

X-Content-Type-Options

Strict-Transport-Security

Referrer-Policy

Checklist:

 CSP configured

 HSTS enabled (1 year)

 No mixed content

5️⃣ DevOps & Code Security

 No sensitive console.log statements

 Stack traces hidden in production

 Dependencies updated regularly

 npm audit executed in CI

 SAST tools (Snyk, SonarQube)

 Secret scanning (Gitleaks)

 Branch protection enabled

 Mandatory code reviews

 CI/CD uses environment secrets only

6️⃣ Deployment Security

 HTTPS enforced

 HTTP redirected to HTTPS

 SSL certificates valid

 Server ports restricted

 Reverse proxy configured securely

 Production logs centralized

 Monitoring alerts enabled

7️⃣ Incident Response Plan
Immediate (Within 1 Hour)

Revoke compromised key

Generate new key

Update production

Force redeploy

Monitor unusual usage

Investigation (Within 24 Hours)

Review logs

Identify exposure source

Assess affected users

Check for data exfiltration

Document findings

Remediation

Patch vulnerability

Improve policies

Rotate related credentials

Conduct internal review

Update documentation

8️⃣ Final Master Audit Checklist
Environment & Secrets

 No secrets in Git

 Cloud secret manager in use

 Key rotation implemented

 No hardcoded credentials

Supabase

 RLS on all tables

 No permissive policies

 Indexes optimized

 Storage secured

MongoDB

 Auth enabled

 TLS enforced

 Least privilege users

 Schema validation enabled

 Injection protections in place

API Security

 JWT verification

 Rate limiting

 Input validation

 Proper CORS

 Security headers

 HTTPS only