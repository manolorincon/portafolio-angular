import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PromiseType } from 'protractor/built/plugins';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos(){

    return new Promise( ( resolve, reject ) => {

      this.http.get('https://angular-html-f38bc.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[])  => {
            setTimeout(() => {
              this.productos = resp;
              this.cargando = false;  
              resolve();
            }, 2000);
          });

    });

  }

  getProducto( id: string ){

    return this.http.get(`https://angular-html-f38bc.firebaseio.com/productos/${ id }.json`)

  }

  buscarProducto( termino: string){

    if (this.productos.length == 0){

      this.cargarProductos().then( () => {

        this.filtrarProductos( termino );


      });

    }else{

      this.filtrarProductos( termino );

    }

  }

  private filtrarProductos ( termino: string ){

    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || 
           tituloLower.indexOf( termino ) >= 0){

        this.productosFiltrado.push(prod);

      }

    })


  }
}
