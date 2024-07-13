import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    { name: 'Listado', icon: 'label', url: './list' },
    { name: 'Añadir', icon: 'add', url: './new-hero' },
    { name: 'Buscar', icon: 'search', url: './search' },
  ]

}
