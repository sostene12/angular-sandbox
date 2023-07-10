import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { Employee, EmployeeService } from './services/employee.service';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'email',
    'dob', 'gender', 'education',
    'company', 'experience', 'package', 'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  employees: Employee[] = []

  constructor(private _dialog: MatDialog, private _empService: EmployeeService,private _coreService:CoreService) { }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.employeeList()
        }
      },
    })
  }

  ngOnInit(): void {
    this.employeeList()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  employeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => console.log(error)
    })
  }

  delete(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('employee deleted!','done')
        this.employeeList();
      },
      error: error => console.log(error)
    })
  }

  openEditForm(data: Employee) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.employeeList();
        }
      }
    })
  }
}
