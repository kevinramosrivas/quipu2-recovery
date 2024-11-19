import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent implements OnInit, OnDestroy{
  countdown: string = '5:00';  // Tiempo inicial (5 minutos)
  private interval: any;

  ngOnInit(): void {
    // Llamamos a la función para iniciar el contador
    this.startCountdown();
  }

  ngOnDestroy(): void {
    // Limpiamos el intervalo cuando el componente se destruya
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startCountdown(): void {
    let totalSeconds = 5 * 60; // 5 minutos en segundos
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
    // Calculamos los minutos y segundos restantes
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Formateamos los minutos y segundos para que siempre tengan dos dígitos
    this.countdown = `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(value: number): string {
    // Añadimos un cero a la izquierda si el valor es menor a 10
    return value < 10 ? '0' + value : value.toString();
  }

}
