"use client"



import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns"

import { Skeleton } from "@/components/ui/skeleton";

import Overlay from "./overlay";
import Footer from "./footer";
import Actions from "@/components/actions";


interface BoardCardProps {
    id: string;
    title: string;
    image: string;
    authorId: string;
    authorName: string;
    createdAt: number;
    orgId: string;
    isFavorite: boolean;


}
const BoardCard = ({ id, title, image, authorId, authorName, createdAt, isFavorite, orgId }: BoardCardProps) => {
    const { userId } = useAuth()
    const authorLabel = userId === authorId ? "You" : authorName
    const createdLabel = formatDistanceToNow(createdAt, { addSuffix: true })

    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image src={image} alt={title} fill className="object-fit" />
                    <Overlay />
                    <Actions
                        id={id}
                        title={title}
                        side="right"
                    >
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdLabel={createdLabel}
                    onClick={() => console.log("clicked")}
                    disabled={false}
                />
            </div>
        </Link>
    )
}

export default BoardCard

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="group aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    )
}