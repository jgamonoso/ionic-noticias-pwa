import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from './../../services/news.service';
import { Article } from '../../interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  public articles: Article[] = []

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.newsService.getTopHeadlines()
      .subscribe( articles => {
        console.log( articles );
        // this.articles = [ ...articles, ...this.articles]; // es lo mismo que la linea de abajo
        this.articles.push( ...articles);
      })
  }

  loadData(){
    this.newsService.getTopHeadLinesByCategory('business', true)
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
