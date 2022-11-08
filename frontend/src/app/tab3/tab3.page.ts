import { Component, OnInit } from '@angular/core';
import { ComicService } from '../services/comic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  Comics: any = [];

  constructor(private comicService: ComicService, private router: Router) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.comicService.getComics().subscribe((response) => {
      this.Comics = response;
    });
  }

  removeComic(id) {
    if (window.confirm('Está usted seguro')) {
      this.comicService.deleteComic(id).subscribe(() => {
        this.ionViewDidEnter();
        console.log('Comic deleted!');
      });
    }
  }
}
