import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;     // ! Indica que sabemos que puede ser null. Es para decirle a TypeScript que no de error por ello.

  constructor(
    private activatedRoute: ActivatedRoute,
    private PaisService: PaisService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(            // Dentro de pipe es donde puedo especificar todos los operadores Rx que van a trabajar con el producto del observable this.activatedRoute.params
        switchMap( ({ id }) => this.PaisService.getPaisPorAlpha( id) ),      // switchMap permite recibir un observable y devolver otro observable.
                                                                             // En este caso devuelve el observable que devuelve el método getPaisPorAlpha().
        tap( console.log )                                                   // El operador tap es otro operador de Rx. Lo que hace es disparar un efecto ecundario.
                                                                             // En este caso recibe el producto del observable del primer parámetro del pipe
                                                                             // y hace console.log con ello como parámetro. 
                                                                             // (Es una forma corta de hacer una impresión en consola)
                                                                             // Es equivalente a "tap( resp => console.log(resp))"
      )
      .subscribe( pais => {
        this.pais = pais;
      })



    // UNA PRIMERA FORMA DE HACER LO MISMO SIN OPERADORES DE RX (RxJs): 
    /** 
        // Nos queremos suscribir a cambios en la url.
        this.activatedRoute.params
        .subscribe( ({ id }) => {   // Aquí estamos haciendo la "desestructuración" de {id: valorId} para quedarnos directamente con el valor de el campo id.
                                    // Otra forma de hacerlo habría sido dejar .subscribe( params => { console.log(params.id) }) 
          console.log(id);
          
          this.PaisService.getPaisPorAlpha( id )
            .subscribe( pais => {
              console.log(pais);
              
            });
        });
    */

  }

}
