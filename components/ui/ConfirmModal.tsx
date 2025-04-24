'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

type ConfirmModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
  title = 'אישור פעולה',
  description = 'האם אתה בטוח שברצונך להמשיך?',
  confirmText = 'אישור',
  cancelText = 'ביטול',
}: ConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <p className="text-sm text-gray-600">מוחק את המשתמש...</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <div className="text-sm text-gray-600">{description}</div>

            <DialogFooter className="mt-4 flex justify-end gap-2 flex-row-reverse">
              <Button variant="destructive" onClick={onConfirm}>
                {confirmText}
              </Button>
              <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
