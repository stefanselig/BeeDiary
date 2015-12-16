System.register(['./main/app.component', 'angular2/platform/browser', 'angular2/router'], function(exports_1) {
    var app_component_1, browser_1, router_1;
    var RouterComponent;
    return {
        setters:[
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            RouterComponent = (function () {
                function RouterComponent() {
                }
                return RouterComponent;
            })();
            browser_1.bootstrap(app_component_1.AppComponent, [
                router_1.ROUTER_PROVIDERS,
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map