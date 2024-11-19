import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { ChangePasswordRequest, ValidateCodeResponse } from '../../../../../core/interfaces/auth.interface';

@Component({
  templateUrl: './formulario-recuperacion.component.html',
  styleUrl: './formulario-recuperacion.component.css',
})
export class FormularioRecuperacionComponent implements OnInit{
  title = 'quipu2-recovery';
  private fb = inject(FormBuilder);
  private router = inject(ActivatedRoute);
  private authService = inject(AuthService);

  public passwordMatch = true;

  public token = '';

  public hasHttpError = false;

  public responseValidation: ValidateCodeResponse|null = null

  public codeExpired = false;

  ngOnInit(): void {
    this.token = this.router.snapshot.queryParams['token'];
    this.authService.validarExistenciaCodigoVerificacion(this.token).subscribe(
      {
        next: (response) => {
          this.responseValidation = response as ValidateCodeResponse;
          this.codeExpired = this.calculateTimeLeft(this.responseValidation.formattedExpireddate) <= 0;
        },
        error: (error) => {
          this.hasHttpError = true;
        }
      }
    );

  }

  public paswwordNewForm = this.fb.group({
    newPassword: ['',[Validators.required,Validators.minLength(8)]],
    confirmPassword: ['',[Validators.required,Validators.minLength(8)]]
  });

  public onSubmit(): void {
    let parameters = {
      newPassword: this.paswwordNewForm.get('newPassword')!.value,
      token: this.token
    }
    console.log(parameters);
    this.authService.cambiarContrasena(parameters as ChangePasswordRequest).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
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

  public showPassword(event:any) {
    event.preventDefault();
    let input = event.currentTarget.previousElementSibling;
    if(input.getAttribute('type') == 'password'){
      input.setAttribute('type','text');
      //cambiar al elemento i la clase fa-eye por fa-eye-slash
      event.currentTarget.classList.remove('fa-eye');
      event.currentTarget.classList.add('fa-eye-slash');
    }
    else{
      input.setAttribute('type','password');
      event.currentTarget.classList.remove('fa-eye-slash');
      event.currentTarget.classList.add('fa-eye');
    }
  }

  public calculateTimeLeft(expirationTime: string): number {
    let expirationTimeConvert = new Date(expirationTime);
    let difference =  expirationTimeConvert.getTime() - new Date().getTime();
    return Math.floor(difference / 1000);
  }
}
