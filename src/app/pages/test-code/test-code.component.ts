import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextFieldValidator } from '../employee/employee.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-code',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './test-code.component.html',
  styleUrl: './test-code.component.scss'
})
export class TestCodeComponent {
    testForm!: FormGroup;
    _fb = inject(FormBuilder)
  
    constructor(){
  
    }
    ngAfterViewInit(): void {
      this.testForm.get('email')?.valueChanges.subscribe(value=>{
        console.log(value)
      const nameControl = this.testForm.get('name');
      if(nameControl?.value==''){
        nameControl?.disable();
      }
      else{
        nameControl?.enable()
      }
    })
    }
ngOnInit(): void {
  this.setForm();

  
  
   
 }
 setForm(){
  this.testForm = this._fb.group({
    name: new FormControl('',Validators.compose([Validators.required,TextFieldValidator.validatetextfield])),
    email: new FormControl('', Validators.required),
    skills:new FormArray([])

  }) 
 }
togglefields(edvalue:boolean){

  if(edvalue){
    this.testForm.enable()
  }
  else{
   this.testForm.disable()
  }

}
 createFormControls(){
  (<FormArray>this.testForm.get('skills')).push(new FormControl('',Validators.required))
 }
 get skillcontrols(){
   return (<FormArray>this.testForm.get('skills')).controls;
 }
}
