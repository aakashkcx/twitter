"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createTweet } from "@/app/(private)/actions";
import { tweetSchema } from "@/app/(private)/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function TweetForm({
  parent,
  placeholder,
}: {
  parent?: number;
  placeholder?: string;
}) {
  const form = useForm<z.infer<typeof tweetSchema>>({
    resolver: zodResolver(tweetSchema),
    defaultValues: { body: "", parent },
  });

  async function onSubmit(values: z.infer<typeof tweetSchema>) {
    const res = await createTweet(values);
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
                <Textarea placeholder={placeholder} {...field} />
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
