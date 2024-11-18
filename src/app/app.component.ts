import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quipu2-recovery';
  private fb = inject(FormBuilder);
  private ruta = inject(ActivatedRoute);

  public passwordMatch = true;

  public token = '';

  constructor(){
    if(this.ruta.snapshot.queryParams['token'] != undefined){
      this.token = this.ruta.snapshot.queryParams['token'];
    }
  }

  public paswwordNewForm = this.fb.group({
    newPassword: ['',[Validators.required,Validators.minLength(8)]],
    confirmPassword: ['',[Validators.required,Validators.minLength(8)]]
  });

  public onSubmit(): void {
    let parameters = {
      newPassword: this.paswwordNewForm.get('newPassword')?.value,
      token: this.token
    }
    console.log(parameters);
  }

  public  checkPasswordMatch(): boolean{
    if(this.paswwordNewForm.get('newPassword')?.value == '' || this.paswwordNewForm.get('confirmPassword')?.value === ''){
      return true;
    }
    if(this.paswwordNewForm.get('newPassword')?.value != this.paswwordNewForm.get('confirmPassword')?.value){
      this.passwordMatch = true;
      return false;
    }else{
      this.passwordMatch = false;
      return true;
    }
  }

  public isValidField(field: string): boolean|undefined {
    return !((this.paswwordNewForm.get(field)?.touched || this.paswwordNewForm.get(field)?.dirty) && !this.paswwordNewForm.get(field)?.valid);
  }








}
