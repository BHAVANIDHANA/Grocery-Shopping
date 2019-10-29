import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule
      ],
    exports:[
        MatDialogModule,
        MatButtonModule 
      ]
})
export class AngularMaterialModule{}