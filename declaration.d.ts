/**
 * Custom Type Declarations
 *
 * This file is used to provide TypeScript with type information for
 * JavaScript modules that don't have their own type definitions (`.d.ts` files).
 *
 * Why is this needed?
 * Without a declaration, TypeScript doesn't know the "shape" of an imported
 * JavaScript module and implicitly gives it the `any` type, which can lead to
 * bugs. By explicitly declaring the module, we acknowledge that it exists
 * and silence the `ts(7016)` error.
 */

// Declares the bundled n8n demo component as a module.
// This allows us to import it in TypeScript files without getting a type error.
declare module "@n8n_io/n8n-demo-component/n8n-demo.bundled.js";
