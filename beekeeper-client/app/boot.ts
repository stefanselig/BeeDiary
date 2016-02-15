import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';

import {AppComponent} from './main/app.component';

import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

class RouterComponent {}

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_BINDINGS
]);