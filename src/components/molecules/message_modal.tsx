import React, { Dispatch, SetStateAction } from 'react'
import { Typography, Button, Dialog, Portal } from 'src/components/atoms'

interface Props {
  message: string
  setMessage: Dispatch<SetStateAction<string>>
}

const messageModal: React.FC<Props> = ({ message, setMessage }) => {
  return (
    <Portal>
      <Dialog visible={!!message} onDismiss={() => setMessage('')}>
        <Dialog.Content>
          <Typography>{message}</Typography>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="text" onPress={() => setMessage('')} width={80}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default messageModal
