import { createClient } from '@supabase/supabase-js';

const URL = 'https://cdggziqbdpsxjtjgbpjc.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZ2d6aXFiZHBzeGp0amdicGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzA2MzIsImV4cCI6MjA3OTE0NjYzMn0.qCEzqO4MD8T9OmuGZqdbQ_85DEPYLlODtXhQ1GImi3o';

export const supabase = createClient(URL, API_KEY);