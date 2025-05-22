import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demand, DemandService } from '../demand.service';

@Component({
  selector: 'app-demand-form',
  templateUrl: './demand-form.component.html',
  styleUrls: ['./demand-form.component.css']
})
export class DemandFormComponent implements OnInit {

  @Input() mode: 'add' | 'edit' = 'add';
  @Output() formSubmit = new EventEmitter<Demand>();
  @Input() demand: Demand | null = null;

  demandForm: FormGroup;

  // Dropdown option holders
  taSpocOptions: { name: string; email: string }[] = [];
  evaluationSpocOptions: { name: string; email: string }[] = [];
  competencyHeadOptions: { name: string; email: string }[] = [];
  clientEvaluationSpocOptions: { name: string; email: string }[] = [];
  clientCalibrationSpocOptions: { name: string; email: string }[] = [];
  clientHiringManagerOptions: { name: string; email: string }[] = [];

  constructor(private fb: FormBuilder, private demandService: DemandService) {
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
      demandEndDate: [null],
      eyGdsTaSpoc: [this.demand?.eyGdsTaSpoc || ''],
      eyGdsEvaluationSpoc: [this.demand?.eyGdsEvaluationSpoc || ''],
      eyGdsCompetencyHead: [this.demand?.eyGdsCompetencyHead || ''],
      clientEvaluationSpoc: [this.demand?.clientEvaluationSpoc || ''],
      clientCalibrationSpoc: [this.demand?.clientCalibrationSpoc || ''],
      clientHiringManagerName: [this.demand?.clientHiringManagerName || ''],
      clientHiringManagerEmail: [this.demand?.clientHiringManagerEmail || ''],
    });
  
  }

  ngOnInit() {
    this.initForm();
    this.loadDropdowns();
  }

  initForm() {
    console.log(this.demand);
  }


  loadDropdowns() {
    this.demandService.getEyTaSpocOptions().subscribe(data => this.taSpocOptions = data);
    this.demandService.getEyEvaluationSpocOptions().subscribe(data => this.evaluationSpocOptions = data);
    this.demandService.getEyCompetencyHeads().subscribe(data => this.competencyHeadOptions = data);
    this.demandService.getClientEvaluationSpocOptions().subscribe(data => this.clientEvaluationSpocOptions = data);
    this.demandService.getClientCalibrationSpocOptions().subscribe(data => this.clientCalibrationSpocOptions = data);
    this.demandService.getClientHiringManagers().subscribe(data => this.clientHiringManagerOptions = data);
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
