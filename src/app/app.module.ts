import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { MainModule } from './views/main/main.module';
import { BaseComponentsModule } from './base-components/base-components.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MainModule,
    HttpClientModule,
    BaseComponentsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    CurrencyMaskModule,
    MatIconModule
  ],
  providers: [
    HttpClient,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
