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
    operating_hours: {
      opening_hours: string;
      closing_hours: string;
      merchant_id: number;
    }
  };
  
  export type MerchantID = {
    id: number;
    merchant_name: string;
    location_lat: number;
    location_long: number;
    address: string;
    pic_name: string;
    email: string;
    phone_number: string;
    monthly_earning: number;
    total_monthly_order: number;
    staff_scheduled_id: number;
    total_daily_order: number;
    daily_order_cancelled: number;
    daily_order_delivered: number;
    daily_order_active: number;
    daily_earning: number;
    created_at: string;
    updated_at: string;
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
  
  
  
  export type Category = {
    id: number;
    category_name: string;
    menus: Menu[]
  };
  
  export type Menu = {
    product_image: string;
    id: string;
    product_name: string;
    price: string;
    description: string;
    is_reward_menu: boolean;
    category_id: string;
    customization_keys: CustomizationKey[];
  };

  type CustomizationValue = {
    id: string;
    name: string;
    price_adjustment: string;
  };
  
  type CustomizationKey = {
    id: string;
    name: string;
    customization_values: CustomizationValue[] | null;
  };
  

  
  
  type VariantOption = {
    variant_option_id?: string;
    variant_option_name: string;
    price_adjustment: string;
  };
  
  type Variant = {
    variant_id?: string;
    variant_name: string;
    variant_options: VariantOption[];
  };
  
  type Customization = {
    variants: Variant[];
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
    tax: number;
    year: string;
    month: string;
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
      map(arg0: (fee: { name: string; amount: number; }) => string | null): import("react").ReactNode;
      forEach(arg0: (fee: any) => void): unknown;
      name: string;
      id: number;
      amount: number;
    };
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
    total_sales: number;
    total_tax: number;
    total_transaction: number;
    total_product_sold: number;
  };
  
  export type OrderDataById = {
    map(arg0: (order: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
    created_at: string;
    order_date: string;
    pick_up_time: string;
    updated_at: string;
    order_type: string;
    order_pesan_id: string;
    order_code: string;
    seat_number: string;
    order_notes: string;
    order_status: string;
    note_status: string;
    merchant_name: string;
    customer_name: string;
    order_item_response: OrderItem[]
    additional_fees: AdditionalFee[];
    configurations_used: null | any[];
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
    sub_total_product: number;
    voucher_id: number;
    waiting_time: number;
    final_amount: number;
    discount: number;
    id: number;
    staff_scheduled_id: number;
    merchant_id: number;
    customer_id: number;
    is_reward_transaction: boolean;
  }
  
  export type OrderItem = {
    created_at: string;
    updated_at: string;
    product_name: string;
    product_image: string;
    owner_type: string;
    selected_customization: SelectedCustomization[];
    id: number;
    merchant_menu_id: number;
    menu_id: number;
    price: number;
    quantity: number;
    owner_id: number;
  }
  
  export type SelectedCustomization = {
    selected_customization_key: string;
    selected_customization_value: string;
    id: number;
    order_item_id: number;
    price_adjustment: number;
  }
  
  export type AdditionalFee = {
    product_name: string;
    name: string;
    id: number;
    amount: number;
  }
  