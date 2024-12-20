"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { newTweetSchema } from "@/app/dashboard/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function NewTweetForm({ userId }: { userId: number }) {
  const form = useForm<z.infer<typeof newTweetSchema>>({
    resolver: zodResolver(newTweetSchema),
  });

  function onSubmit(values: z.infer<typeof newTweetSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-3 flex-col"
      >
        <input type="hidden" name="user" value={userId} />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="What is happening?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Tweet</Button>
      </form>
    </Form>
  );
}
