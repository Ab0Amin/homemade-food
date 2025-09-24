-- Function to upgrade user to vendor
CREATE OR REPLACE FUNCTION public.upgrade_to_vendor(
  user_id uuid,
  business_name_param text,
  business_description_param text,
  business_license_param text DEFAULT NULL,
  website_url_param text DEFAULT NULL
) RETURNS void AS $$
BEGIN
  UPDATE public.users 
  SET 
    user_type = 'vendor',
    business_name = business_name_param,
    business_description = business_description_param,
    business_license = business_license_param,
    website_url = website_url_param,
    metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object(
      'vendor_upgrade_timestamp', now(),
      'business_fields_completed', true
    ),
    updated_at = now()
  WHERE id = user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.upgrade_to_vendor TO authenticated;