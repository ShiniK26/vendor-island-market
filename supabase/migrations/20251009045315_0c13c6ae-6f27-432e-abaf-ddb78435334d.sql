-- Fix security warning by setting search_path for generate_user_display_id function
CREATE OR REPLACE FUNCTION public.generate_user_display_id()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'USR' || LPAD(FLOOR(RANDOM() * 1000000000)::TEXT, 9, '0');
END;
$$;