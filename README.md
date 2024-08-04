# Experiment: Monorepo for ReScript standard libraries

See https://github.com/rescript-lang/rescript-compiler/issues/6826.

This repo contains an npm workspace with the ReScript 12 standard libraries:

- runtime: runtime modules (where the .cm\* files + JS output files need to be shipped with the compiler)
- primitives: primitives (where only the JS output files need to be shipped with the compiler)
- core: the ReScript Core standard library
- belt: Belt library (immutable collections etc.)
- js: legacy Js modules
