import clsx from 'clsx'
import React, { FC, ReactNode } from 'react'

interface NotificationProps {
  title: ReactNode
  message?: ReactNode
  onClose: () => void
  variant?: 'success' | 'warning' | 'danger' | 'info'
}

const Notification: FC<NotificationProps> = ({
  title,
  message,
  onClose,
  variant
}) => {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <div
          className={clsx(
            'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-background text-white border shadow-lg ring-1 ring-black ring-opacity-5',
            {
              'bg-blue-600': variant === 'info',
              'bg-red-600': variant === 'danger',
              'bg-yellow-600': variant === 'warning',
              'bg-green-600': variant === 'success'
            }
          )}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification
