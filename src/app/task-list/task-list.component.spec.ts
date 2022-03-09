/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaskListComponent } from './task-list.component';
import { TasksListService } from './tasks-list.service';
import { of } from 'rxjs';
import { AgGridModule } from 'ag-grid-angular';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TasksListService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksListService
      ],
      declarations: [ TaskListComponent ],
      imports: [AgGridModule]
    });

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TasksListService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When all tasks are done', () => {
    let spyGetTasks;
    let spyDoneTasks;

    beforeEach(() => {
      const MOCK_SUCCESS = {
        body: [
          { id: 1, title: 'Task mock 1', status: 'DONE' },
          { id: 2, title: 'Task mock 1', status: 'DONE' },
        ]
      }
      spyGetTasks = spyOn(taskService, 'tasks').and.returnValue(of(MOCK_SUCCESS));
      spyDoneTasks = spyOn(taskService, 'done').and.returnValue(of(null));


      fixture.detectChanges(); // for init
      component.onGridReady(); // for call "api"
      fixture.detectChanges(); // for reflect api data on table
    });

    it ('should render the title', () => {
      const title = fixture.debugElement.query(By.css('h1'));
      expect(title.nativeElement.textContent.trim()).toEqual('Tasks list')
    });

    describe('AND click at line', () => {
      it('it should call done service api', fakeAsync(() => {
        const firstColumn = fixture.debugElement.query(By.css('.ag-cell-value'));

        console.log('spec file: clicking');

        firstColumn.nativeElement.click();
        tick(100);
        flushMicrotasks();
        flush();
        fixture.detectChanges();

        console.log('spec file: expect to check if modal opens');
        expect(spyDoneTasks).toHaveBeenCalled();
      }));
    })
  })
});
