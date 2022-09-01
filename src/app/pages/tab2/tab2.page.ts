import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ]
  public selectedCategory: string = this.categories[0];

  public articles: Article[] = []

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.loadByCategory();
  }

  segmentChanged(event: Event) {
    // console.log('event', event.detail.value);
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.loadByCategory();
  }

  loadByCategory() {
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        // console.log( articles );
        this.articles = [ ...articles ];
      })
  }

  loadData(){
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory, true)
      .subscribe( articles => {

        if (articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          // event.target.disabled = true;
          return;
        }

        this.articles = articles;

        setTimeout(() => {
          this.infiniteScroll.complete();
          // event.target.complete();
        }, 1000);

      })
  }

}
