---
name: api-auditor
description: Audits APIs for security, performance, and documentation consistency. Use when the user wants to review endpoint definitions, scan for vulnerabilities, or ensure API specs match implementation.
---

# API Auditor

This skill provides specialized procedures for auditing APIs, ensuring they adhere to security best practices and maintain consistency with their documentation.

## Core Workflows

### 1. Endpoint & Route Analysis
- **Discovery**: Identify all API endpoints by scanning route definitions in the codebase (e.g., Express, FastAPI, Flask).
- **Access Control**: Audit each endpoint for proper authentication and authorization middleware.
- **Input Validation**: Verify that request bodies, query parameters, and headers are rigorously validated.

### 2. Security Auditing (OWASP API Top 10)
- **Broken Object Level Authorization**: Ensure users can only access their own data.
- **Sensitive Data Exposure**: Check if responses leak PII, secrets, or unnecessary internal state.
- **Mass Assignment**: Check if input models allow updating protected fields (e.g., `isAdmin`).

### 3. Documentation Consistency
- **Spec Verification**: Compare implementation details (method, path, params) against OpenAPI/Swagger specifications.
- **Type Safety**: Ensure runtime behavior matches the declared types in TypeScript or other typed languages.

## Resources
- `scripts/`: Tools for automated route extraction and basic scanning.
- `references/`: Security checklists and auditing standards.
