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
    var core_1, router_1, diaryentry_service_1;
    var CreateDiaryEntryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (diaryentry_service_1_1) {
                diaryentry_service_1 = diaryentry_service_1_1;
            }],
        execute: function() {
            CreateDiaryEntryComponent = (function () {
                function CreateDiaryEntryComponent(diaryEntryService, router) {
                    this.diaryEntryService = diaryEntryService;
                    this.router = router;
                }
                CreateDiaryEntryComponent.prototype.createNewDiaryEntry = function (createDiaryEntryForm) {
                    //this.diaryEntryService.createDiaryEntry(this.newDiaryEntry);
                    console.log(createDiaryEntryForm.value);
                    this.router.navigate(['DiaryEntry']);
                };
                CreateDiaryEntryComponent.prototype.cancel = function () {
                    this.router.navigate(['DiaryEntry']);
                };
                CreateDiaryEntryComponent = __decorate([
                    core_1.Component({
                        selector: 'CreateDiaryEntry',
                        templateUrl: 'app/diaryentry/Templates/createDiaryEntry.template.html',
                        providers: [diaryentry_service_1.DiaryEntryService]
                    }), 
                    __metadata('design:paramtypes', [diaryentry_service_1.DiaryEntryService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
                ], CreateDiaryEntryComponent);
                return CreateDiaryEntryComponent;
                var _a;
            })();
            exports_1("CreateDiaryEntryComponent", CreateDiaryEntryComponent);
        }
    }
});
//# sourceMappingURL=createDiaryEntry.component.js.map