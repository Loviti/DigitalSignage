import { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useWorkspaceRoutes } from '@modules/workspace/hooks/useWorkspaceRoutes'
import { TbChevronLeft } from 'react-icons/tb'
import { Button } from '@shared/ui/buttons/Button.js'
import { usePlaylistLayout } from '@modules/workspace/modules/playlistLayout/hooks/usePlaylistLayout.js'
import { usePlaylistLayoutEditorStorage } from '@stores/usePlaylistLayoutEditorStorage'
import { useMutation } from '@tanstack/react-query'
import { updatePlaylistLayoutRequest, UpdatePlaylistLayoutRequestData } from '@modules/workspace/modules/playlistLayout/api/requests/updatePlaylistLayoutRequest'
import { useSetPlaylistLayoutQueryData } from '@modules/workspace/modules/playlistLayout/hooks/useSetPlaylistLayoutQueryData'

export const WorkspacePlaylistLayoutEditorLayout = ({ children }: { children: ReactNode }) => {
    const routes = useWorkspaceRoutes()
    const layout = usePlaylistLayout()
    const navigate = useNavigate()
    const { sections, resolution, isModified, initStorage, setInitialLayoutData } = usePlaylistLayoutEditorStorage()

    const setPlaylistLayoutQueryData = useSetPlaylistLayoutQueryData()

    const closeContentManager = async () => {
        await navigate(routes.playlistLayout(layout.id), { replace: true })
    }

    const revertChanges = () => {
        initStorage([...layout.sections], {
            width: layout.resolutionWidth,
            height: layout.resolutionHeight
        }, { ...layout })
    }

    const { mutate, isPending } = useMutation({
        mutationFn: (data: UpdatePlaylistLayoutRequestData) => updatePlaylistLayoutRequest(data),
        onSuccess: async (playlistLayout) => {
            setPlaylistLayoutQueryData(playlistLayout.id, playlistLayout)
            setInitialLayoutData(playlistLayout)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const submit = () => {
        mutate({
            playlistLayoutId: layout.id,
            sections: sections!,
            resolutionHeight: resolution!.height,
            resolutionWidth: resolution!.width
        })
    }

    return (
        <div>
            <header className='flex justify-between items-center bg-neutral-100 sticky top-0 h-[64px]'>
                <Button
                    onClick={ () => closeContentManager() }
                    icon={ TbChevronLeft }
                    size='squareLarge'
                />
                <div className='flex gap-2'>
                    { isModified ? (
                        <>
                            <Button onClick={ revertChanges }>
                                Revert changes
                            </Button>
                            <Button
                                onClick={ submit }
                                disabled={ isPending }
                            >
                                Save
                            </Button>
                        </>
                    ) : (
                        <div className='text-neutral-400'>
                            Saved
                        </div>
                    ) }
                </div>
            </header>
            <div className='flex flex-col max-w-(--breakpoint-xl) mx-auto w-full p-10 gap-5 overflow-hidden'>
                { children }
            </div>
        </div>
    )
}
