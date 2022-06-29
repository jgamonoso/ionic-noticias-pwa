import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NewsResponse, Article } from '../interfaces/index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  getTopHeadlines():Observable<Article[]> {
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`, {
      params: {
        apiKey: apiKey
      }
    }).pipe(
      // map( resp => resp.articles ) // lo dejo para que se entienda lo de abajo
      map( ({articles}) => articles ) // es lo mismo que la linea de arriba
    )
  }

}
