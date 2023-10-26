import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo} from '../todo';
import { TodoService } from '../todo.service';
import { newTodo } from '../todo.forBE';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})


export class TodoDetailComponent implements OnInit{


  //public isdone = false;

  constructor(private router:Router, private todoservice: TodoService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.getDescription();
    this.getType();
    this.getAmount();
    this.getTime();
  }


  public content : string='';
  public typeis :  string='';
  public amountis : number = 0;
  public datais : Date= new Date();
  
  getDescription() {
    const getid = this.route.snapshot.paramMap.get('id');
      this.todoservice.getItemsById(getid).subscribe((item)=>{
      this.content = item.description;
      
    });
   
  }

  getType() {
    const getid = this.route.snapshot.paramMap.get('id');
      this.todoservice.getItemsById(getid).subscribe((item)=>{
      this.typeis = item.type;
      
    });
   
  }
  getAmount() {
    const getid = this.route.snapshot.paramMap.get('id');
      this.todoservice.getItemsById(getid).subscribe((item)=>{
      this.amountis = item.amount;
      
    });
   
  }
  getTime() {
    const getid = this.route.snapshot.paramMap.get('id');
      this.todoservice.getItemsById(getid).subscribe((item)=>{
      this.datais = item.createdTime;
      
    });
   
  }






  /*
  saveToUpsert() {      // Upsert item
      let upsertId = this.route.snapshot.paramMap.get('id');
      //console.log(upsertId);
      
      if (upsertId != null) {
          const upsertItem: Todo = {
            id: upsertId,
            description: this.content,
            createdTime: new Date(), // .....
            //type: this.isdone,
            amount: this.amount,

         }   
        //console.log(upsertItem);

        this.todoservice.upsertItem(upsertId, upsertItem).subscribe();
      }

      this.content = '';
      //this.isdone = false;
  }*/




  deletebutton() {
    let deleteId = this.route.snapshot.paramMap.get('id');
    if (deleteId != null){
      this.todoservice.deleteItem(deleteId).subscribe();
    }
    this.content = '';
   
  }
 

}
