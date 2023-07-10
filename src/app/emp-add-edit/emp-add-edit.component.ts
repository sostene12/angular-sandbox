import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../services/employee.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm:FormGroup
  education: string[] = ['Matric', 'Diploma', 'Intermediate', 'Graduate', 'Post Graduate'];
  constructor(private _fb:FormBuilder,
    private _empService:EmployeeService,
    private _coreService:CoreService,
    private _dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ){
    this.empForm = this._fb.group({
      firstName:'', lastName:'',
      email:'', dob:'',
      gender:'', education:'',
      company:'', experience:'', package:'' })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  closeModal(){
    this._dialogRef.close();
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next:(value:any) => {
            this._coreService.openSnackBar("Employee updated!!");
            this._dialogRef.close(true);
          },
          error: (error:any) => console.log(error)
        })
      } else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next:(val:any) => { 
            this._coreService.openSnackBar('Employee created!!')
            this._dialogRef.close(true);
           },
          error:(error:any) => console.log(error)
        });
      }
    }
  }

 
}
