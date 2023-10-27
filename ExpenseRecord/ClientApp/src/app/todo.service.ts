



import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { newTodo } from './todo.forBE';
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from 'rxjs';






@Injectable({
    providedIn:'root',
})



export class TodoService {

    private Url = 'https://localhost:7081/api/v1/ToDoItems';

    // private Url = this.baseUrl + '/api/v1/ToDoItems';



    constructor(private http: HttpClient) {}

    
    getAllTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.Url)
            //.pipe(
            //tap(data => console.log('All: ', JSON.stringify(data))))
    };

            
    
    addItems(newItem: newTodo): Observable<Todo[]>{
        return this.http.post<Todo[]>(this.Url, newItem)
    }

    
    upsertItem(id: string, item: newTodo): Observable<newTodo[]>{
        const thisUrl = `${this.Url}/${id}`;
        //console.log(thisUrl);

        return this.http.put<newTodo[]>(thisUrl, item)
    }


    getItemsById(id: string|null): Observable<Todo> {

        const getoneUrl = `${this.Url}/${id}`;
        // console.log(getoneUrl);
        return this.http.get<Todo>(getoneUrl)
         // .pipe(
          //  tap(data => console.log('All: ', JSON.stringify(data)))
          //)
        };


    // 删除by id
    deleteItem(id: string): Observable<any>{

        const deleteUrl = `${this.Url}/${id}`;
        // console.log(deleteUrl);
        return this.http.delete(deleteUrl)
            .pipe(catchError((error)=>{
            console.error('failed', error);

            return throwError('fail to delete');
        }));
  }

 
    
    
    
   

    

}