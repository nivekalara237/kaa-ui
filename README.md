<img alt="/assets/logo.webp" height="128" src="./assets/logo.webp" width="auto"/>

## KaaUI - Angular Component Library with TailwindCSS

`KaaUI` is a modern, lightweight, and customizable component library for `Angular`, built with the power of `TailwindCSS`.
It provides ready-to-use, responsive, and elegant UI components to accelerate your development workflow.

### Features:

+ 🧩 `Reusable Components`: Modular and highly customizable Angular components.
+ 🎨 `TailwindCSS Powered`: Leverage the flexibility of TailwindCSS for styling.
+ ⚡ `Optimized for Performance`: Lightweight components designed for speed and responsiveness.
+ 📦 `Easy Integration`: Seamlessly integrates into your Angular projects.
+ 🚀 `Scalable`: Built to support both small and large-scale applications.

---- 
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name --project=ngx-fs-ui
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build ngx-fs-ui
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/ngx-fs-ui
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

### How to use it locally

This section is to show how to deploy the library locally without publish it on npmjs.org.
to do:

- build in developement mode by running the belong command line
   ```bash
   ng build --watch
   ```
- go to the bundles files directory and run this command
   ```bash
  cd dist/ngx-fs-ui
  npm link
   ```
- open the `package.json` of the application or project that needs to use library and in the devDepandencies section
   ```json
  {
    "devDepandencies": {
      "ngx-fs-ui": "0.0.1"
    }  
  }
  ```
- and then open the `angular.json` and add
  ```json
  {
  ...
  "projects": {
    "my-application": {
      ...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
           ...
           "preserveSymlinks": true,// <--- add this
  ```

And then

```bash
cd my-app # the app that using ngx-fs-ui
npm link ngx-fs-ui
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
