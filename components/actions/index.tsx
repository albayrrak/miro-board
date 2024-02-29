"use client"


import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";


interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps['side'];
    sideOffset?: DropdownMenuContentProps['sideOffset'];
    id: string;
    title: string;

}

const Actions = ({ children, id, title, side, sideOffset }: ActionsProps) => {

    const onCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            toast.success(`Link to ${title} copied to clipboard`)
        } catch (error) {
            toast.error("Failed to copy link to clipboard")
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={onCopyLink}
                >
                    <Link2 className="h-4 w-4 mr-2 " />
                    Copy board link
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Actions