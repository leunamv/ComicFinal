// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-create',
//   templateUrl: './create.page.html',
//   styleUrls: ['./create.page.scss'],
// })
// export class CreatePage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComicService } from '../services/comic.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  userForm: FormGroup;
  comicForm: any;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private comicService: ComicService //aqui estaba PilotoService
  ) {
    this.comicForm = this.formBuilder.group({
      comic: [''],
      autor: [''],
     
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (!this.comicForm.valid) {
      return false;
    } else {
      this.comicService
        .createComic(this.comicForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.comicForm.reset();
            this.router.navigate(['/tabs/tab3']);
          });
        });
    }
  }
}
