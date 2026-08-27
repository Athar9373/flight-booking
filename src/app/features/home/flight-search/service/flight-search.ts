import { computed, Service, signal } from '@angular/core';
import { AirportType, CabinOption, FareFilterCategory, TripTypeOption } from '../../model/types';

@Service()
export class FlightSearchService {
  readonly cabinOption: CabinOption[] = [
    {
      id: 1,
      name: 'Economy/Premium Economy',
      features: [],
      icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/cabin_seat_3d_economy.png',
    },
    {
      id: 2,
      name: 'Premium Economy',
      features: [
        {
          feature: 'Extra Legroom',
          icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/blue_seat_icon.png',
        },
        {
          feature: 'Extra Baggage',
          icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/blue_baggage_icon.png',
        },
        {
          feature: 'Premium Meals',
          icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/blue_meal_bowl_icon.png',
        },
      ],
      icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/cabin_seat_3d_premium_economy.png',
    },
    {
      id: 3,
      name: 'Business Class',
      features: [
        {
          feature: 'Luxury Lounges',
          icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/blue_seat_partial_recline_icon.png',
        },
        {
          feature: 'Cabin Comfort',
          icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/blue_seat_full_recline_icon.png',
        },
        {
          feature: 'Premium Dining',
          icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/blue_premium_dining_icon.png',
        },
      ],
      icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/cabin_seat_3d_business.png',
    },
    {
      id: 4,
      name: 'First Class',
      features: [
        {
          feature: 'Private Suites',
          icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/blue_private_suite_bed_icon.png',
        },
        {
          feature: 'Fine Dining',
          icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/blue_glass_drink_icon.png',
        },
        {
          feature: 'Highly Personalised Service',
          icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/blue_assistant_icon.png',
        },
      ],
      icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/cabin_seat_3d_first.png',
    },
  ];

  readonly Economyfare = signal<FareFilterCategory[]>([
    {
      id: 'Regular',
      title: 'Regular',
      subtitle: 'Regular fares',
      badge: null,
      hoverContent: '',
    },
    {
      id: 'Student',
      title: 'Student',
      subtitle: 'Extra discounts/baggage',
      badge: null,
      hoverContent:
        'Applicable only for students above 12 years of age. Valid student ID cards and student visas (where applicable) are required to avail this.',
    },
    {
      id: 'Armed Forces',
      title: 'Armed Forces',
      subtitle: 'Up to USD 6.30 off',
      badge: null,
      hoverContent:
        'Applicable only for serving/retired Indian Armed Forces personnel & their dependents. A valid Armed Forces ID or dependent card is required at the airport to avail this.',
    },
    {
      id: 'GST',
      title: 'Have a GST number ?',
      subtitle: 'Lower cancellation charges',
      badge: 'NEW',
      hoverContent:
        'Applicable only for GST-registered businesses. A valid GST number is required to claim GST benefits on the booking.',
    },
    {
      id: 'Senior Citizen',
      title: 'Senior Citizen',
      subtitle: 'Up to USD 6.30 off',
      badge: null,
      hoverContent:
        'Applicable only for senior citizens above the age of 60 years. A valid proof of Date of Birth is required at the airport to avail this.',
    },
    {
      id: 'Doctor and Nurses',
      title: 'Doctor and Nurses',
      subtitle: 'Up to USD 6.30 off',
      badge: null,
      hoverContent:
        'Applicable only for medical personnel. A valid ID is required at the airport to avail this.',
    },
  ]);

  readonly otherClassFares = signal([
    {
      id: 'Regular',
      title: 'Regular',
      subtitle: 'Regular fares',
      badge: null,
      hoverContent: '',
    },

    {
      id: 'GST',
      title: 'Have a GST number?',
      subtitle: 'Lower cancellation charges',
      badge: 'NEW',
      hoverContent:
        'Applicable only for GST-registered businesses. A valid GST number is required to claim GST benefits on the booking.',
    },
  ]);

