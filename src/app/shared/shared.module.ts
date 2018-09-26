import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { LinkerService } from '../services/linker.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ],
  declarations: [],
  providers: [
    LinkerService
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ]
})
export class SharedModule { }
