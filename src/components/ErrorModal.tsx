import React, {useEffect, useState} from "react"
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Modal } from "react-native"
import { colors } from "../assents/colors/colors";

type Props = {
  error: string | null
};

export const ErrorModal:React.FC<Props> = ({error}) => {
  const [showModal, setShowModal] = useState(false);
  const windowDimensions = useWindowDimensions();
  const screenWidth = windowDimensions.width;

  useEffect(() => {
    if (Boolean(error)) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [error])

  const handleClose = () => {
    setShowModal(false)
  }


  return (
    <Modal
      visible={showModal}
      onRequestClose={() => {
        handleClose()
      }}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, {width: screenWidth * 0.9}]}>
          <View>
            <Text style={styles.modalText}>{error}</Text>
          </View>
          <TouchableOpacity 
            style={styles.modaleButton}
            onPress={() => {
              handleClose()
            }}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    height: 200,
    backgroundColor: colors.INPUT_BACKGROUND,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalBackground: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    borderWidth: 0,
    borderRadius: 10,
    textAlign: 'center',
  },
  modalButtonText: {
    color: colors.PRIMARY_COLOR,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    borderWidth: 0,
    borderRadius: 10,
    textAlign: 'center',
  },
  modaleButton: {
    width: '80%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAIN_HEADING_COLOR_TWO,
    borderRadius: 30,
  }
})