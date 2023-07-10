import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee{
  firstName:string,
  lastName:string,
  gender:string,
  company:string,
  package:string,
  dob:string,
  experience:string,
  education:string
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  addEmployee(data:any):Observable<Employee>{
    return this._http.post<Employee>('http://localhost:5000/employees',data)
  }

  updateEmployee(id:number , data:any):Observable<Employee>{
    return this._http.put<Employee>(`http://localhost:5000/employees/${id}`,data)
  }

  getEmployeeList():Observable<Employee[]>{
    return this._http.get<Employee[]>('http://localhost:5000/employees');
  }

  deleteEmployee(id:number):Observable<Employee>{
    return this._http.delete<Employee>(`http://localhost:5000/employees/${id}`)
  }
}
