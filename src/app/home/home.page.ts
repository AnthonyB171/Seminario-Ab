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
  colorclaro = 'var(--color-claro)';
  coloroscuro = 'var(--color-oscuro)';
  coloractual = this.coloroscuro;

  genres = [/* tus géneros */];
  tracks: any;
  albums: any;
  localArtists: any;
  song: any;

  songs: any; // ✅ necesaria para el *ngFor
  isLoading = false; // ✅ necesaria para *ngIf

  constructor(
    private storageService: StorageService,
    private musicService: MusicService,
    private router: Router,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    this.loadAlbums();
    this.loadTracks();
    this.getlocalArtists();
    await this.loadStorageData();
    await this.simularCargaDatos();
    this.isLoading = false;
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) this.coloractual = savedTheme;
  }

  async simularCargaDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log('Datos simulados: ', data);
  }

  obtenerDatosSimulados() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Champeta', 'Salsa', 'Reguetón']);
      }, 1500);
    });
  }

  async loadTracks() {
    this.tracks = await this.musicService.getTracks();
  }

  async loadAlbums() {
    this.albums = await this.musicService.getalbums();
  }

  getlocalArtists() {
    this.localArtists = this.musicService.getlocalArtists();
  }

  async cambiarcolor() {
    this.coloractual = this.coloractual === this.coloroscuro ? this.colorclaro : this.coloroscuro;
    await this.storageService.set('theme', this.coloractual);
  }

  async showSongs(albumId: string): Promise<void> {
    try {
      this.songs = await this.musicService.getsongsByAlbum(albumId);
      const modal = await this.modalController.create({
        component: SongsmodalPage,
        componentProps: { songs: this.songs },
      });
      await modal.present();
    } catch (error) {
      console.error('Error al obtener canciones del álbum:', error);
    }
  
  }
}
