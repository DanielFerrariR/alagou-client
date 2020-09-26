import React, { useState, useMemo, Dispatch, SetStateAction } from 'react'
import {
  Box,
  Typography,
  Portal,
  Dialog,
  Button,
  TextInput,
  TouchableOpacity
} from 'src/components/atoms'
import { useTheme } from 'react-native-paper'
import { formatDate } from 'src/utils'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform } from 'react-native'

interface Props {
  openDatePickerModal: boolean
  setOpenDatePickerModal: Dispatch<SetStateAction<boolean>>
  dateRange: { startDate: Date; endDate: Date }
  setDateRange: Dispatch<SetStateAction<{ startDate: Date; endDate: Date }>>
}

const DateRangePickerModal: React.FC<Props> = ({
  openDatePickerModal,
  setOpenDatePickerModal,
  dateRange,
  setDateRange
}) => {
  const theme = useTheme()
  const [openStartDateModal, setOpenStartDateModal] = useState(false)
  const [openEndDateModal, setOpenEndDateModal] = useState(false)

  return (
    <Portal>
      <Dialog
        visible={openDatePickerModal}
        onDismiss={() => setOpenDatePickerModal(false)}
      >
        <Box p={2}>
          <Typography mb={3}>Selecione o período desejado:</Typography>
          <TouchableOpacity onPress={() => setOpenStartDateModal(true)} mb={3}>
            <Box pointerEvents="none">
              <TextInput
                label="De"
                value={formatDate(dateRange.startDate, { omitHours: true })}
              />
            </Box>
          </TouchableOpacity>
          {useMemo(() => {
            return (
              <>
                {openStartDateModal ? (
                  <DateTimePicker
                    value={dateRange.startDate}
                    onChange={(_event, selectedDate) => {
                      const currentDate = selectedDate || dateRange.startDate

                      setOpenStartDateModal(Platform.OS === 'ios')
                      setDateRange({ ...dateRange, startDate: currentDate })
                    }}
                  />
                ) : null}
              </>
            )
          }, [openStartDateModal])}
          <TouchableOpacity onPress={() => setOpenEndDateModal(true)} mb={3}>
            <Box pointerEvents="none">
              <TextInput
                label="Até"
                value={formatDate(dateRange.endDate, { omitHours: true })}
              />
            </Box>
          </TouchableOpacity>
          {useMemo(() => {
            return (
              <>
                {openEndDateModal ? (
                  <DateTimePicker
                    value={dateRange.endDate}
                    onChange={(_event, selectedDate) => {
                      const currentDate = selectedDate || dateRange.endDate

                      setOpenEndDateModal(Platform.OS === 'ios')
                      setDateRange({ ...dateRange, endDate: currentDate })
                    }}
                  />
                ) : null}
              </>
            )
          }, [openEndDateModal])}
          <Button
            onPress={() => setOpenDatePickerModal(false)}
            color="accent"
            labelStyle={{ color: theme.colors.custom.white }}
          >
            Fechar
          </Button>
        </Box>
      </Dialog>
    </Portal>
  )
}

export default DateRangePickerModal
