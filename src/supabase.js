
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xwowtryiygurjryyoffu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3b3d0cnlpeWd1cmpyeXlvZmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0MDg1NDAsImV4cCI6MjAxMDk4NDU0MH0.YGwHe6JFq0_UKrq2Po81aG_W0eOFMgkN8MrSYXyLwzs';
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase