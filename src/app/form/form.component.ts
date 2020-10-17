import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import initial_values from '../initial_values.json';
import { details } from '../details';
import { ApiService } from '../api.service';
import { MessageService } from '../message.service';
import { det } from '../det';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  items: details;
  getdata: details;
  display="";
  postitem: details;
  jsondata:details;
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    comment: new FormControl(''),
    feedback: new FormControl('')
  });
  //form: FormGroup;
  

  radioItems= 'Great,Okay,Not good'.split(',');
  //model= { options: items.feedback };
  public List:{name:string, email:string, feedback:string, comment:string}[] = initial_values;
   
  constructor(private api: ApiService, private message: MessageService) {
  }  
  
  getRequest(): void {
    this.api.getRequest().subscribe(details =>
      {
        this.profileForm.setValue({
          name: details.name,
          email: details.email,
          comment: details.comment,
          feedback: details.feedback
        });
        this.getdata=details;
      }
    );

  }


error: any;

err(){
  this.display="yes";
  //this.postRequest();
  //console.log(JSON.stringify(this.profileForm.value));
  return this.api.addpost(JSON.stringify(this.profileForm.value)).subscribe(details => {
    console.log(details);
    this.error=""
    //this.error="";
    alert("Submission successful!");
}, error => { // second parameter is to listen for error
    console.log(error);
    this.error = error;
    alert("Submission failed! You might want to enter valid inputs ;)");
});


}

refresh(){
  this.display="";
  
  this.profileForm.setValue({
    name: "",
    email: "",
    feedback: "",
    comment: "",
  });
  
}



  
  ngOnInit(): void {
    //this.items.name="";
    //this.items.email="";
    //this.items.feedback="";
    //this.items.comment="";
    this.getRequest();
    //console.log("hey");

    //this.jsondata= this.items;
    //this.postRequest();
    //this.jsondata= JSON.stringify(this.items);
    
  }
  
}
