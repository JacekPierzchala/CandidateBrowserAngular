
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
       // BsDropdownModule.forRoot()

    ],
    exports:[
        ToastrModule,
        //BsDropdownModule
    ]
})

export class SharedModule { }