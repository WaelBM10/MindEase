import { Component, OnInit ,ViewChild} from '@angular/core';
import { SharedModule } from '../../theme/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexResponsive,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexGrid
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  colors: string[];
  labels: string[];
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};
declare const AmCharts: any;

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';

import dataJson from 'src/fake-data/map_data';
import mapColor from 'src/fake-data/map-color-data.json';
import { MapDoctorComponent } from '../map-doctor/map-doctor.component';


@Component({
  selector: 'app-dashboard-doctor',
  standalone: true,
  imports: [SharedModule,NgApexchartsModule,MapDoctorComponent],
  templateUrl: './dashboard-doctor.component.html',
  styleUrl: './dashboard-doctor.component.scss'
})
export class DashboardDoctorComponent implements OnInit{
  @ViewChild('chart') chart: ChartComponent;
  barSimpleChart: Partial<ChartOptions>;
  barStackedChart: Partial<ChartOptions>;
  workloadChart: Partial<ChartOptions>;
  areaSmoothChart: Partial<ChartOptions>;
  lineAreaChart: Partial<ChartOptions>;
  pieChart: Partial<ChartOptions>;
  maladieChart:Partial<ChartOptions>;
  medicamentChart:Partial<ChartOptions>;
  totalOrdonnance: number = 0;
  selectedTable: any;
  isModalOpen = false;
  selectedPrescription: any;
  searchText: string = '';  // Texte de recherche initialisé à une chaîne vide
  // Initialize with default value

