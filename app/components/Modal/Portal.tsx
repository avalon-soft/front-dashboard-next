'use client'
import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from 'react'
import { createPortal } from 'react-dom'
import Close from '../Icons/Close'
import './Modal.sass'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface IPortal {
  children: ReactNode
}

interface PortalHandle {
  toggleModal: () => void
  closeModal: () => void
  openModal: () => void
}

const Modal = forwardRef<PortalHandle, IPortal>(({ children }, ref) => {
  const [isMount, setIsMount] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP({ scope: containerRef })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickChangeStateModalWindow = useCallback(
    contextSafe(() => {
      setShowModal((prev) => !prev)
    }),
    [contextSafe]
  )

  useEffect(() => {
    setIsMount(true)
  }, [])

  useGSAP(() => {
    const modal = document?.querySelector('.modal')
    const container = document?.querySelector('.modal__container')
    if (modal && container) {
      if (showModal) {
        gsap.to(modal, { opacity: 1, zIndex: 2, duration: 0.3 })
        gsap.to(container, { scale: 1, duration: 0.3 })
      } else {
        gsap.to(modal, { opacity: 0, duration: 0.3 })
        gsap.to(modal, { zIndex: -1, delay: 0.3, duration: 0.3 })
        gsap.to(container, { scale: 0, duration: 0.3 })
      }
    }
  }, [showModal])

  useImperativeHandle(ref, () => ({
    toggleModal() {
      handleClickChangeStateModalWindow()
    },
    closeModal() {
      setShowModal(false)
    },
    openModal() {
      setShowModal(true)
    },
  }))

  if (!isMount || typeof document === 'undefined') return null

  return (
    <>
      {createPortal(
        <div ref={containerRef} className='modal'>
          <div className='modal__container'>{children}</div>
        </div>,
        document.body
      )}
    </>
  )
})

Modal.displayName = 'Modal'

export default Modal
