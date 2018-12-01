import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatSnackBarModule],
  exports: [MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatSnackBarModule]
})
export class MaterialAppModule { }