  selectedCabinClass = signal<CabinOption>({
    id: 1,
    name: 'Economy/Premium Economy',
    features: [],
    icon: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/cabin_seat_3d_economy.png',
  });

  airports: AirportType[] = [
    {
      code: 'DEL',
      name: 'New Delhi',
      airport: 'Indira Gandhi International Airport',
    },
    {
      code: 'BOM',
      name: 'Mumbai',
      airport: 'Chhatrapati Shivaji Maharaj International Airport',
    },
    {
      code: 'BLR',
      name: 'Bengaluru',
      airport: 'Kempegowda International Airport',
    },
    {
      code: 'MAA',
      name: 'Chennai',
      airport: 'Chennai International Airport',
    },
    {
      code: 'CCU',
      name: 'Kolkata',
      airport: 'Netaji Subhash Chandra Bose International Airport',
    },
    {
      code: 'HYD',
      name: 'Hyderabad',
      airport: 'Rajiv Gandhi International Airport',
    },
    {
      code: 'GOI',
      name: 'Goa',
      airport: 'Manohar International Airport / Dabolim',
    },
    {
      code: 'PNQ',
      name: 'Pune',
      airport: 'Pune International Airport',
    },
    {
      code: 'AMD',
      name: 'Ahmedabad',
      airport: 'Sardar Vallabhbhai Patel International Airport',
    },
    {
      code: 'COK',
      name: 'Kochi',
      airport: 'Cochin International Airport',
    },
    {
      code: 'JAI',
      name: 'Jaipur',
      airport: 'Jaipur International Airport',
    },
    {
      code: 'IXC',
      name: 'Chandigarh',
      airport: 'Chandigarh International Airport',
    },
    {
      code: 'LKO',
      name: 'Lucknow',
      airport: 'Chaudhary Charan Singh International Airport',
    },
    {
      code: 'PAT',
      name: 'Patna',
      airport: 'Jay Prakash Narayan Airport',
    },
    {
      code: 'GAU',
      name: 'Guwahati',
      airport: 'Lokpriya Gopinath Bordoloi International Airport',
    },
    {
      code: 'VNS',
      name: 'Varanasi',
      airport: 'Lal Bahadur Shastri International Airport',
    },
    {
      code: 'SXR',
      name: 'Srinagar',
      airport: 'Sheikh ul-Alam International Airport',
    },
    {
      code: 'IXB',
      name: 'Bagdogra',
      airport: 'Bagdogra Airport',
    },
    {
      code: 'BBI',
      name: 'Bhubaneswar',
      airport: 'Biju Patnaik International Airport',
    },
    {
      code: 'TRV',
      name: 'Thiruvananthapuram',
      airport: 'Thiruvananthapuram International Airport',
    },
  ];

  fromCity = signal<AirportType>({
    code: 'DEL',
    name: 'New Delhi',
    airport: 'Indira Gandhi International Airport',
  });

  toCity = signal<AirportType>({
    code: 'PNQ',
    name: 'Pune',
    airport: 'Pune International Airport',
  });

  adultsCount = signal<number>(1);
  childrenCount = signal<number>(0);
  infantsCount = signal<number>(0);
  totalCount = computed(() => this.adultsCount() + this.childrenCount() + this.infantsCount());
  selectedFare = signal<string>(this.Economyfare()[0].id);
  tripType = signal<TripTypeOption>('one-way');
  isHidden = signal<boolean>(false);

  startDate = signal<Date>(new Date());
  endDate = signal<Date | null>(null);

  onSearch() {
    console.log({
      'Trip Type': this.tripType(),
      'to City': this.toCity(),
      'From City': this.fromCity(),
      'Departure Date': this.startDate(),
      'Return Date': this.endDate(),
      'Traveller Count': this.totalCount(),
      'Cabin Class': this.selectedCabinClass(),
      'Special Fare': this.selectedFare(),
    });
  }
}
