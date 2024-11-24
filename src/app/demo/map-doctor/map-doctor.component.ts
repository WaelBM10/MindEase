import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, Marker, tileLayer, Map } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'app-map-doctor',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map-doctor.component.html',
  styleUrls: ['./map-doctor.component.scss']
})
export class MapDoctorComponent implements OnInit {
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
    { name: 'Cabinet Médical Dr. Ahmed', type: 'Cabinet', lat: 36.8065, lng: 10.1815, address: 'Tunis, Avenue Habib Bourguiba' },
    { name: 'Clinique El Khadra', type: 'Clinique', lat: 36.83351122299311, lng: 10.230575033416475, address: 'Tunis, Avenue de la Liberté' },
    { name: 'Hôpital Charles Nicolle', type: 'Hôpital', lat: 36.8386, lng: 10.1787, address: 'Tunis, Rue de l IRAK' },
    // Ajoutez d'autres établissements pertinents pour les médecins ici
  ];
  // Liste des patients avec maladies dangereuses
  diseaseClusters = [
    { lat: 36.8065, lng: 10.1815, disease: 'Patien:Mohamed Rkik | Stress', address: 'Pharmacie Al Amal, Tunis, Avenue Habib Bourguiba' },
    { lat: 34.7406, lng: 10.7611, disease: 'Patien:Wael Hamdi | Addiction', address: 'Pharmacie Chouikha, Sfax, Rue de la République' },
    { lat: 35.8256, lng: 10.6367, disease: 'Patien:Yassine Ghorbal | Stress', address: 'Pharmacie La Reine, Sousse, Rue de Marseille' },
    { lat: 36.83537504633271, lng: 10.234725833263113, disease: 'Patien:Youssef Nesiri | ADHD', address: 'Pharmacie La Reine, Tunis, Rue du Lac' },
    { lat: 34.7428, lng: 10.7651, disease: 'Patien:Yassmine Gharbi | Addiction', address: 'Pharmacie Chouikha, Sfax, Rue de la République' },
    { lat: 35.8300, lng: 10.6333, disease: 'Patien:Louay Ali | Stress', address: 'Pharmacie Al Amal, Sousse, Avenue de l’Indépendance' },
  ];

  markers: Marker[] = [];

  ngOnInit(): void {
    this.addMarkers();
    this.initializeClusterGroup();
  }

  initializeClusterGroup() {
    this.clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 80,
      iconCreateFunction: (cluster) => {
        const childCount = cluster.getChildCount();
        const percentage = Math.min(childCount / 100, 1) * 100;

        return L.divIcon({
          html: `
            <div style="
              background-color: red;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              color: white;
              text-align: center;
              line-height: 50px;
              font-size: 14px;
              font-weight: bold;
            ">
              ${percentage.toFixed(0)}%
            </div>`,
          className: 'custom-cluster-icon',
          iconSize: L.point(50, 50),
        });
      }
    });

    // Add disease clusters to the cluster group
    this.diseaseClusters.forEach(disease => {
      const diseaseMarker = marker([disease.lat, disease.lng], {
        icon: icon({
          iconSize: [40, 40],
          iconAnchor: [20, 25],
          iconUrl: 'assets/leaflet/warning.png',
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
    this.map.invalidateSize();

    // Ajout des marqueurs à la carte
    this.markers.forEach(marker => marker.addTo(this.map));
    this.map.addLayer(this.clusterGroup); // Ajout du clusterGroup à la carte
  }
}
