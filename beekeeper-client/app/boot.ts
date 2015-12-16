import {AppComponent} from './main/app.component';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

class RouterComponent {}

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
]);