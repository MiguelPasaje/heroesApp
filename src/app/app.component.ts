import { Component, OnInit } from '@angular/core';
// import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent /* implements OnInit */{
  title = 'heroesApp';

  /* constructor(private authService:AuthService){}
  ngOnInit(): void {
    //es para mantener la sesion activa, lo cual no se hace asi, por que puede ser que carguen cosas antes que esto lo cual el usuario que intente acceder vea cosas indevidas antes de que se termine de ejecutar esto
    this.authService.checkAutentication().subscribe(()=>{
      console.log('check');

    })
  } */


}
