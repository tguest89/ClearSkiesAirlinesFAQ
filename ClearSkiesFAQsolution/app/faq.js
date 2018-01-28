"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/map");
var http_2 = require("@angular/http");
var KundeSpm_1 = require("./KundeSpm");
var Faq = (function () {
    function Faq(http, fb) {
        this.http = http;
        this.fb = fb;
        this.sporsmalSkjema = fb.group({
            epost: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("^[a-zæøåA-ZÆØÅ0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$")])],
            sporsmal: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[a-zøæåA-ZØÆÅ.,!?0-9 \\-]{5,500}")])],
        });
    }
    Faq.prototype.ngOnInit = function () {
        this.visForsideInfo = true;
        this.visGenerelleSpm = false;
        this.visKundeSpm = false;
        this.visSporsmalSkjema = false;
        this.henterData = false;
    };
    Faq.prototype.hentAlleGenerelleSpm = function () {
        var _this = this;
        this.http.get("api/Sporsmal/getGenerelleSpm").map(function (retrievedData) {
            var JsonData = retrievedData.json();
            return JsonData;
        }).subscribe(function (JsonData) {
            _this.alleGenerelleSpm = [];
            if (JsonData) {
                for (var _i = 0, JsonData_1 = JsonData; _i < JsonData_1.length; _i++) {
                    var SpmObjekt = JsonData_1[_i];
                    _this.alleGenerelleSpm.push(SpmObjekt);
                    _this.henterData = false;
                }
            }
            ;
            console.log(_this.alleGenerelleSpm);
        }, function (error) { return alert("Feil i henting av data fra database."); }, function () { return console.log("Ferdig get-api/SporsmalController/getGenerelleSpm"); });
    };
    ;
    Faq.prototype.hentAlleKundeSpm = function () {
        var _this = this;
        this.http.get("api/Sporsmal/getKundeSpm").map(function (retrievedData) {
            var JsonData = retrievedData.json();
            return JsonData;
        }).subscribe(function (JsonData) {
            _this.alleKundeSpm = [];
            if (JsonData) {
                for (var _i = 0, JsonData_2 = JsonData; _i < JsonData_2.length; _i++) {
                    var SpmObjekt = JsonData_2[_i];
                    _this.alleKundeSpm.push(SpmObjekt);
                    _this.henterData = false;
                }
            }
            ;
            console.log(_this.alleKundeSpm);
        }, function (error) { return alert("Feil i henting av data fra database."); }, function () { return console.log("Ferdig get-api/SporsmalController/getKundeSpm"); });
    };
    ;
    Faq.prototype.lagreKundeSpm = function () {
        var _this = this;
        var nyttSporsmal = new KundeSpm_1.KundeSpm();
        nyttSporsmal.Epost = this.sporsmalSkjema.value.epost;
        nyttSporsmal.Sporsmal = this.sporsmalSkjema.value.sporsmal;
        var body = JSON.stringify(nyttSporsmal); //omgjør JavaScript til JSON string
        var header = new http_2.Headers({ "Content-Type": "application/json" });
        this.http.post("api/Sporsmal/KundeSpm", body, { headers: header }).map(function (retrievedData) {
            return retrievedData.toString();
        }).subscribe(function (retur) {
            _this.hentAlleKundeSpm();
        }, function (error) { return alert("Noe gikk feil i lagring av spørsmålet ditt."); }, function () { return console.log("ferdig post-api/SporsmalController/KundeSpm"); });
    };
    ;
    Faq.prototype.regOnSubmit = function () {
        this.lagreKundeSpm();
        this.hentAlleGenerelleSpm();
        this.sporsmalSkjema.markAsPristine();
        this.sporsmalSkjema.setValue({
            epost: "",
            sporsmal: "",
        });
    };
    ;
    Faq.prototype.displayForside = function () {
        this.visForsideInfo = true;
        this.visKundeSpm = false;
        this.visSporsmalSkjema = false;
        this.visGenerelleSpm = false;
    };
    ;
    Faq.prototype.displayGenerelleSpm = function () {
        this.hentAlleGenerelleSpm(); //Henter ifra db ved trykk i menyen(Navbaren)
        this.visForsideInfo = false;
        this.visKundeSpm = false;
        this.visSporsmalSkjema = true;
        this.visGenerelleSpm = true;
        this.henterData = true;
    };
    ;
    Faq.prototype.displayKundeSpm = function () {
        this.hentAlleKundeSpm(); //Henter ifra db ved trykk i menyen(Navbaren)
        this.visForsideInfo = false;
        this.visKundeSpm = true;
        this.visSporsmalSkjema = false;
        this.visGenerelleSpm = false;
        this.henterData = true;
    };
    ;
    return Faq;
}());
Faq = __decorate([
    core_1.Component({
        selector: "min-app",
        templateUrl: "./app/Faq.html"
    }),
    __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder])
], Faq);
exports.Faq = Faq;
//# sourceMappingURL=faq.js.map