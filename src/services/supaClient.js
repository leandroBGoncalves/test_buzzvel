
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://sfigdzqnlktzboamfdrl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmaWdkenFubGt0emJvYW1mZHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk0NDkyMTEsImV4cCI6MTk5NTAyNTIxMX0.2HQQyNEIHAwXMddL4WdgT8qgBLRLckitnz5ypdgioMI'
export const supabase = createClient(supabaseUrl, supabaseKey)