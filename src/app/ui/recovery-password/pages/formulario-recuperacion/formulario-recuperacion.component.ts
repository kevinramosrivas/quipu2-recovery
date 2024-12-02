import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangePasswordRequest, ValidateCodeResponse } from '../../../../core/interfaces/auth.interface';
import { AuthService } from '../../../shared/service/auth.service';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment.development';

@Component({
  templateUrl: './formulario-recuperacion.component.html',
  styleUrl: './formulario-recuperacion.component.scss',
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
  public pattern = /^(?!.*(.)\1{2})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;

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
    newPassword: ['',[Validators.required,Validators.minLength(8),Validators.pattern(this.pattern)]],
    confirmPassword: ['',[Validators.required,Validators.minLength(8),Validators.pattern(this.pattern)]]
  });

  public onSubmit(): void {
    if(this.paswwordNewForm.invalid || !this.checkPasswordMatch())return;
    let parameters = {
      newpass: this.paswwordNewForm.get('newPassword')!.value,
      id: this.token
    }
    this.authService.cambiarContrasena(parameters as ChangePasswordRequest).subscribe(
      {
        next: (response) => {
          Swal.fire({
            title: 'Contraseña cambiada',
            text: 'La contraseña ha sido cambiada exitosamente',
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#203152'
          }).then((result) => {
            if(result.isConfirmed){
              window.location.href = environment.redirectUrl;
            }
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#203152'
          });
        }
      }
    );
  }

  public  checkPasswordMatch(): boolean{
    const newPassword = this.paswwordNewForm.get('newPassword')?.value;
    const confirmPassword = this.paswwordNewForm.get('confirmPassword')?.value;

    if (!newPassword || !confirmPassword) {
      return true;
    }

    this.passwordMatch = newPassword === confirmPassword;
    return this.passwordMatch;
  }

  public isValidField(field: string): boolean|undefined {
    return !((this.paswwordNewForm.get(field)?.touched || this.paswwordNewForm.get(field)?.dirty) && !this.paswwordNewForm.get(field)?.valid);
  }

  public showPassword(event:any) {
    event.preventDefault();
    let input = event.currentTarget.previousElementSibling;
    if(input.getAttribute('type') == 'password'){
      input.setAttribute('type','text');
      event.currentTarget.children[0].classList.remove('bi-eye');
      event.currentTarget.children[0].classList.add('bi-eye-slash');
    }
    else{
      input.setAttribute('type','password');
      event.currentTarget.children[0].classList.remove('bi-eye-slash');
      event.currentTarget.children[0].classList.add('bi-eye');
    }
  }

  public calculateTimeLeft(expirationTime: string): number {
    let expirationTimeConvert = new Date(expirationTime);
    let difference =  expirationTimeConvert.getTime() - new Date().getTime();
    return Math.floor(difference / 1000);
  }
}
