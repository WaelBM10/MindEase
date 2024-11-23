import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, Marker, tileLayer, Map } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet.markercluster';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: Map;
  clusterGroup: L.MarkerClusterGroup;

  // Open Street Map definitions
  LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Open Street Map'
  });

// Options de la carte Leaflet
options = {
  layers: [this.LAYER_OSM],
  zoom: 7, // Ajusté pour afficher la Tunisie
  center: latLng(36.800581498968974, 10.176827122709522) // Coordonnées de la Tunisie
};


 // Liste des établissements avec adresses
establishments = [
  { name: 'Pharmacie Al Amal', type: 'Pharmacie', lat: 36.8065, lng: 10.1815, address: 'Tunis, Avenue Habib Bourguiba' },
  { name: 'Clinique El Amen', type: 'Clinique', lat: 34.7490, lng: 10.7600, address: 'Sfax, Avenue Farhat Hached' },
  { name: 'Hôpital Sahloul', type: 'Hôpital', lat: 35.8256, lng: 10.6367, address: 'Sousse, Rue de l’Hôpital' },
  { name: 'Pharmacie La Reine', type: 'Pharmacie', lat: 36.8180, lng: 10.1640, address: 'Tunis, Rue de Marseille' },
  { name: 'Clinique El Khadra', type: 'Clinique', lat: 36.8215, lng: 10.2197, address: 'Tunis, Rue du Lac' },
  { name: 'Hôpital Charles Nicolle', type: 'Hôpital', lat: 36.8386, lng: 10.1787, address: 'Tunis, Rue de l IRAK' },
  { name: 'Pharmacie Chouikha', type: 'Pharmacie', lat: 34.7428, lng: 10.7651, address: 'Sfax, Rue de la République' },
  { name: 'Clinique El Menzah', type: 'Clinique', lat: 36.8231, lng: 10.2198, address: 'Tunis, Avenue de la Liberté' }
];

    // Define mock data for disease clusters
  // Define mock data for disease clusters with updated coordinates
 // Define mock data for disease clusters with updated coordinates
diseaseClusters = [
  { lat: 36.8065, lng: 10.1815, disease: 'Malaria', address: 'Tunis, Avenue Habib Bourguiba' },
  { lat: 34.7406, lng: 10.7611, disease: 'Cholera', address: 'Sfax, Avenue Farhat Hached' },
  { lat: 35.8256, lng: 10.6367, disease: 'Dengue', address: 'Sousse, Rue de l’Hôpital' },
  { lat: 36.8215, lng: 10.2197, disease: 'Typhoid', address: 'Tunis, Rue du Lac' },
  { lat: 34.7428, lng: 10.7651, disease: 'Hepatitis A', address: 'Sfax, Rue de la République' },
  { lat: 35.8300, lng: 10.6333, disease: 'Leptospirosis', address: 'Sousse, Avenue de lIndépendance' }
];


  markers: Marker[] = [];

  ngOnInit(): void {
    this.addMarkers();
// Initialize map and clusterGroup
this.clusterGroup = L.markerClusterGroup({
  maxClusterRadius: 80,
  iconCreateFunction: (cluster) => {
    // Calculez le pourcentage du cluster si nécessaire
    const childCount = cluster.getChildCount();
    const percentage = Math.min(childCount / 100, 1) * 100; // Limitez à 100% pour éviter les valeurs au-delà

    return L.divIcon({
      html: `
        <div style="
          background-color: red; /* Couleur de fond en rouge */
          width: 50px; /* Largeur du cercle */
          height: 50px; /* Hauteur du cercle */
          border-radius: 50%; /* Cercle parfait */
          color: white; /* Couleur du texte */
          text-align: center; /* Centrer le texte horizontalement */
          line-height: 50px; /* Centrer le texte verticalement */
          font-size: 14px; /* Taille de la police */
          font-weight: bold; /* Gras pour le pourcentage */
        ">
          ${percentage.toFixed(0)}% <!-- Affiche le pourcentage -->
        </div>`,
      className: 'custom-cluster-icon',
      iconSize: L.point(50, 50),
    });
  }
});

    // Add mock markers to the cluster group
    this.diseaseClusters.forEach(disease => {
      const diseaseMarker = marker([disease.lat, disease.lng], {
        icon: icon({
          iconSize: [40, 40],
          iconAnchor: [20, 25],
          iconUrl: 'assets/leaflet/warning.png', // Icône des établissements
          iconRetinaUrl: 'assets/leaflet/warning.png',
          shadowUrl: 'assets/leaflet/marker-shadow.png'
        })
      }).bindPopup(`<b>${disease.disease}</b><br>${disease.address}`);
      this.clusterGroup.addLayer(diseaseMarker);
    });
  }

  addMarkers() {
    this.establishments.forEach(establishment => {
      const newMarker = marker(
        [establishment.lat, establishment.lng],
        {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/leaflet/marker-icon.png',
            iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
            shadowUrl: 'assets/leaflet/marker-shadow.png'
          })
        }
      ).bindPopup(`<b>${establishment.name}</b><br>${establishment.type}`);
      
      this.markers.push(newMarker);
    });
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.map.invalidateSize(); // Force le redimensionnement de la carte

    // Ajout des marqueurs à la carte
    this.markers.forEach(marker => marker.addTo(this.map));
    this.map.addLayer(this.clusterGroup);  // Add clusterGroup to the map
  }
}
