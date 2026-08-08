import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

const sampleProducts = [
  {
    name: 'ক্লাসিক কটন টি-শার্ট',
    description: 'আরামদায়ক ১০০% কটন টি-শার্ট, দৈনন্দিন ব্যবহারের জন্য পারফেক্ট',
    price: 550,
    category: 'T-Shirt',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['কালো', 'সাদা', 'নেভি ব্লু'],
    images: ['https://via.placeholder.com/400x500'],
    stock: 50,
  },
  {
    name: 'ডেনিম জ্যাকেট',
    description: 'ট্রেন্ডি ডেনিম জ্যাকেট, সব ঋতুর জন্য উপযুক্ত',
    price: 1800,
    category: 'Jacket',
    sizes: ['M', 'L', 'XL'],
    colors: ['লাইট ব্লু', 'ডার্ক ব্লু'],
    images: ['https://via.placeholder.com/400x500'],
    stock: 25,
  },
  {
    name: 'ফরমাল শার্ট',
    description: 'অফিস ও পার্টির জন্য স্মার্ট ফরমাল শার্ট',
    price: 950,
    category: 'Shirt',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['সাদা', 'হালকা নীল'],
    images: ['https://via.placeholder.com/400x500'],
    stock: 40,
  },
];

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .insert(sampleProducts)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: `${data.length} টা প্রোডাক্ট যোগ করা হয়েছে`,
    products: data,
  });
}