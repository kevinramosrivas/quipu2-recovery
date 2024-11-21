import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent implements OnInit, OnDestroy{
  countdown: string = '';  // Tiempo inicial (5 minutos)
  private interval: any;

  @Input()
  expirationTime: string = '';


  ngOnInit(): void {
    // Llamamos a la función para iniciar el contador
    let totalSeconds = this.calculateTimeLeft(this.expirationTime);
    this.startCountdown(totalSeconds);
  }

  ngOnDestroy(): void {
    // Limpiamos el intervalo cuando el componente se destruya
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startCountdown(totalSeconds:number): void {
    this.updateCountdownDisplay(totalSeconds);

    this.interval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(this.interval);
      } else {
        totalSeconds--;
        this.updateCountdownDisplay(totalSeconds);
      }
    }, 1000); // 1000 ms = 1 segundo
  }

  updateCountdownDisplay(seconds: number): void {
    // Calculamos las horas, minutos y segundos
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Actualizamos el valor de la variable countdown
    this.countdown = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(value: number): string {
    // Añadimos un cero a la izquierda si el valor es menor a 10
    return value < 10 ? '0' + value : value.toString();
  }

  public calculateTimeLeft(expirationTime: string): number {
    //calculamos los segundos totales que faltan
    let expirationTimeConvert = new Date(expirationTime);
    let difference =  expirationTimeConvert.getTime() - new Date().getTime();
    return Math.floor(difference / 1000);
  }

}
