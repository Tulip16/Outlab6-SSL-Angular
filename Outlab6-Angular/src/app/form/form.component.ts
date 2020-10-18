import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { details } from '../details';
import { ApiService } from '../api.service';


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
    feedback: new FormControl('',Validators.minLength(1)),
    comment: new FormControl('')
  });
  //form: FormGroup;
  

  //radioItems= 'Great,Okay,Not good'.split(',');
  //model= { options: items.feedback };
  //public List:{name:string, email:string, feedback:string, comment:string}[] = initial_values;
   
  constructor(private api: ApiService) {
  }  
  
  getRequest(): void {
    this.api.getRequest().subscribe(details =>
      {
        this.profileForm.setValue({
          name: details.name,
          email: details.email,
          feedback: details.feedback,
          comment: details.comment
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
    if(details.feedback.length==0){
      alert("Submission failed! You might want to enter valid inputs ;)");
    }
    else{
      alert("Submission successful! \n Details posted are: \n Name: "+details.name+" \n Email: "+details.email+"\n Comments: "+details.comment+"\n Feedback: "+details.feedback);
    }
}, error => { // second parameter is to listen for error
    console.log(error);
    this.error = error;
    alert("Submission failed! You might want to enter valid inputs ;) \n (All fields except Comments must be filled) ");
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
