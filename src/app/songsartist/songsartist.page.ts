import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

// Si estás usando un servicio para cargar canciones
// import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-songsartist',
  standalone: true,
  templateUrl: './songsartist.page.html',
  styleUrls: ['./songsartist.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class SongsartistPage implements OnInit {
  songs: { title: string; duration: number }[] = [];

  constructor(
    // private musicService: MusicService
  ) {}

  ngOnInit() {
    // Ejemplo fijo para que funcione:
    this.songs = [
      { title: 'Canción 1', duration: 180 },
      { title: 'Canción 2', duration: 210 },
    ];

    // Si usas servicio:
    // this.songs = this.musicService.getSongsByArtist('Nombre del artista');
  }
}
