import { Component, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import "rxjs/add/operator/map";
import { Headers } from "@angular/http";
import { GenerelleSpm } from "./GenerelleSpm";
import { KundeSpm } from "./KundeSpm";


@Component({
    selector: "min-app",
    templateUrl: "./app/Faq.html"
})

export class Faq {
    visForsideInfo: boolean;
    visGenerelleSpm: boolean;
    visKundeSpm: boolean;
    visSporsmalSkjema: boolean;
    alleGenerelleSpm: Array<GenerelleSpm>;
    alleKundeSpm: Array<KundeSpm>;
    sporsmalSkjema: FormGroup;
    henterData: boolean;

    
    constructor(private http: Http, private fb: FormBuilder) {
        this.sporsmalSkjema = fb.group({
            epost: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zæøåA-ZÆØÅ0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$")])],
            sporsmal: [null, Validators.compose([Validators.required, Validators.pattern("[a-zøæåA-ZØÆÅ.,!?0-9 \\-]{5,500}")])],
        });
    }

    ngOnInit() {
        this.visForsideInfo = true;
        this.visGenerelleSpm = false;
        this.visKundeSpm = false;
        this.visSporsmalSkjema = false;
        this.henterData = false; 
    }

    hentAlleGenerelleSpm() {
        this.http.get("api/Sporsmal/getGenerelleSpm").map(retrievedData => {
            let JsonData = retrievedData.json();
            return JsonData;
        }).subscribe(JsonData => {
            this.alleGenerelleSpm = [];

                if (JsonData) {
                    for (let SpmObjekt of JsonData) {
                        this.alleGenerelleSpm.push(SpmObjekt);
                        this.henterData = false;
                    }
            };
            console.log(this.alleGenerelleSpm);
            },
            error => alert("Feil i henting av data fra database."),
            () => console.log("Ferdig get-api/SporsmalController/getGenerelleSpm")
        );
    };


    hentAlleKundeSpm() {
        this.http.get("api/Sporsmal/getKundeSpm").map(retrievedData => {
            let JsonData = retrievedData.json();
            return JsonData;
        }).subscribe(JsonData => {
            this.alleKundeSpm = [];

            if (JsonData) {
                for (let SpmObjekt of JsonData) {
                    this.alleKundeSpm.push(SpmObjekt);
                    this.henterData = false;
                }
            };
            console.log(this.alleKundeSpm);
        },
            error => alert("Feil i henting av data fra database."),
            () => console.log("Ferdig get-api/SporsmalController/getKundeSpm")
            );
    };

    lagreKundeSpm() {
        var nyttSporsmal = new KundeSpm();

        nyttSporsmal.Epost = this.sporsmalSkjema.value.epost;
        nyttSporsmal.Sporsmal = this.sporsmalSkjema.value.sporsmal;

        var body: string = JSON.stringify(nyttSporsmal); //omgjør JavaScript til JSON string
        var header = new Headers({ "Content-Type": "application/json" });


        this.http.post("api/Sporsmal/KundeSpm", body, { headers: header }).map(retrievedData =>
            retrievedData.toString()).subscribe(retur => {
                this.hentAlleKundeSpm();
            },
                error => alert("Noe gikk feil i lagring av spørsmålet ditt."),
                () => console.log("ferdig post-api/SporsmalController/KundeSpm")
            );

    };

    regOnSubmit() {
        this.lagreKundeSpm();
        this.hentAlleGenerelleSpm();
        this.sporsmalSkjema.markAsPristine();

        this.sporsmalSkjema.setValue({
            epost: "",
            sporsmal: "",
        });

    };

    displayForside() {
        this.visForsideInfo = true;
        this.visKundeSpm = false;
        this.visSporsmalSkjema = false;
        this.visGenerelleSpm = false;
    };

    displayGenerelleSpm() {
        this.hentAlleGenerelleSpm(); //Henter ifra db ved trykk i menyen(Navbaren)
        this.visForsideInfo = false;
        this.visKundeSpm = false;
        this.visSporsmalSkjema = true;
        this.visGenerelleSpm = true;
        this.henterData = true;
    };

    displayKundeSpm() {
        this.hentAlleKundeSpm(); //Henter ifra db ved trykk i menyen(Navbaren)
        this.visForsideInfo = false;
        this.visKundeSpm = true;
        this.visSporsmalSkjema = false;
        this.visGenerelleSpm = false;
        this.henterData = true;
    };

}