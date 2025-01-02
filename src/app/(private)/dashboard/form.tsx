"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { onNewTweetSubmit } from "@/app/(private)/dashboard/actions";
import { newTweetSchema } from "@/app/(private)/schema";
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
    defaultValues: { user: userId, body: "" },
  });

  async function onSubmit(values: z.infer<typeof newTweetSchema>) {
    const res = await onNewTweetSubmit(values);
    if (res.success) form.reset();
    else form.setError("root", { message: res.error });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
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
