import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatInputModule,
  MatCardModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatButtonToggleModule,
  MatGridListModule
} from "@angular/material";
import {StatusComponent} from "../components/status/status.component";

@NgModule({
  declarations: [StatusComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    StatusComponent
  ],
  providers: []
})
export class CoreModule {
}
