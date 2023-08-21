"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteThreadProps {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

const DeleteThread = ({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: DeleteThreadProps) => {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/")
    return null;

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Image
            src="/assets/delete.svg"
            alt="delete"
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
            <AlertDialogDescription>
              This action cannot be undone. This will
              permanently delete your thread.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteThread(
                  JSON.parse(threadId),
                  pathname
                );
                if (!parentId || !isComment) {
                  router.push("/");
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteThread;
