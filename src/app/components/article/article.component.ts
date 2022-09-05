import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article;
  @Input() index: number;

  constructor() { }

  onClick(){

  }

  openArticle(){
    Browser.open({ url: this.article.url });
  }

}
