import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  contactForm: FormGroup
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
     this.InitForm()
  }

  InitForm(){
     this.contactForm = this.formBuilder.group({
       username:["", [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
       fullname: ["", Validators.required],
       email: ["", [Validators.required, Validators.email]],
       password: ["", [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[$@^$#&!%*?&])[A-Za-zd$#%^&*@?].{8,}')]],
       cpassword: ["", Validators.required],
       address: this.formBuilder.group({
        address1: ["", Validators.required],
        address2: ["", Validators.required],
        zipcode: ["", [Validators.required, Validators.pattern('(?=.*[0-9]).{4,6}')]],
        city: ["", Validators.required],
        state: ["", Validators.required],
        country: ["", Validators.required],
       })

     },{
       validator:this.confirmPassword.bind(this)
     })
  }

  onSubmit(){
    console.log(this.contactForm.value)
  }


  confirmPassword(pwdFormGroup:FormGroup){
      const pwd = pwdFormGroup.controls.password.value;
      const cpwd = pwdFormGroup.controls.cpassword.value;

      if(cpwd.length<=0 && cpwd !==null){
        return null;
      }

      if(pwd !== cpwd){
        return {
          doesNotMatch:true
        }
      }

      return null;
  }

  resetForm(){
    this.contactForm.reset();
  }
}
