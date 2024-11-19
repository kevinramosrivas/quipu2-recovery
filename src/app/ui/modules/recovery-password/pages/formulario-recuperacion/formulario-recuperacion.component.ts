import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';

@Component({
  templateUrl: './formulario-recuperacion.component.html',
  styleUrl: './formulario-recuperacion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioRecuperacionComponent {
  title = 'quipu2-recovery';
  private fb = inject(FormBuilder);
  private router = inject(ActivatedRoute);
  private authService = inject(AuthService);

  public passwordMatch = true;

  public token = '';

  constructor(){
    console.log(this.router.snapshot.queryParams);
    this.token = this.router.snapshot.queryParams['token'];
    this.authService.validarExistenciaCodigoVerificacion(this.token).subscribe((response) => {
      console.log(response);
    });
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
