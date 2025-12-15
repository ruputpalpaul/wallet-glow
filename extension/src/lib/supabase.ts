import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prfrtersryvqqtjpihox.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZnJ0ZXJzcnl2cXF0anBpaG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjg5MDEsImV4cCI6MjA4MDY0NDkwMX0.-rj_P9iIKzgl3ep2ZrzztGDlwWjwNj--yCYNmwCMubA';

export const supabase = createClient(supabaseUrl, supabaseKey);
