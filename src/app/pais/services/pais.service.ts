import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.eu/rest/v2';

  get httpParams () {
    // El parámetro fields nos permite filtrar sólo los campos que queremos, para pedir menos información y que sea más eficiente.
    // Otra forma alternativa que encuentro yo, para construir el objeto HttpParams como lo necesitamos sería
    // poniendo los parámetros directamente en el constructor, sin usar después el método set. De la forma:
    //
    // const params = new HttpParams({fromObject:{'fields': 'name;capital;alpha2Code;flag;population'}});
    //
    // Pero, la verdad es que es más confuso.
    return  new HttpParams().set('fields', 'name;capital;alpha2Code;flag;population');
  }

  constructor( private http:HttpClient ) { }

  buscarPais( termino: string ): Observable<Country[]> { 
    const url = `${ this.apiUrl }/name/${ termino }`;
    return this.http.get<Country[]>( url, { params: this.httpParams });
  }

  buscarCapital( termino: string ): Observable<Country[]> { 
    const url = `${ this.apiUrl }/capital/${ termino }`;
    return this.http.get<Country[]>( url, { params: this.httpParams } );
  }

  getPaisPorAlpha( id: string ): Observable<Country> { 
    const url = `${ this.apiUrl }/alpha/${ id }`;
    return this.http.get<Country>( url );

  }
  
  buscarRegion( region: string ): Observable<Country[]> {



    const url = `${ this.apiUrl }/region/${ region }`;
    return this.http.get<Country[]>( url, { params: this.httpParams })
    .pipe(
      tap( console.log )
    )
  }

}
