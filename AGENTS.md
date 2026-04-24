# Guidelines for AI Agents

This document provides guidelines for AI agents (like GitHub Copilot, Cursor, etc.) when working on this project. These constraints ensure code quality, maintainability, and adherence to best practices.

## Core Constraints

### 1. All Standard Commands Must Work

The following commands must always work after any changes:

```bash
npm ci           # Clean install
npm run build    # TypeScript compilation
npm run lint     # Code linting
npm test         # All tests
```

If a change breaks any of these commands, it must be fixed before committing.

### 2. No Pinning to Old Versions

**❌ Never pin dependencies to old/outdated versions** to work around issues.

```json
// BAD - Pinning to old version
"dependencies": {
  "some-package": "1.2.3"  // Locked to old version
}

// GOOD - Use version ranges
"dependencies": {
  "some-package": "^2.0.0"  // Latest compatible version
}
```

**Rationale:** Pinning creates technical debt and prevents security updates.

**When dependencies have issues:**
- ✅ Find and migrate to maintained alternatives
- ✅ Use `overrides` temporarily only if you have a plan to eliminate them
- ✅ Update requirements (e.g., Node version) if it enables better solutions
- ❌ Don't pin to old versions

### 3. Never Ignore Type Information

**❌ Do not disable TypeScript type checking** for our code or dependencies.

```typescript
// BAD - Disabling type checking
// @ts-ignore
// @ts-nocheck

// BAD - Overly permissive tsconfig
{
  "compilerOptions": {
    "skipLibCheck": true,        // Only acceptable for d.ts files
    "noImplicitAny": false,      // Should be true
    "strict": false              // Configure individual strict options
  }
}
```

**Good practices:**
- ✅ Fix type errors properly
- ✅ Add proper type definitions when needed
- ✅ Use `skipLibCheck: true` only for declaration files (acceptable)
- ✅ Keep `noImplicitAny`, `strictFunctionTypes`, etc. enabled
- ✅ Check for unused code with `npx tsc --noUnusedLocals --noUnusedParameters --noEmit`

### 4. Follow Best Practices

All changes must align with current best practices:

- ✅ Use modern, actively maintained dependencies
- ✅ Follow semantic versioning principles
- ✅ Write clean, readable code
- ✅ Update documentation when changing behavior
- ✅ Ensure backward compatibility unless it's a major version
- ✅ Remove deprecated dependencies proactively

### 5. Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/) format for compatibility with release automation tools.

**For breaking changes, always include a BREAKING CHANGE footer:**

```
feat: add new feature

This is a detailed description of the change.

BREAKING CHANGE: Describe what breaks and how to migrate.
Provide clear guidance for users upgrading.
```

**Common scenarios requiring BREAKING CHANGE:**
- ✅ Updating minimum Node.js version
- ✅ Removing or renaming public APIs
- ✅ Changing CLI behavior in backwards-incompatible ways
- ✅ Updating peer dependencies with breaking changes

**Format:**
- The footer must start with `BREAKING CHANGE:` (with colon)
- Can span multiple lines
- Should explain what changed and migration path
- This triggers a major version bump in release-please

### 6. Avoid npm Overrides

**npm `overrides` should be avoided** when possible. They are a last resort, not a first solution.

```json
// LAST RESORT ONLY
"overrides": {
  "vulnerable-package": "^safe-version"
}
```

**Preferred solutions (in order):**
1. **Update the dependency** that has the issue
2. **Switch to an alternative** maintained package
3. **Update requirements** (e.g., Node version) to enable better solutions
4. **Contribute/fork** if the package is critical but unmaintained
5. Use `overrides` temporarily with a plan to eliminate it

**If you must use overrides:**
- Document WHY in comments or commit message
- Create a plan to eliminate it
- Regularly review if it's still needed

## Project-Specific Context

### Technology Stack

- **TypeScript**: Version 6+ (keep up to date)
- **Node.js**: Version 20+ (current LTS)
- **Test Framework**: Node.js built-in test runner (`node:test`)
- **Linting**: ESLint with TypeScript support
- **Code Style**: Prettier

### Node.js Version Policy

This project requires **Node.js 20 or later**. When considering updates:

- ✅ We can update to newer LTS versions
- ✅ We prefer current or active LTS versions
- ❌ Don't support EOL versions of Node.js
- ℹ️ Node 10-18 are all EOL as of 2024-2026

### Testing Philosophy

- Use Node.js built-in test runner (no external framework needed)
- All tests must pass before committing
- Tests are in `test/` directory with `*.test.ts` extension
- Use `tsx` for TypeScript support in tests

### Security & Maintenance

- **Zero vulnerabilities policy**: `npm audit` must report 0 vulnerabilities
- **No deprecation warnings**: `npm ci` should run without deprecation warnings
- **Proactive updates**: Don't wait for vulnerabilities to update dependencies
- Review dependencies regularly for maintenance status

## Examples from Project History

### ✅ Good: Migrating from unmaintained dependencies

When `tap-spec` became unmaintained with security issues, we:
1. First tried `tap-mocha-reporter` (better maintained)
2. Then realized Node 10 requirement was the real constraint
3. Updated to Node 20+ requirement
4. Migrated to Node.js built-in test runner
5. Result: Zero test dependencies, no security issues

### ✅ Good: Removing deprecated @types packages

When `@types/supports-color` was deprecated:
1. Verified the main package has built-in types
2. Removed the @types package
3. Tested that everything still works

### ❌ Bad: Using overrides without attempting alternatives

Don't do this:
```json
// BAD - Quick fix without investigation
"overrides": {
  "old-package": "^1.0.0"
}
```

Instead, investigate why you need it and find a proper solution.

## Decision-Making Framework

When faced with a dependency issue:

1. **Analyze**: Why is this dependency causing problems?
2. **Research**: Are there maintained alternatives?
3. **Consider**: Can we update requirements to enable better solutions?
4. **Implement**: Choose the most maintainable long-term solution
5. **Document**: Explain the rationale in commit messages

## Questions?

If you're unsure whether an approach follows these guidelines, ask:
- "Is this a workaround or a real fix?"
- "Will this create technical debt?"
- "Would a human maintainer approve this in code review?"

When in doubt, choose the solution that:
- ✅ Is more maintainable long-term
- ✅ Follows modern best practices
- ✅ Reduces complexity
- ✅ Uses actively maintained dependencies

---

*This document reflects the project's commitment to quality, maintainability, and best practices. When in doubt, favor solutions that reduce technical debt and use modern, supported technologies.*
