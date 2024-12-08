import Stripe from "stripe";

//details about user
export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string; //the ? next to the property declares it as an optional property
    avatar_url?: string;
    billing_address?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
}

//details about the products
export interface Products{
    id: string;
    active?: boolean;
    name?: string;
    image?: string;
    description?: string;
    metadata: Stripe.Metadata;
}

//details about the pricing
export interface Price{
    id: string;
    product_id?: string;
    active?:boolean;
    description?:string;
    unit_amount: number;
    currency?: string;
    type?: Stripe.Price.Type;
    inteval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number | null;
    metadata?: Stripe.Metadata;
    products?: Products;
}

//details about the subscription type
export interface Supbscription{
    id: string;
    user_id: string;
    status?: Stripe.Subscription.Status;
    metadata?: Stripe.Metadata;
    price_id?: string;
    quantity?: number;
    cancel_at_period_end: boolean;
    created: string;
    current_period_start: string;
    current_period_end: string;
    ended_at?: string;
    cancel_at?: string;
    canceled_at: string;
    trial_start?: string;
    trial_end?: string;
    prices?: Price;
}