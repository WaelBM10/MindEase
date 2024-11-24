import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importer NgbModal
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/theme/shared/shared.module';

interface Payment {
  montant: number;
  datePaiement:string;
  methodePaiement: string;
  statutPaiement: 'en cours' | 'réussi' | 'échoué';
  numeroTransaction: string;
  consultationId?: string;
  commentaire?: string;
}

@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PayementComponent {
  @ViewChild('profileModal') profileModal: any;
  selectedpayement: Payment | null = null;
  newPayment: Payment = {} as Payment;
  payments: Payment[] = [
      {datePaiement:'10/10/2024',
        montant: 8765432,
        methodePaiement: 'Wise',
        statutPaiement: 'réussi',
        numeroTransaction: '0158446',
        consultationId: '1',
        commentaire: 'done',
      }, 
      {
        datePaiement: '10/12/2024',
        montant: 4567890,
        methodePaiement: 'Carte de crédit',
        statutPaiement: 'réussi',
        numeroTransaction: '0158447',
        consultationId: '2',
        commentaire: 'completed',
      },
      {
        datePaiement: '10/15/2024',
        montant: 1234567,
        methodePaiement: 'Virement bancaire',
        statutPaiement: 'en cours',
        numeroTransaction: '0158448',
        consultationId: '3',
        commentaire: 'pending verification',
      },
      {
        datePaiement: '10/18/2024',
        montant: 9876543,
        methodePaiement: 'Espèces',
        statutPaiement: 'réussi',
        numeroTransaction: '0158449',
        consultationId: '4',
        commentaire: 'processed successfully',
      },
      {
        datePaiement: '10/20/2024',
        montant: 5678901,
        methodePaiement: 'PayPal',
        statutPaiement: 'échoué',
        numeroTransaction: '0158450',
        consultationId: '5',
        commentaire: 'insufficient funds',
      },
      {
        datePaiement: '10/22/2024',
        montant: 3456789,
        methodePaiement: 'Générale',
        statutPaiement: 'réussi',
        numeroTransaction: '0158451',
        consultationId: '6',
        commentaire: 'done',
      },
      {
        datePaiement: '10/25/2024',
        montant: 2345678,
        methodePaiement: 'Chèque',
        statutPaiement: 'en cours',
        numeroTransaction: '0158452',
        consultationId: '7',
        commentaire: 'awaiting clearance',
      },
      {
        datePaiement: '10/28/2024',
        montant: 8765432,
        methodePaiement: 'Carte de crédit',
        statutPaiement: 'réussi',
        numeroTransaction: '0158453',
        consultationId: '8',
        commentaire: 'approved',
      },
      {
        datePaiement: '10/30/2024',
        montant: 4567890,
        methodePaiement: 'Espèces',
        statutPaiement: 'échoué',
        numeroTransaction: '0158454',
        consultationId: '9',
        commentaire: 'error in processing',
      },
      {
        datePaiement: '01/11/2024',
        montant: 7890123,
        methodePaiement: 'Virement bancaire',
        statutPaiement: 'réussi',
        numeroTransaction: '0158455',
        consultationId: '10',
        commentaire: 'success',
      },
      {
        datePaiement: '05/11/2024',
        montant: 1230987,
        methodePaiement: 'PayPal',
        statutPaiement: 'en cours',
        numeroTransaction: '0158456',
        consultationId: '11',
        commentaire: 'processing',
      },
       // Initialisation des paiements filtrés
    ];
  
    filteredPayments: Payment[] = [...this.payments];
  constructor(private modalService: NgbModal, private toastr: ToastrService) {}

  // Filtrage par date de paiment
  onFilterByAmount(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterPayments(inputValue, '', '');  // Filtrer uniquement par montant
  }

  // Filtrage par méthode de paiement
  onFilterByMethod(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterPayments('', inputValue, '');  // Filtrer uniquement par méthode de paiement
  }

  onFilterByStatus(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filterPayments('',  '',inputValue);  // Filtrer uniquement par méthode de paiement
  }

  // Filtrage des paiements
  filterPayments(date: string, method: string, status: string): void {
    this.filteredPayments = this.payments.filter(payment =>
      (date ? payment.datePaiement.toString().includes(date) : true) &&
      (method ? payment.methodePaiement.toLowerCase().includes(method.toLowerCase()) : true) &&
      (status ? payment.statutPaiement.toLowerCase().includes(status.toLowerCase()) : true)
    );
  }

  // Ouvrir le modal avec les détails d'un paiement
  openModal(modalType: string, payment: Payment): void {
    this.selectedpayement = payment;
    if (modalType === 'view') {
      this.modalService.open(this.profileModal); // Ouvrir le modal pour voir le paiement
    }
  }

  // Méthode d'ajout de paiement (à implémenter si nécessaire)
  openAddPaymentModal(): void {
    // Implémenter cette méthode pour ouvrir un modal d'ajout de paiement
  }
}
