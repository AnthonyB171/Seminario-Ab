import { Injectable } from '@angular/core';
import dataArtists from './artistas.json';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  urlServer = "https://music.fly.dev";

  constructor() {}

  getTracks() {
    return fetch(`${this.urlServer}/tracks`)
      .then(response => response.json())
      .then(data => {
        console.log('Tracks recibidos:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al obtener los tracks:', error);
        return [];
      });
  }

  getalbums() {
    return fetch(`${this.urlServer}/albums`)
      .then(response => response.json());
  }

  getlocalArtists() {
    return dataArtists;
  }

  getsongsByAlbum(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`)
      .then(response => response.json());
  }
}

  