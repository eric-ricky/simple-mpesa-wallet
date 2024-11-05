"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { initiateMpesaPayment } from '@/lib/mpesa';
import { addTransaction } from '@/lib/wallet-storage';

const formSchema = z.object({
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(12, "Phone number must not exceed 12 digits")
    .regex(/^(?:254|\+254|0)?([71](?:(?:0[0-8])|(?:[12][0-9])|(?:9[0-9])|(?:4[0-36-9])|(?:5[0-7])|(?:6[0-7])|(?:8[0-2])|(?:3[0-9]))[0-9]{6})$/, "Invalid Safaricom number"),
  amount: z.string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 10, "Minimum amount is KES 10")
    .refine((val) => !isNaN(Number(val)) && Number(val) <= 150000, "Maximum amount is KES 150,000"),
});

export default function TopUpForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      amount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await initiateMpesaPayment(
        values.phoneNumber,
        Number(values.amount)
      );

      if (response.success) {
        const transaction = {
          id: crypto.randomUUID(),
          type: 'DEPOSIT' as const,
          amount: Number(values.amount),
          timestamp: new Date().toISOString(),
          status: 'COMPLETED' as const,
          reference: response.reference,
        };

        addTransaction(transaction);
        toast.success("Top-up successful!");
        form.reset();
        window.dispatchEvent(new Event('wallet-updated'));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Up Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="254712345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (KES)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Top Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}