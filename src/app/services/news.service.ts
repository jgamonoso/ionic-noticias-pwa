import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NewsResponse, Article, ArticlesByCategoryAndPage } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {}

  constructor(
    private http: HttpClient
  ) { }

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey:apiKey,
        country: 'us',
      }
    });
  }

  getTopHeadlines():Observable<Article[]>{
    return this.getTopHeadLinesByCategory('business');
  }

  getTopHeadLinesByCategory(category: string, loadMore: boolean = false):Observable<Article[]>{

    if (loadMore) {
      return this.getArticlesgetByCategory(category);
    }

    if ( this.articlesByCategoryAndPage[category] ) { // si existe esa categoria
    // if (Object.keys(this.articlesByCategoryAndPage).includes(category) ) { // Esto comprueba lo mismo que la linea anterior
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesgetByCategory(category); //Si no existe esa categoria
  }


  private getArticlesgetByCategory(category: string):Observable<Article[]> {

    if (Object.keys(this.articlesByCategoryAndPage).includes(category) ) {
      // Ya existe, no hacemos nada
    } else {
      // No existe
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }
    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${ page }`)
      .pipe(
        // map( resp => resp.articles ) // lo dejo para que se entienda lo de abajo, es lo mismo
        map( ({ articles }) => {
          if ( articles.length === 0) {
            return this.articlesByCategoryAndPage[category].articles;
          }

          this.articlesByCategoryAndPage[category] = {
            page: page,
            articles: [ ...this.articlesByCategoryAndPage[category].articles , ...articles]
          }
          return this.articlesByCategoryAndPage[category].articles;
        })
      );
  }

}
