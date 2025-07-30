import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { MusicService } from '../services/music.service';
import { SongsmodalPage } from '../songsmodal/songsmodal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  song: {
    audioUrl: string;
    name: string;
    playing: boolean;
  } | null = null;

  colorclaro = 'var(--color-claro)';
  coloroscuro = 'var(--color-oscuro)';
  coloractual = this.coloroscuro;

  genres = [];
  tracks: any;
  albums: any;
  localArtists: any;
  remoteArtists: any;
  tracksByArtist: any;
  songs: any;
  name = '';
  playing!: false;
  isLoading = false;

  currentsong: HTMLAudioElement = new Audio();

  constructor(
    private storageService: StorageService,
    private musicService: MusicService,
    private router: Router,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    console.log('ngOnInit ejecutado ✅');
    this.isLoading = true;

    await this.loadStorageData();
    await this.simularCargaDatos();
    await this.loadAlbums();
    await this.loadTracks();
    this.getlocalArtists();
    await this.loadRemoteArtists();

    this.isLoading = false;
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.coloractual = savedTheme;
      console.log('Tema cargado desde Storage:', savedTheme);
    }
  }

  async simularCargaDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log('Datos simulados:', data);
  }

  obtenerDatosSimulados() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Rock', 'Pop', 'Jazz']);
      }, 1500);
    });
  }

  async loadTracks() {
    this.tracks = await this.musicService.getTracks();
    console.log('Pistas cargadas:', this.tracks);
  }

  async loadAlbums() {
    this.albums = await this.musicService.getalbums();
    console.log('Álbumes cargados:', this.albums);
  }

  getlocalArtists() {
    this.localArtists = this.musicService.getlocalArtists();
    console.log('Artistas locales:', this.localArtists?.artists);
  }

  async cambiarcolor() {
    this.coloractual = this.coloractual === this.coloroscuro ? this.colorclaro : this.coloroscuro;
    await this.storageService.set('theme', this.coloractual);
    console.log('Tema cambiado a:', this.coloractual);
  }

  async showSongs(albumId: string): Promise<void> {
    try {
      this.songs = await this.musicService.getsongsByAlbum(albumId);
      console.log('Canciones obtenidas:', this.songs);

      // Asegura que las canciones tengan audioUrl
      if (this.songs.length > 0) {
        this.song = {
          name: this.songs[0].name,
          audioUrl: `assets/music/${this.songs[0].filename || 'micancion.mp3'}`,
          playing: false
        };
      }

      const modal = await this.modalController.create({
        component: SongsmodalPage,
        componentProps: {
          songs: this.songs,
          albumId: albumId
        },
      });

      await modal.present();
    } catch (error) {
      console.error('Error al obtener canciones del álbum:', error);
    }
  }

  async loadRemoteArtists() {
    try {
      this.remoteArtists = await this.musicService.getArtists();
      console.log('Artistas del servidor:', this.remoteArtists);
    } catch (error) {
      console.error('Error al cargar artistas remotos:', error);
    }
  }

  async goToArtistSongs(artistId: string): Promise<void> {
    try {
      const songs = await this.musicService.getTracksByArtist(artistId);
      console.log(`Canciones del artista ${artistId}:`, songs);

      if (songs.length > 0) {
        this.song = {
          name: songs[0].name,
          audioUrl: `assets/music/${songs[0].filename || 'micancion.mp3'}`,
          playing: false
        };
      }

      const modal = await this.modalController.create({
        component: SongsmodalPage,
        componentProps: {
          songs,
          albumId: artistId
        },
      });

      await modal.present();
    } catch (error) {
      console.error('Error al mostrar canciones del artista:', error);
    }
  }

  play() {
    if (this.song) {
      this.currentsong.src = this.song.audioUrl;
      this.currentsong.load();
      this.currentsong.play()
        .then(() => {
          this.song!.playing = true;
        })
        .catch((error) => {
          console.error('Error al reproducir la canción:', error);
        });
    }
  }

  pause() {
    this.currentsong.pause();
    if (this.song) {
      this.song.playing = false;
    }
  }
}
