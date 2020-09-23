import React, { Dispatch, SetStateAction } from 'react'
import { Typography, Button, Dialog, Portal, Box } from 'src/components/atoms'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'

interface Props {
  message: string | string[]
  setMessage: Dispatch<SetStateAction<string | string[]>>
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
        <Box p={2}>
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
          {Array.isArray(message) ? (
            message.map((each, index) => (
              <Typography
                mb={3}
                textAlign="center"
                key={index}
                data-testid={`message-${index}`}
              >
                {each}
              </Typography>
            ))
          ) : (
            <Typography mb={3} textAlign="center">
              {message}
            </Typography>
          )}
          <Button
            onPress={() => setMessage('')}
            width={1}
            color="accent"
            labelStyle={{ color: theme.colors.custom.white }}
          >
            Ok
          </Button>
        </Box>
      </Dialog>
    </Portal>
  )
}

export default MessageModal
