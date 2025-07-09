import { useWorkspace } from '@modules/workspace/hooks/useWorkspace'
import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router'
import { WorkspaceFile } from '../types'

export const useFileViewerModal = () => {
    const location = useLocation()
    const [modalFile, setModalFile] = useState<WorkspaceFile | null>(null)
    const [previousUrl, setPreviousUrl] = useState<string | null>(null)
    const { slug } = useWorkspace()

    const openModal = (file: WorkspaceFile) => {
        setPreviousUrl(location.pathname + location.search)
        setModalFile(file)

        const newUrl = `/workspaces/${slug}/files/${file.id}`

        window.history.pushState(null, '', newUrl)
    }

    const closeModal = useCallback(() => {
        setModalFile(null)
        
        if (previousUrl) {
            window.history.pushState(null, '', previousUrl)
            setPreviousUrl(null)
        }
    }, [previousUrl])

    useEffect(() => {
        const handlePopState = () => {
            if (modalFile) {
                closeModal()
            }
        }

        window.addEventListener('popstate', handlePopState)
        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [closeModal, modalFile])

    return {
        modalFile,
        openModal,
        closeModal
    }
} 