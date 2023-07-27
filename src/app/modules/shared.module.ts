
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
        BsDropdownModule.forRoot(),
        NgxSpinnerModule,
        PaginationModule.forRoot()

    ],
    exports:[
        ToastrModule,
        BsDropdownModule,
        NgxSpinnerModule,
        PaginationModule
    ]
})

export class SharedModule { }