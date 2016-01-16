System.register(['angular2/core', 'angular2/router', '../services/diaryentry.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, router_2, diaryentry_service_1;
    var EditDiaryEntryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (diaryentry_service_1_1) {
                diaryentry_service_1 = diaryentry_service_1_1;
            }],
        execute: function() {
            EditDiaryEntryComponent = (function () {
                function EditDiaryEntryComponent(diaryEntryService, router, params) {
                    this.diaryEntryService = diaryEntryService;
                    this.router = router;
                    this.diaryentry = {};
                    this.typeEnum = [];
                    this.treatmentTypes = [];
                    this.feedingTypes = [];
                    this.loadSelectedDiaryEntryFromWebService(params.get('id'));
                    this.loadEnums();
                }
                EditDiaryEntryComponent.prototype.loadSelectedDiaryEntryFromWebService = function (id) {
                    var _this = this;
                    var instance = this;
                    var observableObject = this.diaryEntryService.getDiaryEntryById(id);
                    observableObject.subscribe(function (diaryEntry) {
                        instance.diaryentry = diaryEntry;
                        console.log(_this.diaryentry);
                    }, function (error) { return console.log("Error " + error); }, function () { return console.log("Loaded single diaryEntry"); });
                };
                EditDiaryEntryComponent.prototype.updateDiaryEntry = function () {
                    this.diaryEntryService.updateDiaryEntry(this.diaryentry, this.updateDiaryEntryCallback('DiaryEntry'));
                };
                EditDiaryEntryComponent.prototype.updateDiaryEntryCallback = function (viewName) {
                    var instance = this;
                    return function (viewname) { return instance.router.navigate([viewName]); };
                };
                EditDiaryEntryComponent.prototype.loadEnums = function () {
                    var instance = this;
                    var observableObject = [];
                    observableObject.push(this.diaryEntryService.getEnum('typeEnum'));
                    observableObject.push(this.diaryEntryService.getEnum('foodEnum'));
                    observableObject.push(this.diaryEntryService.getEnum('treatmentEnum'));
                    observableObject[0].subscribe(function (enumObj) {
                        instance.typeEnum = enumObj.slice();
                    }, function (error) { return console.log("Error " + error); }, function () { return console.log("Loaded enum"); });
                    observableObject[1].subscribe(function (enumObj) {
                        instance.feedingTypes = enumObj.slice();
                    }, function (error) { return console.log("Error " + error); }, function () { return console.log("Loaded enum"); });
                    observableObject[2].subscribe(function (enumObj) {
                        instance.treatmentTypes = enumObj.slice();
                    }, function (error) { return console.log("Error " + error); }, function () { return console.log("Loaded enum"); });
                };
                EditDiaryEntryComponent.prototype.navigateToOtherView = function (viewName) {
                    this.router.navigate([viewName]);
                };
                EditDiaryEntryComponent.prototype.cancel = function () {
                    this.navigateToOtherView('DiaryEntry');
                };
                EditDiaryEntryComponent = __decorate([
                    core_1.Component({
                        selector: 'EditDiaryEntry',
                        templateUrl: 'app/diaryentry/Templates/editDiaryEntry.template.html',
                        providers: [diaryentry_service_1.DiaryEntryService]
                    }), 
                    __metadata('design:paramtypes', [diaryentry_service_1.DiaryEntryService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_2.RouteParams !== 'undefined' && router_2.RouteParams) === 'function' && _b) || Object])
                ], EditDiaryEntryComponent);
                return EditDiaryEntryComponent;
                var _a, _b;
            })();
            exports_1("EditDiaryEntryComponent", EditDiaryEntryComponent);
        }
    }
});
//# sourceMappingURL=editDiaryEntry.component.js.map