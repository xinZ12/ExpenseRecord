import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo} from '../todo';
import { TodoService } from '../todo.service';
import { newTodo } from '../todo.forBE';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})


export class ItemsComponent {



  private _content = '';
  get content(): string {
    return this._content;
  }
  set content(value: string) {
    this._content = value;
  }

  private _type = '';
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }

  private _amount = '';
  get amount(): string {
    return this._amount;
  }
  set amount(value: string) {
    this._amount = value;
  }


  timenow: Date = new Date();
  amount_n : number = Number(this.amount);


  constructor(private router:Router, private todoservice: TodoService){}

  

  savebutton() {
      const newItem: newTodo = {

        description: this.content,
  
        type: this.type,
        amount: this.amount_n,
    

      }

      this.todoservice.addItems(newItem).subscribe();
      this.content = '';
      this.type = '';
      this.amount = '';

      
    }
 
  }
 
  

  

  
      
    


