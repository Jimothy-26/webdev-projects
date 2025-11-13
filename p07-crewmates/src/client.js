import { createClient } from '@supabase/supabase-js';

const URL = 'https://mntjhprnusqvvtdquerd.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1udGpocHJudXNxdnZ0ZHF1ZXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDAyNjEsImV4cCI6MjA3ODYxNjI2MX0.SmpsTF3ZuRY8ZHzod6jW6ah0Myqs_81rXT106cL6J30';

export const supabase = createClient(URL, API_KEY);