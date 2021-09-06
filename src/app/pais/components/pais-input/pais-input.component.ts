import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {
  
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();  // Esto es para enviar el evento fuera. Y que lo puedan recibir componentes que tengan este como hijo.
  
  @Input() placeholder: string = '';
  
  // Esto es para tener un evento interno que me permita reaccionar a él usando funciones rx (reactivas) al capturarlo.
  // Al menos es lo que entiendo de las explicaciones del profesor.
  debouncer: Subject<string> = new Subject(); 

  termino: string = '';

  ngOnInit() {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe( valor => {
      this.onDebounce.emit( valor );  // Podríamos haber usado el termino, pero así vemos el flujo de información a través del observable.
    })
  }

  buscar() {
    this.onEnter.emit( this.termino );
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

}
