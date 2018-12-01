import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatSnackBarModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule],
  exports: [MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatSnackBarModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule]
})
export class MaterialAppModule { }
