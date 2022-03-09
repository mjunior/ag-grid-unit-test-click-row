import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowEvent } from 'ag-grid-community';
import { TasksListService } from './tasks-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'title',
      headerName: 'Title',
      sort: 'asc',
    },
    {
      field: 'status',
      headerName: 'Associações'
    }
  ];

  constructor(private taskService: TasksListService) { }

  ngOnInit() { }

  onGridReady(): void {
    this.taskService.tasks().subscribe((res) => {
      this.addToTable(res.body);
    })
  }

  getRowNodeId(data): number {
    return data.id;
  }
  
  private addToTable(rows: any[]): void {
    this.agGrid.api.applyTransaction({
      add: rows
    });
  }

  markAsDone(event: RowEvent) {
    console.log('calling api')
    this.taskService.done(event.data.id).subscribe(() => {
      console.log('its ok');
      // apply transaction update on ag-grid with api response.
    });
  }
}
