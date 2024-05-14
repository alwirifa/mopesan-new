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
  
  export type OrderData = {
    payment: {
      paid_date: string;
      created_at: string;
      updated_at: string;
      status: string;
      payment_method: string;
      payment_url: string;
      token: string;
      order_uid: string;
      id: number;
      customer_id: number;
      payment_amount: number;
    };
    pick_up_time: string;
    order_date: string;
    updated_at: string;
    created_at: string;
    merchant_name: string;
    order_notes: string;
    order_lengkap_id: string;
    order_code: string;
    order_pesan_id: string;
    note_status: string;
    order_status: string;
    order_type: string;
    additional_fees: {
      name: string;
      id: number;
      amount: number;
    }[];
    order_item_response: {
      created_at: string;
      updated_at: string;
      product_name: string;
      product_image: string;
      owner_type: string;
      selected_customization: {
        selected_customization_key: string;
        selected_customization_value: string;
        id: number;
        order_item_id: number;
        price_adjustment: number;
      }[];
      id: number;
      merchant_menu_id: number;
      menu_id: number;
      price: number;
      quantity: number;
      owner_id: number;
    }[];
    staff_scheduled_id: number;
    final_amount: number;
    discount: number;
    sub_total_product: number;
    payment_id: number;
    voucher_id: number;
    total_quantity: number;
    waiting_time: number;
    id: number;
    merchant_id: number;
    customer_id: number;
    is_reward_transaction: boolean;
  };
  
  