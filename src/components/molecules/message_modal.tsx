import React, { Dispatch, SetStateAction } from 'react'
import { Typography, Button, Dialog, Portal, Box } from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'

interface Props {
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  error?: boolean
  success?: boolean
  warning?: boolean
}

const MessageModal: React.FC<Props> = ({
  message,
  setMessage,
  error,
  success,
  warning
}) => {
  const theme = useTheme()

  return (
    <Portal>
      <Dialog visible={!!message} onDismiss={() => setMessage('')}>
        <Dialog.Content>
          {error && (
            <Box width={1} flexDirection="row" justifyContent="center" mb={3}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                color={theme.colors.custom.danger}
                size={64}
              />
            </Box>
          )}
          {success && (
            <Box width={1} flexDirection="row" justifyContent="center" mb={3}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                color={theme.colors.custom.success}
                size={64}
              />
            </Box>
          )}
          {warning && (
            <Box width={1} flexDirection="row" justifyContent="center" mb={3}>
              <MaterialCommunityIcons
                name="alert-outline"
                color={theme.colors.custom.warning}
                size={64}
              />
            </Box>
          )}
          <Typography textAlign="center">{message}</Typography>
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

export default MessageModal
