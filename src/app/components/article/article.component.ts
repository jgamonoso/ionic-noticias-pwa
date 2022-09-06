import { Component, Input } from '@angular/core';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { StorageService } from 'src/app/services/storage.service';

import { Article } from '../../interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article;
  @Input() index: number;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
  ) { }

  openArticle(){

    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url)
      browser.show();
      return;
    }
    window.open(this.article.url, '_blank')
  }

  async onOpenMenu(){

    const articleInFavorite = this.storageService.articleInFavorites(this.article);

    const normalBtns: ActionSheetButton[] = [
      {
        text: articleInFavorite? 'Borrar favorito' : 'Favorito',
        icon: articleInFavorite? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel'
      }
    ];

    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    };

    const navigatorShareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onNavigatorShareArticle()
    };

    if (this.platform.is('capacitor')) {
      normalBtns.unshift(shareBtn);
    } else {
      normalBtns.unshift(navigatorShareBtn);
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns
    })

    await actionSheet.present();
  }

  onShareArticle(){
    console.log('share article')

    const { title, source, url } = this.article;

    this.socialSharing.share(
      title,
      source.name,
      null,
      url
    );
  }

  onNavigatorShareArticle(){
    if (navigator.share) {
      navigator.share({
        title: this.article.title,
        text: this.article.description,
        url: this.article.url,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('No se pudo compartir porque no se soporta')
    }
  }

  onToggleFavorite(){
    console.log('toogle favorite');
    this.storageService.saveRemoveArticle(this.article);
  }

}
