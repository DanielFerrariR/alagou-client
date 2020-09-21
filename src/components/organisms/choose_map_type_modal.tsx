import React, { Dispatch, SetStateAction } from 'react'
import {
  Box,
  Typography,
  Dialog,
  TouchableOpacity,
  Image
} from 'src/components/atoms'

import { Portal } from 'react-native-paper'

type MapType =
  | 'standard'
  | 'satellite'
  | 'hybrid'
  | 'terrain'
  | 'none'
  | 'mutedStandard'

interface Props {
  openChooseMapTypeModal: boolean
  setOpenChooseMapTypeModal: Dispatch<SetStateAction<boolean>>
  mapType: MapType
  setMapType: Dispatch<SetStateAction<MapType>>
}

const ChooseMapTypeModal: React.FC<Props> = ({
  openChooseMapTypeModal,
  setOpenChooseMapTypeModal,
  mapType,
  setMapType
}) => {
  return (
    <>
      <Portal>
        <Dialog
          visible={openChooseMapTypeModal}
          onDismiss={() => setOpenChooseMapTypeModal(false)}
        >
          <Box p={2}>
            <Typography mb={3}>Selecione o tipo de mapa:</Typography>
            <Box flexDirection="row" mx={-1}>
              <TouchableOpacity
                onPress={() => {
                  setMapType('standard')
                  setOpenChooseMapTypeModal(false)
                }}
                width={1 / 3}
                px={1}
              >
                <Box
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    source={require('src/images/standard_map.png')}
                    width={1}
                    height={100}
                    mb={1}
                    borderRadius={4}
                    borderWidth={mapType === 'standard' ? 2 : 0}
                    borderColor="accent"
                  />
                  <Typography
                    variant="h3"
                    color={mapType === 'standard' ? 'accent' : undefined}
                  >
                    Padrão
                  </Typography>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMapType('satellite')
                  setOpenChooseMapTypeModal(false)
                }}
                width={1 / 3}
                px={1}
              >
                <Box
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    source={require('src/images/satellite_map.png')}
                    width={1}
                    height={100}
                    mb={1}
                    borderRadius={4}
                    borderWidth={mapType === 'satellite' ? 2 : 0}
                    borderColor="accent"
                  />
                  <Typography
                    variant="h3"
                    color={mapType === 'satellite' ? 'accent' : undefined}
                  >
                    Satélite
                  </Typography>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMapType('terrain')
                  setOpenChooseMapTypeModal(false)
                }}
                width={1 / 3}
                px={1}
              >
                <Box
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    source={require('src/images/terrain_map.png')}
                    width={1}
                    height={100}
                    mb={1}
                    borderRadius={4}
                    borderWidth={mapType === 'terrain' ? 2 : 0}
                    borderColor="accent"
                  />
                  <Typography
                    variant="h3"
                    color={mapType === 'terrain' ? 'accent' : undefined}
                  >
                    Relevo
                  </Typography>
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </Dialog>
      </Portal>
    </>
  )
}

export default ChooseMapTypeModal
