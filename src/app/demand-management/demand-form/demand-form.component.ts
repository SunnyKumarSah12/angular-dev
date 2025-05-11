import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demand } from '../demand.service';

@Component({
  selector: 'app-demand-form',
  templateUrl: './demand-form.component.html',
  styleUrls: ['./demand-form.component.css']
})
export class DemandFormComponent {
  
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() formSubmit = new EventEmitter<Demand>();
  @Input() demand: Demand = {} as Demand;

  demandForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.demandForm = this.fb.group({
      clientName: ['', Validators.required],
      departmentName: ['', Validators.required],
      projectName: [''],
      role: ['', Validators.required],
      yoe: [0, [Validators.required, Validators.min(0)]],
      skillset: ['', Validators.required],
      location: ['', Validators.required],
      priority: ['', Validators.required],
      jobDescription: ['', [Validators.required, Validators.minLength(10)]],
      demandCreationDate: [new Date()],
      demandEndDate: [null]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['demand'] && this.demand) {
      this.demandForm.patchValue(this.demand);
    }
  }

  onSubmit() {
    if (this.demandForm.valid) {
      const formValue: Demand = {
        ...this.demandForm.value,
        isDemandActive: 'Y',
        isDemandExpired: 'N',
        status: 'Open',
        demandCreationDate: this.demand?.demandCreationDate || new Date(),
        demandEndDate: this.demand?.demandEndDate || new Date(),
        id: this.demand?.id || 0
      };
      this.formSubmit.emit(formValue);
    } else {
      this.demandForm.markAllAsTouched(); // show validation errors
    }
  }
}
