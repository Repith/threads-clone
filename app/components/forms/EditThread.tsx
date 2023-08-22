"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname } from "next/navigation";

import { CommentValidation } from "@/lib/validations/thread";
import { editThread } from "@/lib/actions/thread.actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EditThreadProps {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
  authorId: string;
  content: string;
}

const EditThread = ({
  threadId,
  currentUserImg,
  content,
  authorId,
  currentUserId,
}: EditThreadProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [threadContent, setThreadContent] =
    useState(content);

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: threadContent,
    },
  });

  useEffect(() => {
    form.setValue("thread", threadContent);
  }, [threadContent, form]);

  const onSubmit = async (
    values: z.infer<typeof CommentValidation>
  ) => {
    await editThread(JSON.parse(threadId), values.thread);

    setThreadContent((prevContent) => values.thread);

    form.reset({ thread: values.thread });
    router.push(pathname);
  };

  if (currentUserId !== authorId || pathname === "/")
    return null;

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Image
            src="/assets/edit.svg"
            alt="edit"
            width={18}
            height={18}
            className="cursor-pointer object-contain"
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure?
            </AlertDialogTitle>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start gap-10"
              >
                {/* Edit */}
                <FormField
                  control={form.control}
                  name="thread"
                  render={({ field }) => (
                    <FormItem className="flex items-center w-full gap-3">
                      <FormLabel>
                        <Image
                          src={currentUserImg}
                          alt="Profile image"
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      </FormLabel>
                      <FormControl className="border-none bg-transparent">
                        <Input
                          type="text"
                          className="no-focus text-light-1 outline-none"
                          value={threadContent}
                          onChange={(e) =>
                            setThreadContent(e.target.value)
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    type="submit"
                    className="comment-form_btn"
                  >
                    Edit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditThread;
