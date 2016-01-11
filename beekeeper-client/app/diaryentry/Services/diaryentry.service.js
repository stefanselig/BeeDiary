System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2;
    var DiaryEntryService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            DiaryEntryService = (function () {
                function DiaryEntryService(http) {
                    this.http = http;
                    //this.getDiaryEntries();
                }
                DiaryEntryService.prototype.getDiaryEntries = function () {
                    this.diaryEntries = this.http
                        .get('http://localhost:8080/api/DiaryEntries/diaryEntries')
                        .map(function (response) { return response.json(); });
                };
                DiaryEntryService.prototype.getDiaryEntryById = function (id) {
                    // Somehow pass ID
                    return this.http
                        .get()
                        .map(function (response) { return response.json(); });
                };
                DiaryEntryService.prototype.updateDiaryEntry = function (diaryEntry) {
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    // Somehow pass ID
                    this.http
                        .post('http://localhost:8080/api/DiaryEntries/diaryEntries', JSON.stringify(diaryEntry), {
                        headers: headers
                    }).subscribe(function (res) { return window.alert(res.json()); });
                };
                DiaryEntryService.prototype.createDiaryEntry = function (diaryEntry) {
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http
                        .post('http://localhost:8080/api/DiaryEntries/diaryEntries', JSON.stringify(diaryEntry), {
                        headers: headers
                    }).subscribe(function (res) { return window.alert(res.json()); });
                };
                DiaryEntryService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
                ], DiaryEntryService);
                return DiaryEntryService;
                var _a;
            })();
            exports_1("DiaryEntryService", DiaryEntryService);
        }
    }
});
//# sourceMappingURL=diaryentry.service.js.map