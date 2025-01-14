import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeById(id)) //se ha desestructurado {id} de params
      )
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/');
        this.heroForm.reset(hero);
        return;
      });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onsubmit(): void {
    console.log({
      formIsValid: this.heroForm.valid,
      value: this.heroForm.getRawValue(),
      value2: this.heroForm.value,
    });

    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackbar(`${hero.superhero} updated!`);
      });
      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.router.navigate(['heroes/edit', hero.id]);
      this.showSnackbar(`${hero.superhero} created!`);
    });

    //this.heroesService.updateHero()
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw new Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    //opcion1
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   console.log(result);
    //   if (!result) return;

    //   this.heroesService.deleteHero(this.currentHero.id).subscribe(wasDeleted =>{
    //     if (wasDeleted){
    //       this.showSnackbar(`el heroe a sido eliminado!`)
    //       this.router.navigate(['/heroes'])
    //     }
    //   })

    // });

    //opcion2
    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        //tap((result) => console.log(result))
        switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted),
        // tap((wasDeleted) => console.log(wasDeleted)
        // tap(() => this.showSnackbar(`el heroe a sido eliminado!`))
      )
      .subscribe((result) => {
        this.showSnackbar(`el heroe a sido eliminado!`)
        this.router.navigate(['/heroes'])
      });
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }
}
