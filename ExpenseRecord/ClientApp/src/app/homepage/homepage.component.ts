import { Component, OnInit , Inject} from '@angular/core';
import { Router} from '@angular/router';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit{

  sub! : Subscription;

  
  todo: Todo;
  
  todolist: Todo[];
  showlist: Todo[];
  showlistTitle: string[];

  searchtitle: string;

  constructor(private router: Router, private todoservice: TodoService, private route: ActivatedRoute){
  
  }

 
  ngOnInit(): void {
    this.sub = this.todoservice.getAllTodos().subscribe({

      
       next: data => {
       this.todolist = data;
       this.showlist = this.todolist;
      }
    });

  }
 
  gotoitempage(){
    this.router.navigateByUrl('/create-item');
  }
 
  gotodetailpage(todo: Todo) {
    this.router.navigateByUrl('todo-detail/:To.id');
    }





  searchButton(){

    this.showlist = this.todolist.filter((item: Todo) =>
      item.description.toLocaleLowerCase().includes(this.searchtitle));

  }


  reloadButton(){
    location.reload();
  }


  sortdescription(){
  
    this.showlist = this.todolist.sort((a, b)=>{
        const contentA = a.description.toLocaleLowerCase();
        const contentB = b.description.toLocaleLowerCase();
        return contentA.localeCompare(contentB);
        });

  }


  sorttime(){
    this.showlist = this.todolist.sort((a, b)=>Date.parse(b.createdTime.toString()) - Date.parse(a.createdTime.toString()));
  }





}











