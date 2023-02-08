import { createClient } from "@supabase/supabase-js";

// make connection with supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

async function signinUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return error;
  } else {
    return data;
  }
}

export { signinUser };
