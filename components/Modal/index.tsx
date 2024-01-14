import React from 'react'
import { GrClose } from 'react-icons/gr'

interface ModalProps {
  children?: React.ReactNode
  onClose?: () => void
  title?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ children, onClose, title }) => {
  return (
    <div className="w-full top-0 left-0 min-h-screen backdrop-blur-sm fixed z-10 flex items-center justify-center ">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-background text-foreground border rounded-lg shadow-xl relative">
        {title && <div className="text-2xl capitalize mb-2">{title}</div>}
        {onClose && (
          <div
            className="absolute top-2 right-2 p-2 rounded-full cursor-pointer"
            onClick={onClose}
          >
            <GrClose />
          </div>
        )}
        <div className="max-w-md mx-auto space-y-6">{children}</div>
      </div>
    </div>
  )
}

export default Modal
