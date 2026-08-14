import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// সব প্রোডাক্ট আনার জন্য (GET request)
export async function GET() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// নতুন প্রোডাক্ট যোগ করার জন্য (POST request)
export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from('products')
    .insert([body])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}