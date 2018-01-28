import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Faq } from './faq';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, JsonpModule],
    declarations: [Faq],
    bootstrap: [Faq]
})

export class AppModule { }