  constructor(private modalService: NgbModal) {
    this.maladieChart = {
      series: [
        {
          name: 'Diabète',
          data: [50, 60, 70, 50, 49, 60, 70, 91, 125]
        },
        {
          name: 'Grippe',
          data: [120, 50, 65, 70, 49, 60, 95, 50, 60]
        },
        {
          name: 'COVID-19',
          data: [80, 100, 110, 120, 130, 140, 150, 160, 170]
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      },
      yaxis: {
        title: {
          text: '%'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ' %';
          }
        }
      }
    };
    this.medicamentChart = {
      series: [
        {
          name: 'Metformine',
          data: [64, 55, 65, 67, 82, 93, 71, 109, 72]
        },
        {
          name: 'Oseltamivir',
          data: [18, 23, 20, 8, 13, 27, 33, 12, 22]
        },
        {
          name: 'Remdesivir',
          data: [11, 17, 15, 15, 21, 14, 15, 13, 19]
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      },
      yaxis: {
        title: {
          text: '%'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ' %';
          }
        }
      }
    };
    this.barStackedChart = {
      series: [
        {
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43, 21, 49]
        },
        {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27, 33, 12]
        },
        {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14, 15, 13]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      xaxis: {
        categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4']
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50
      }
    };
    // Configuration du graphique pour la gestion de stock de médicaments
    this.workloadChart = {
      chart: {
        height: 380,
        type: 'line',
      },
      series: [
        {
          name: 'Consultations',
          data: [12, 14, 8, 10, 7, 12, 15], // Nombre de consultations par jour
        },
      ],
      xaxis: {
        categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        title: {
          text: 'Jour de la semaine',
        },
      },
      yaxis: {
        title: {
          text: 'Nombre de Consultations',
        },
        min: 0,
        max: 20,
      },
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        shared: true,
      },
    };
    

    this.areaSmoothChart = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z'
        ]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    };
    this.lineAreaChart = {
      series: [
        {
          name: 'Desktops',
          data: [20, 55, 45, 75, 50, 75, 100]
        },
        {
          name: 'Desktops',
          data: [10, 45, 35, 65, 40, 65, 90]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012']
      }
    };
    this.pieChart = {
      chart: {
        type: 'pie',  // Utiliser 'pie' au lieu de 'donut'
        width: '100%',
        height: 350
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          customScale: 1.0,  // Assurez-vous que l'échelle est de 1.0 pour un cercle complet
          offsetY: 20        // Vous pouvez ajuster cet offset si nécessaire
        }
      },
      colors: ['#FEB019', '#FF4560', '#008FFB'],
      series: [98, 450, 300],
      labels: ['Patient', 'Consultation', 'Ordonnance'],
      legend: {
        position: 'left',
        offsetY: 80
      }
    };
  } 
  ngOnInit() {
    this.calculateTotalOrdonnance();
    setTimeout(() => {
      const latlong = dataJson;
      const mapData = mapColor;

      const minBulletSize = 3;
      const maxBulletSize = 70;
      let min = Infinity;
      let max = -Infinity;
      let i;
      let value;
      for (i = 0; i < mapData.length; i++) {
        value = mapData[i].value;
        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
      }

      const maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
      const minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

      const images = [];
      for (i = 0; i < mapData.length; i++) {
        const dataItem = mapData[i];
        value = dataItem.value;

        let square = ((value - min) / (max - min)) * (maxSquare - minSquare) + minSquare;
        if (square < minSquare) {
          square = minSquare;
        }
        const size = Math.sqrt(square / (Math.PI * 8));
        const id = dataItem.code;

        images.push({
          type: 'circle',
          theme: 'light',
          width: size,
          height: size,
          color: dataItem.color,
          longitude: latlong[id].longitude,
          latitude: latlong[id].latitude,
          title: dataItem.name + '</br> [ ' + value + ' ]',
          value: value
        });
      }

      // world-low chart
      AmCharts.makeChart('world-low', {
        type: 'map',
        projection: 'eckert6',
        dataProvider: {
          map: 'worldLow',
          images: images
        },
        export: {
          enabled: true
        }
      });

      const chartDatac = [
        { day: 'Mon', value: 6 },
        { day: 'Tue', value: 9 },
        { day: 'Wed', value: 5 },
        { day: 'Thu', value: 8 },
        { day: 'Fri', value: 9 },
        { day: 'Sat', value: 6 },
        { day: 'Sun', value: 7 }
      ];

      // widget-line-chart
      AmCharts.makeChart('widget-line-chart', {
        type: 'serial',
        addClassNames: true,
        defs: {
          filter: [
            {
              x: '-50%',
              y: '-50%',
              width: '200%',
              height: '200%',
              id: 'blur',
              feGaussianBlur: {
                in: 'SourceGraphic',
                stdDeviation: '30'
              }
            },
            {
              id: 'shadow',
              x: '-10%',
              y: '-10%',
              width: '120%',
              height: '120%',
              feOffset: {
                result: 'offOut',
                in: 'SourceAlpha',
                dx: '0',
                dy: '20'
              },
              feGaussianBlur: {
                result: 'blurOut',
                in: 'offOut',
                stdDeviation: '10'
              },
              feColorMatrix: {
                result: 'blurOut',
                type: 'matrix',
                values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .2 0'
              },
              feBlend: {
                in: 'SourceGraphic',
                in2: 'blurOut',
                mode: 'normal'
              }
            }
          ]
        },
        fontSize: 15,
        dataProvider: chartDatac,
        autoMarginOffset: 0,
        marginRight: 0,
        categoryField: 'day',
        categoryAxis: {
          color: '#fff',
          gridAlpha: 0,
          axisAlpha: 0,
          lineAlpha: 0,
          offset: -20,
          inside: true
        },
        valueAxes: [
          {
            fontSize: 0,
            inside: true,
            gridAlpha: 0,
            axisAlpha: 0,
            lineAlpha: 0,
            minimum: 0,
            maximum: 100
          }
        ],
        chartCursor: {
          valueLineEnabled: false,
          valueLineBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false,
          valueZoomable: false,
          cursorColor: '#fff',
          categoryBalloonColor: '#51b4e6',
          valueLineAlpha: 0
        },
        graphs: [
          {
            id: 'g1',
            type: 'line',
            valueField: 'value',
            lineColor: '#ffffff',
            lineAlpha: 1,
            lineThickness: 3,
            fillAlphas: 0,
            showBalloon: true,
            balloon: {
              drop: true,
              adjustBorderColor: false,
              color: '#ffffff',
              fillAlphas: 0.2,
              bullet: 'round',
              bulletBorderAlpha: 1,
              bulletSize: 5,
              hideBulletsCount: 50,
              lineThickness: 2,
              useLineColorForBulletBorder: true,
              valueField: 'value',
              balloonText: '<span style="font-size:18px;">[[value]]</span>'
            }
          }
        ]
      });
    }, 500);
  }

  // Define calculateTotalOrdonnance method
  calculateTotalOrdonnance() {
    const chartDatac = [
      { day: 'Mon', value: 6 },
      { day: 'Tue', value: 10 },
      { day: 'Wed', value: 5 },
      { day: 'Thu', value: 8 },
      { day: 'Fri', value: 9 },
      { day: 'Sat', value: 6 },
      { day: 'Sun', value: 7 }
    ];
    this.totalOrdonnance = chartDatac.reduce((acc, item) => acc + item.value, 0);
  }

  sales = [
    { title: 'Total Patient', icon: 'icon-user text-c-black', amount: '20', percentage: '67%', progress: 50, design: 'col-md-6' },
    { title: 'Earnings', icon: 'icon-file-text text-c-green', amount: '1240 Dt', percentage: '10%', progress: 10, design: 'col-md-6' },
    { title: 'Total Consultation', icon: 'icon-zap text-c-blue', amount: '45', percentage: '35%', progress: 34, design: 'col-md-12' }
  ];

  card1 = [
    { design: 'border-bottom', number: '2305', text: 'TOTAL COMPTE', icon: 'icon-zap text-c-green' },
    { number: '1030', text: 'TOTAL LOCATION ( PHARMACIE et ETABLISEEMENT )', icon: 'icon-map-pin text-c-blue' }
  ];

  social_card = [
    { design: 'col-md-12', icon: 'fab fa-facebook-f text-primary', amount: '12,281', percentage: '+7.2%', color: 'text-c-green', target: '35,098', progress: 60, duration: '3,539', progress2: 45 },
    { design: 'col-md-6', icon: 'fab fa-twitter text-c-blue', amount: '11,200', percentage: '+6.2%', color: 'text-c-purple', target: '34,185', progress: 50, duration: '4,297', progress2: 48 },
    { design: 'col-md-6', icon: 'fab fa-google-plus-g text-c-red', amount: '14,800', percentage: '+5.7%', color: 'text-c-orange', target: '32,297', progress: 70, duration: '2,634', progress2: 55 }
  ];


  progressing = [
    {
      number: '5',
      amount: '384',
      progress: 70
    },
    {
      number: '4',
      amount: '145',
      progress: 35
    },
    {
      number: '3',
      amount: '24',
      progress: 25
    },
    {
      number: '2',
      amount: '1',
      progress: 10
    },
    {
      number: '1',
      amount: '0',
      progress: 0
    }
  ];


  tables = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      title: 'Dr. Isabella Christensen',
      specialty: 'Cardiologist',
      patient: 'John Doe',
      prescription: [
        { medicament: 'Atorvastatin', duree: '30 jours', posologie: '1 comprimé chaque soir' },
        { medicament: 'Lisinopril', duree: '14 jours', posologie: '1 comprimé chaque matin' }
      ],
      time: '11 MAY 2024 12:56',
      color: 'text-c-green'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      title: 'Dr. Ida Jorgensen',
      specialty: 'Neurologist',
      patient: 'Jane Smith',
      prescription: [
        { medicament: 'Carbamazépine', duree: '60 jours', posologie: '2 comprimés par jour après les repas' },
        { medicament: 'Ibuprofen', duree: '10 jours', posologie: '1 comprimé toutes les 8 heures en cas de douleur' },
        { medicament: 'Ondansétron', duree: 'as needed', posologie: '1 comprimé toutes les 6 heures en cas de nausées' }
        
      ],
      time: '11 MAY 2024 10:35',
      color: 'text-c-red'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      title: 'Dr. Mathilda Andersen',
      specialty: 'Dermatologist',
      patient: 'Michael Johnson',
      prescription: [
        { medicament: 'Hydrocortisone', duree: '14 jours', posologie: 'Appliquer la crème deux fois par jour' },
        { medicament: 'Doxycycline', duree: '30 jours', posologie: '1 comprimé matin et soir après les repas' }
      ],
      time: '9 MAY 2024 17:38',
      color: 'text-c-green'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      title: 'Dr. Karla Soreness',
      specialty: 'Pediatrician',
      patient: 'Emily Davis',
      prescription: [
        { medicament: 'Paracétamol', duree: '7 jours', posologie: '1 cuillère à café toutes les 6 heures si fièvre' },
        { medicament: 'Amoxicilline', duree: '10 jours', posologie: '1 comprimé toutes les 8 heures' }
      ],
      time: '19 MAY 2024 12:56',
      color: 'text-c-red'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      title: 'Dr. Albert Andersen',
      specialty: 'Oncologist',
      patient: 'Robert Brown',
      prescription: [
        { medicament: 'Methotrexate', duree: '28 jours', posologie: '1 comprimé par semaine' },
        { medicament: 'Ondansétron', duree: 'as needed', posologie: '1 comprimé toutes les 6 heures en cas de nausées' }
      ],
      time: '21 JULY 2024 12:56',
      color: 'text-c-green'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      title: 'Dr. Lucia Marino',
      specialty: 'Endocrinologist',
      patient: 'William Turner',
      prescription: [
        { medicament: 'Metformine', duree: '90 jours', posologie: '1 comprimé matin et soir après les repas' },
        { medicament: 'Levothyroxine', duree: 'indéfini', posologie: '1 comprimé chaque matin à jeun' }
      ],
      time: '5 JULY 2024 09:45',
      color: 'text-c-green'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      title: 'Dr. Samuel Lee',
      specialty: 'Orthopedic Surgeon',
      patient: 'Sarah Carter',
      prescription: [
        { medicament: 'Tramadol', duree: '14 jours', posologie: '1 comprimé toutes les 6 heures en cas de douleur' },
        { medicament: 'Ibuprofen', duree: '10 jours', posologie: '1 comprimé trois fois par jour après les repas' }
      ],
      time: '12 AUG 2024 14:20',
      color: 'text-c-red'
    },
    {
      src: 'assets/images/user/avatar-5.jpg',
      title: 'Dr. Vincent Rossi',
      specialty: 'Pulmonologist',
      patient: 'Charlotte Williams',
      prescription: [
        { medicament: 'Salbutamol', duree: 'as needed', posologie: '2 inhalations toutes les 4 à 6 heures si nécessaire' },
        { medicament: 'Fluticasone', duree: 'indéfini', posologie: '1 inhalation deux fois par jour' }
      ],
      time: '20 SEPT 2024 08:15',
      color: 'text-c-green'
    }
  ];
  
  
    // Fonction pour filtrer les tableaux en fonction de la saisie de l'utilisateur
    filteredTables() {
      if (!this.searchText) {
        return this.tables;
      }
      return this.tables.filter(table =>
        table.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    open(content: any, index: number) {
      // Utiliser l'index pour sélectionner la prescription appropriée
      this.selectedPrescription = this.tables[index];
    
      // Ouvrir le modal avec la prescription sélectionnée
      this.modalService.open(content);
    }
    
}  

