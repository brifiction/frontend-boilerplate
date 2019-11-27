# Gulp + SASS Front-End Boilerplate 

[![CircleCI](https://circleci.com/gh/brifiction/frontend-boilerplate/tree/master.svg?style=svg)](https://circleci.com/gh/brifiction/frontend-boilerplate/tree/master)
[![CircleCI](https://circleci.com/gh/brifiction/frontend-boilerplate/tree/develop.svg?style=svg)](https://circleci.com/gh/brifiction/frontend-boilerplate/tree/develop)

A boilerplate for building web projects with [Gulp](https://gulpjs.com/).

## Getting Started

### Dependencies

*__Note:__ If you've previously installed Gulp globally, run `npm rm --global gulp` to remove it.*

Pre-requisites:
- [Node.js](http://nodejs.org)
- [Gulp Command Line Utility](http://gulpjs.com) `npm install --global gulp-cli`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files and dependencies.
3. When it's done installing, run one of the task runners to get going:
	- `gulp` manually compiles files.
	- `gulp css` automatically compiles files and applies changes, when you make changes to your source files.

**Try it out.** After installing, run `gulp` to compile some test files into the `build` directory. Or, run `gulp` and make some changes to see them recompile automatically with the help of ``browser-sync``.

## Documentation

Add your source files to the appropriate `src` subdirectories. Gulp will process and and compile them into `dist`.

- Files in the `src/sass` directory will be compiled to `dist/css`.
- Files in the `src/images` directory will be compiled to `dist/images`, and compressed to smaller file size.

### Sass

Put your [Sass](https://sass-lang.com/) files in the `src/sass` directory.

Gulp generates minified and unminified CSS files. It also includes [autoprefixer](https://github.com/postcss/autoprefixer), which adds vendor prefixes for you.

## Scalable and Modular Architecture (SMACSS)

SMACSS methodology is ideal, for your design development and processes. This is to maintain best practices for design development with SASS.

For more information, [click here](http://smacss.com/).

```
.
+-- build
|   +-- css
|   |   +-- ...
|   +-- images
|   |   +-- ...
|   +-- vendor
|   |   +-- ...
+-- src
|   +-- images
|   +-- scss
|   |   +-- base
|   |   |   +-- _globals.scss
|   |   |   +-- _mixins.scss
|   |   |   +-- _variables.scss
|   |   +-- layouts
|   |   |   +-- _footer.scss
|   |   |   +-- _header.scss
|   |   +-- modules
|   |   |   +-- _cta.scss
|   |   |   +-- _testimonials.scss
|   |   |   +-- ...
|   |   +-- states
|   |   |   +-- ...
|   |   +-- themes
|   |   |   +-- _theme.scss
|   |   |   +-- _typography.scss
|   +-- main.scss
+-- .gitignore
+-- gulpfile.js
+-- index.html
+-- LICENSE.md
+-- package-lock.json
+-- package.json
+-- LICENSE.md
+-- README.md
+-- renovate.json
```

## Project Roadmap

1. Include JS files, as a part of task build process - [BEM methodology](https://en.bem.info/methodology/js/).
1. Reconfigure the build for importing vendor files, font-awesome and simple-line-icons. However, optional to keep hence please discard them if not required to use.
1. Add plugins for further productivity efficiency, such as lint, testing and similar. 