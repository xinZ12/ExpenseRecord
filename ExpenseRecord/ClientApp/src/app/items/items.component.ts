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

  private _amount_str = '';
  get amount_str(): string {
    return this._amount_str;
  }
  set amount_str(value: string) {
    this._amount_str = value;
  }


  timenow: Date = new Date();


  constructor(private router:Router, private todoservice: TodoService){}

  

  savebutton() {
      const newItem: newTodo = {

        description: this.content,
        type: this.type,
        amount: Number(this.amount_str),

      }

      this.todoservice.addItems(newItem).subscribe();
      this.content = '';
      this.type = '';
      this.amount_str = '';

      
    }
 
  }
 
  

  

  
      
    


