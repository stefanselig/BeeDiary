/// <reference path="../../typings/tsd.d.ts" />
import {bootstrap} from 'angular2/platform/browser';

import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

import {AppComponent} from '../components/main/app.component';

/** Loads application as well as Services for Routing and Webrequests */
bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_BINDINGS
]);