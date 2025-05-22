import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Demand {
  id: number;
  clientName: string;
  departmentName: string;
  projectName: string;
  role: string;
  yoe: number;
  agingPeriod: number;
  skillset: string;
  jobDescription: string;
  demandCreationDate: Date;
  demandEndDate: Date;
  isDemandActive: string;
  isDemandExpired: string;
  eyGdsTaSpoc: string;
  eyGdsEvaluationSpoc: string;
  eyGdsCompetencyHead: string;
  clientEvaluationSpoc: string;
  clientCalibrationSpoc: string;
  clientHiringManagerName: string;
  clientHiringManagerEmail: string;
  location: string;
  priority: string;
  recruiterName: string;
  recruiterEmail: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class DemandService {
  private demandSubject = new BehaviorSubject<Demand[]>([
    {
      id: 1,
      clientName: 'Client A',
      departmentName: 'Development',
      projectName: 'Project X',
      role: 'Frontend Developer',
      yoe: 3,
      agingPeriod: 90,
      skillset: 'Angular, JavaScript',
      jobDescription: 'Developing frontend components',
      demandCreationDate: new Date('2024-12-01'),
      demandEndDate: new Date('2025-01-30'),
      isDemandActive: 'Y',
      isDemandExpired: 'N',
      eyGdsTaSpoc: '',
      eyGdsEvaluationSpoc: '',
      eyGdsCompetencyHead: '',
      clientEvaluationSpoc: '',
      clientCalibrationSpoc: '',
      clientHiringManagerName: '',
      clientHiringManagerEmail: '',
      location: 'New York',
      priority: 'High',
      recruiterName: '',
      recruiterEmail: '',
      status: 'Open',
    },
    {
      id: 2,
      clientName: 'Client B',
      departmentName: 'Analytics',
      projectName: 'Project Y',
      role: 'Data Engineer',
      yoe: 5,
      agingPeriod: 60,
      skillset: 'Python, SQL',
      jobDescription: 'Build data pipelines',
      demandCreationDate: new Date('2024-12-10'),
      demandEndDate: new Date('2025-02-15'),
      isDemandActive: 'Y',
      isDemandExpired: 'N',
      eyGdsTaSpoc: '',
      eyGdsEvaluationSpoc: '',
      eyGdsCompetencyHead: '',
      clientEvaluationSpoc: '',
      clientCalibrationSpoc: '',
      clientHiringManagerName: '',
      clientHiringManagerEmail: '',
      location: 'Chicago',
      priority: 'Medium',
      recruiterName: '',
      recruiterEmail: '',
      status: 'Open',
    }
  ]);

  demands$ = this.demandSubject.asObservable();


  // Edit Component
  private selectedDemandSubject = new BehaviorSubject<Demand | null>(null);
  selectedDemand$ = this.selectedDemandSubject.asObservable();

  setSelectedDemand(demand: Demand | null) {
    this.selectedDemandSubject.next(demand);
  }

  getSelectedDemand(): Demand | null {
    return this.selectedDemandSubject.value;
  }

  getAllDemands(): Observable<Demand[]> {
    return of(this.demandSubject.value);
  }

  createDemand(newDemand: Demand): void {
    const updatedDemand: Demand = {
      ...newDemand,
      id: this.demandSubject.value.length + 1,
    };
    const updatedList = [...this.demandSubject.value, updatedDemand];
    this.demandSubject.next(updatedList);
    console.log('Created Demand:', updatedDemand);
  }

  createBulkDemands(template: Demand, count: number): void {
    const currentDemands = this.demandSubject.value;
    const nextId = currentDemands.length > 0 ? Math.max(...currentDemands.map(d => d.id)) + 1 : 1;

    const newDemands: Demand[] = Array.from({ length: count }, (_, i) => ({
      ...template,
      id: nextId + i,
    }));

    const updatedList = [...currentDemands, ...newDemands];
    this.demandSubject.next(updatedList);
    console.log(`Created ${count} bulk demands.`);
  }
  
  updateDemand(updatedDemand: Demand) {
    const updated = this.demandSubject.value.map(d => d.id === updatedDemand.id ? updatedDemand : d);
    this.demandSubject.next(updated);
  }

  deleteDemand(id: number) {
    const updated = this.demandSubject.value.filter(d => d.id !== id);
    this.demandSubject.next(updated);
  }

  getDemandById(id: number): Demand | undefined {
    return this.demandSubject.value.find(d => d.id === id);
  }

  getEyTaSpocOptions(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'EyTaSpocA', email: 'eytaspoc.a@example.com' },
      { name: 'EyTaSpocB', email: 'eytaspoc.b@example.com' },
      { name: 'EyTaSpocC', email: 'eytaspoc.c@example.com' },
    ]);
  }

  getEyCompetencyHeads(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'CompetencyA', email: 'eycompetency.a@example.com' },
      { name: 'CompetencyB', email: 'eycompetency.b@example.com' },
      { name: 'CompetencyC', email: 'eycompetency.c@example.com' },
    ]);
  }

  getEyEvaluationSpocOptions(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'EvaluationSpocA', email: 'eyevaluationspoc.a@example.com' },
      { name: 'EvaluationSpocB', email: 'eyevaluationspoc.b@example.com' },
    ]);
  }

  getClientHiringManagers(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'ClientHiringManager A', email: 'clienthiringmanager.a@example.com' },
      { name: 'ClientHiringManager B', email: 'clienthiringmanager.b@example.com' },
    ]);
  }

  getClientEvaluationSpocOptions(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'ClientEvaluationSpocA', email: 'clientevaluationspoc.a@example.com' },
      { name: 'ClientEvaluationSpocB', email: 'clientevaluationspoc.b@example.com' },
    ]);
  }
  
  getClientCalibrationSpocOptions(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'ClientCalibrationSpocA', email: 'clientcalibrationspoc.a@example.com' },
      { name: 'ClientCalibrationSpocB', email: 'clientcalibrationspoc.b@example.com' },
    ]);
  }

}
