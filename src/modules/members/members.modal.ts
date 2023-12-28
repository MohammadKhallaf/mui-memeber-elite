export enum EGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum EMmemberShipType {
  BASIC = 'basic',
  PREMIUM = 'premium',
  VIP = 'vip',
}

export interface IMember {
  id?: string | number;
  name: string;
  email: string;
  phone: string;
  photo_url?: string;
  is_newsletter_subscribe?: boolean;
  id_number: string; // actually it is collection of digits
  gender: EGender;
  address: string;
  date_of_birth: Date;
  // ---------------------------- //
  membership_type: EMmemberShipType;
  membership_start_date: Date;
}
