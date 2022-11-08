import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComicService } from '../services/comic.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  updateComicFg: FormGroup;
  id: any;

  constructor(
    private comicService: ComicService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchComic(this.id);
    this.updateComicFg = this.formBuilder.group({
      comic: [''],
      autor: [''],
      
    });
  }

  fetchComic(id) {
    this.comicService.getComic(id).subscribe((data) => {
      this.updateComicFg.setValue({
        comic: data['comic'],
        autor: data['autor'],
       
      });
    });
  }

  onSubmit() {
    if (!this.updateComicFg.valid) {
      return false;
    } else {
      this.comicService
        .updateComic(this.id, this.updateComicFg.value)
        .subscribe(() => {
          this.updateComicFg.reset();
          this.router.navigate(['/tabs/tab3']);
        });
    }
  }
}

//   constructor() { }

//   ngOnInit() {
//   }

// }
