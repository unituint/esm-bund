# esm-bund

Minimal ES module bundler with recursive import inlining and Babel transpilation.  
No plugins. Just Node.js, regex, and Babel.

---

## Getting Started

```bash
npm install
node build.mjs

# Output is written to ./dist/bundle.js
# It recursively inlines all imports
# and transpiles the final bundle via Babel
