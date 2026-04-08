CREATE POLICY "Users can update their own coupons"
ON public.coupons
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);