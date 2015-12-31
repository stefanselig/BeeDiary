# Diploma Thesis
## by Stefan Selig & Valentin Hengstschläger

**Note: Everything here is parted into server and client, because each part is graded individually.** 

## Installation & Deployment:

### For Client:

```shell
> git clone https://github.com/stefanselig/BeefinderDiplomaThesis.git>
> cd beekeeper-client
> npm install
```
### For Server:

```shell
> git clone https://github.com/stefanselig/BeefinderDiplomaThesis.git>
> cd beekeeper-server
> npm install
```


## Issues/Problems and new Insights:

### 16.12.15 - Client

Angular version 2 beta 1 was released today. Updated files to meet setup recommendation of Angular 2 team.
There are some errors when compiling the typescript files. The typescript transpiler somehow can't find the Angular modules.

```shell
> tsc -p app -w

app/boot.ts(2,25): error TS2307: Cannot find module 'angular2/platform/browser'.
app/boot.ts(3,32): error TS2307: Cannot find module 'angular2/router'.
app/login/login.component.ts(1,25): error TS2307: Cannot find module 'angular2/core'.
app/main/app.component.ts(1,25): error TS2307: Cannot find module 'angular2/core'.
app/main/app.component.ts(2,46): error TS2307: Cannot find module 'angular2/router'.
app/signup/signup.component.ts(1,25): error TS2307: Cannot find module 'angular2/core'.
```

But even with the errors, the program works fine. So the typescript transpile can't find those files even though they are existent.

### 20.12.15 - Server
Points issue - still to add

### 27.12.15 - Server
DocumentDB issue - still to add

## 31.12.15 - Client

Angular 2 can't handle input type="date" yet. Model date value is not displayed in the view.

## Other Documentation:

### Skripts: 

#### Client: 

```shell
> npm run tsc
```

will execute the typescript compiler:

```shell
> tsc -p app -w
```

This command compiles the \*.ts files and creates matching \*.js and \*.map.js files.
It will do that in the app folder, because there are our script files located.
The -w parameter specifies that the compiler is constantly watching our typescript files and transpiles them as soon as they are changed.

```shell
> npm run start
```

will execute a server that serves our static files:

```shell
> lite-server --verbose
```

The --verbose parameter specifies that additional information is logged when executing.
Again this tool live-reloads when changes in code are detected.

```shell
> npm run start
```

will execute a server that serves our static files:

```shell
> live-server
```

Again this tool live-reloads when changes in code are detected.
The reason why we have scripts for two servers included in our project is that the Angular 2 team formerly 
recommended live-server, but since beta 1 they recommend lite-server. We have not yet decided which one to use.

#### Server:

### Background about the used technologies:

#### Client

** TODO: Add used technologies and description. **

typescript (incl. ts-config), angular2, systemjs, es6-promise, es6-shim, reflect-metadata, rxjs, zone.js, live-server, lite-server, gulp, angular2-router, angular2-polyfills

#### Server
