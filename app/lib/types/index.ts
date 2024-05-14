export type Merchant = {
    value: any;
    id: number;
    merchant_name: string;
    address: string;
    email: string;
    phone_number: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    is_open: boolean;
  };

export type Banner = {
    created_at: string;
    updated_at: string;
    banner_name: string;
    banner_image: string;
    description: string;
    id: number;
    is_active: boolean;
};

export type Menu = {
    id: number;
    product_name: string;
    price: number;
    description: string;
    product_code: string;
    product_image: string;
};

export type Category = {
    id: number;
    category_name: string;
    menus: Menu[];
};

export type Customer = {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  location_lat: number;
  location_long: number;
  google_uid: string;
  profile_image: string;
  stamp_count: number;
  last_stamp_date: string;
  rewards_redeemed_count: number;
  monthly_spend_amount: number;
  created_at: string;
  updated_at: string;
};


export type Voucher = {
    id: number;
    voucher_name: string;
    description: string;
    code: string;
    minimum_order: number;
    valid_from: string;
    valid_until: string;
    merchant_id: number;
    value: number;
    type_voucher: string;
    max_discount: number;
    total_voucher_number: number;
    voucher_used_count: number;
    created_at: string;
    updated_at: string;
  };

 export type Admin = {
    id: number;
    name: string;
    email: string;
    permission: string;
    is_active: boolean;
    last_login: string;
    created_at: string;
    updated_at: string;
  };
  
  