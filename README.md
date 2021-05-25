# DCRGraphWebsite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Node modules requires
## Material
Install script: `ng add @angular/material`

Website:  https://material.angular.io/

## GoJS
Install script: `npm install gojs-angular gojs`

Website:  https://gojs.net/latest/intro/angular.html
Samples: https://gojs.net/latest/samples/index.html

# Task based workflow

We manages our work by the issues, where we create issues that focuses on a given feature.
After an issue is created, we make a branch regarding to the given issue, which contains 
changes that was described by the issue.

## Final steps after a feature is done:
- Test the application is working as it needs to.
- Pull all the changes happened on ORIGIN.
- Merge the changes into the branch with the new feature.
- Create a Pull Request that merges the new feature into the development branch

## Master & Development branches

The group is working on the development branch where the newest code is.
On the other hand, the Master branch will give place for the release LTS versions of our product
with a stable, working and tested DCR-Graph web-application.

# Branch rules

## Development and Master branch lock

### Require pull request reviews before merging

When enabled, all commits must be made to a non-protected branch and submitted via a pull request with the required number of approving reviews and no changes requested before it can be merged into a branch that matches this rule.

### Include administrators

Enforce all configured restrictions above for administrators.
