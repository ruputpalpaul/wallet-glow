import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prfrtersryvqqtjpihox.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZnJ0ZXJzcnl2cXF0anBpaG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjg5MDEsImV4cCI6MjA4MDY0NDkwMX0.-rj_P9iIKzgl3ep2ZrzztGDlwWjwNj--yCYNmwCMubA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log("1. Attempting to insert test row...");
    const { data: insertData, error: insertError } = await supabase
        .from('items')
        .insert({
            user_id: 'test_connectivity_agent',
            url: 'https://example.com/test-impulse',
            price: 99.99,
            timestamp: Date.now(),
            bypassed: false
        })
        .select();

    if (insertError) {
        console.error("❌ Insert Failed:", insertError.message);
        console.error("Details:", insertError);
        process.exit(1);
    }
    console.log("✅ Insert Successful:", insertData);

    console.log("2. Attempting to read back test row...");
    const { data: selectData, error: selectError } = await supabase
        .from('items')
        .select('*')
        .eq('user_id', 'test_connectivity_agent');

    if (selectError) {
        console.error("❌ Read Failed:", selectError.message);
        process.exit(1);
    }
    console.log("✅ Read Successful:", selectData);

    console.log("3. Cleaning up test row...");
    const { error: deleteError } = await supabase
        .from('items')
        .delete()
        .eq('user_id', 'test_connectivity_agent');

    if (deleteError) {
        console.error("⚠️ Cleanup Failed (non-critical):", deleteError.message);
    } else {
        console.log("✅ Cleanup Successful");
    }
}

testConnection();
