import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import initial_values from '../initial_values.json';
import { HttpClient } from '@angular/common/http'; 
import { details } from '../details';
import { ApiService } from '../api.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  items: details;

  postitem: details;
  jsondata:details;
  radioItems= 'Great,Okay,Not good'.split(',');
  //model= { options: items.feedback };
  public List:{name:string, email:string, feedback:string, comment:string}[] = initial_values;
   
  constructor(private api: ApiService, private message: MessageService) {
    
  }  
  getRequest(): void {
    this.api.getRequest().subscribe(details => this.items = details);
  }

  postRequest(): void{
    //this.jsondata= JSON.stringify(this.items);
    this.api.addpost(this.items).subscribe(details => this.postitem = details );
  }

  public error: any; 

  err() { 
    this.postRequest();
      return this.api.addpost(this.items).subscribe(details => {
          console.log(details);
          this.error="";
      }, error => { // second parameter is to listen for error
          console.log(error);
          this.error = error;
      });
  }
  
  ngOnInit(): void {
    //this.items.name="";
    //this.items.email="";
    //this.items.feedback="";
    //this.items.comment="";
    this.getRequest();
    //this.jsondata= this.items;
    //this.postRequest();
    //this.jsondata= JSON.stringify(this.items);
    

    
  }
  
}
