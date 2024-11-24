import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery: string = '';
  doctors = [
    {
      name: "Dr. John Doe",
      profession: "Clinical Psychologist",
      image: "../../../assets/images/doctora1.jpeg",
      location: "New York, NY",
      rating: 4.8,
      hourlyRate: "$200",
      earnings: "$5000",
      lastMessage: "Looking forward to our meeting.",
      tags: ["Experienced", "Top-rated", "In-demand"]
    },
    {
      name: "Dr. Jane Smith",
      profession: "Psychiatrist",
      image: "../../../assets/images/doctora2.png",
      location: "Los Angeles, CA",
      rating: 4.9,
      hourlyRate: "$250",
      earnings: "$8000",
      lastMessage: "I can help with your needs.",
      tags: ["Experienced", "Top-rated", "In-demand"]
    },
    {
      name: "Dr. David Brown",
      profession: "Psychiatrist",
      image: "../../../assets/images/doctor1.jpeg",
      location: "Chicago, IL",
      rating: 4.7,
      hourlyRate: "$180",
      earnings: "$7000",
      lastMessage: "Book your consultation today!",
      tags: ["Specialized", "Top-rated"]
    },
    {
      name: "Dr. Alice Green",
      profession: "Psychiatrist",
      image: "../../../assets/images/doctora6.jpg",
      location: "San Francisco, CA",
      rating: 4.6,
      hourlyRate: "$150",
      earnings: "$4000",
      lastMessage: "Looking forward to seeing your kids!",
      tags: ["Certified", "Caring", "Experienced"]
    },
    {
      name: "Dr. Michael Johnson",
      profession: "Geriatric Psychiatrist",
      image: "../../../assets/images/doctora8.jpg",
      location: "Miami, FL",
      rating: 4.9,
      hourlyRate: "$220",
      earnings: "$9000",
      lastMessage: "Skin care is my passion!",
      tags: ["Certified", "Experienced", "Skin Specialist"]
    },
    {
      name: "Dr. Olivia White",
      profession: "Geriatric Psychiatrist",
      image: "../../../assets/images/doctora2.png",
      location: "Dallas, TX",
      rating: 4.7,
      hourlyRate: "$150",
      earnings: "$6000",
      lastMessage: "Your smile is in good hands!",
      tags: ["Caring", "Top-rated", "Dental Expert"]
    }
  ];

  modalData: any = null;

  // Open Modal with doctor's detailed information
  openModal(doctor: any) {
    this.modalData = doctor;
  }

  // Close Modal
  closeModal() {
    this.modalData = null;
  }

  // Search and Filter Functions (Dummy Methods for Now)
  searchDoctors() {
    console.log("Searching for: ", this.searchQuery);
  }

  filterBySpecialty() {
    console.log("Filtering by specialty...");
  }

  filterByLocation() {
    console.log("Filtering by location...");
  }

  filterByRating() {
    console.log("Filtering by rating...");
  }
  handlePayment() {
    console.log("Processing payment for Dr. " + this.modalData.name);
    // Add your payment gateway logic here, e.g., Stripe or PayPal integration
  }
}
