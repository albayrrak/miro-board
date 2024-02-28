import Image from 'next/image'
import { useMutation } from 'convex/react'


import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { useOrganization } from '@clerk/nextjs'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from 'sonner'

const EmptyBoards = () => {
    const { organization } = useOrganization()
    const { mutate, pending } = useApiMutation(api.board.create)

    const onClick = () => {
        if (!organization) return


        mutate({
            orgId: organization.id,
            title: "New Board"
        }).then((id) => {
            toast.success('Board created')
        }).catch((error) => {
            toast.error('Failed to create board')
        })
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/note.svg" height={140} width={140} alt="Empty" />
            <h2 className="text-2xl font-semibold mt-6">
                Create your firs board!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your organization
            </p>
            <div className='mt-6'>
                <Button size="lg" onClick={onClick}>
                    Create board
                </Button>
            </div>
        </div>
    )
}

export default EmptyBoards