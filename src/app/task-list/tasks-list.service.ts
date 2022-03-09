import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TasksListService {

  constructor() { }

  tasks(): Observable<any> {
    return of({body: [
        {
          id: 1,
          title: 'Create a Component',
          status: 'DONE'
        },
        {
          id: 2,
          title: 'Create a Service',
          status: 'DONE'
        },
        {
          id: 3,
          title: 'Create pull request',
          status: 'DONE'
        }
      ]
    });
  }

  done(id: any): Observable<null>{
    return of(null)
  }
}
