import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log('=== DEBUG === URL:', supabaseUrl);
console.log('=== DEBUG === Key starts with:', supabaseServiceKey?.substring(0, 15));

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);