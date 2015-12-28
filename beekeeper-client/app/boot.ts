import {AppComponent} from './main/app.component';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

class RouterComponent {}

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_BINDINGS
]);