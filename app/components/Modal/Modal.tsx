// 'use client'
// import {
//   forwardRef,
//   ReactNode,
//   useEffect,
//   useImperativeHandle,
//   useRef,
//   useState,
//   useCallback
// } from 'react'
// import { createPortal } from 'react-dom'
// import Close from '../Icons/Close'
// import './Modal.sass'
// import { useGSAP } from '@gsap/react'
// import gsap from 'gsap'
//
// interface IPortal {
//   footer: ReactNode
//   header: string
//   body: ReactNode
//   activeButton: ReactNode
// }
//
// interface PortalHandle {
//   toggleModal: () => void
//   closeModal: () => void
//   openModal: () => void
// }
//
// const PortalCustom = forwardRef<PortalHandle, IPortal>((props, ref) => {
//   const { header, footer, body, activeButton } = props
//   const [isMount, setIsMount] = useState(false)
//   const [showModal, setShowModal] = useState(false)
//
//   const containerRef = useRef<HTMLDivElement>(null)
//   const { contextSafe } = useGSAP({ scope: containerRef })
//
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const handleClickChangeStateModalWindow = useCallback(contextSafe(() => {
//     setShowModal(prev => !prev)
//   }), [contextSafe]);
//
//   useEffect(() => {
//     setIsMount(true)
//   }, [])
//
//   useGSAP(() => {
//     const modal = containerRef.current?.querySelector('.modal');
//     const container = containerRef.current?.querySelector('.modal__container');
//
//     if (modal && container) {
//       if (showModal) {
//         gsap.to(modal, { opacity: 1, zIndex: 2, duration: 0.3 });
//         gsap.to(container, { scale: 1, duration: 0.3 });
//       } else {
//         gsap.to(modal, { opacity: 0, duration: 0.3 });
//         gsap.to(modal, { zIndex: -1, delay: 0.3, duration: 0.3 });
//         gsap.to(container, { scale: 0, duration: 0.3 });
//       }
//     }
//   }, [showModal]);
//
//   useImperativeHandle(ref, () => ({
//     toggleModal() {
//       handleClickChangeStateModalWindow()
//     },
//     closeModal() {
//       setShowModal(false)
//     },
//     openModal() {
//       setShowModal(true)
//     },
//   }))
//
//   if (!isMount || typeof document === 'undefined') return null;
//
//   return (
//     <>
//       <div onClick={() => handleClickChangeStateModalWindow()}>
//         {activeButton}
//       </div>
//       {createPortal(
//         <div ref={containerRef} className='modal'>
//           <div className='modal__container'>
//             <div className='modal__header'>
//               <h2 className='mb-3 text-heading-6'>{header}</h2>
//               <button onClick={() => handleClickChangeStateModalWindow()}>
//                 <Close width='24' height='24' className='text-error-main' />
//               </button>
//             </div>
//             <div className='modal__body'>{body}</div>
//             <div className='modal__footer'>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className='w-24 rounded-sm border border-primary-main px-4 py-3 text-primary-main hover:bg-primary-hover hover:text-main-gray-50'
//               >
//                 Close
//               </button>
//               {footer}
//             </div>
//           </div>
//         </div>,
//         document.body
//       )}
//     </>
//   )
// });
//
// PortalCustom.displayName = 'PortalCustom';
//
// export default PortalCustom;
