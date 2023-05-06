import React, {useLayoutEffect, useState, useMemo} from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Linking} from "react-native"
import { normalizeText } from "../utils/normalizeText";
import { colors } from "../assents/colors/colors";
import { Film } from "../types/Film";
import RenderHtml from 'react-native-render-html';
import { Rating } from "../components/Rating";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const NOT_AVAILABLE_IMG ='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'

export const DetailFilmInform = ({route, navigation}) => {
  const [openFullSummary, setOpenFullSummaty] = useState(false)

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: true,
          title: route.params.selesctFilm?.show?.name ? route.params.selesctFilm?.show?.name : 'Journeys',
          headerStyle: {
              backgroundColor: colors.LIGHT_BACKGORUND,
          },
          headerTitleStyle: {
              fontFamily: 'Ubuntu-Regular',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: 16,
              color: colors.TEXT_COLOR
          },
          headerTitleAlign: 'center',
          headerTintColor: colors.TEXT_COLOR,
          headerBackVisible: true,
      });
  }, []);

  const film: Film = route.params.selesctFilm

  const htmlContent = useMemo(() => {
    if (!film?.show?.summary) {
      return null
    }

    if (openFullSummary) {
      return film?.show?.summary
    }

    return normalizeText(film?.show?.summary)
  }, [openFullSummary])

  const buttonHandle = () => {
    Linking.openURL(film.show.url)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          {(film?.show?.image?.original) ? (
            <Image source={{uri: film?.show?.image?.original}} style={styles.img} />
          ) : (
            <Image source={{uri: NOT_AVAILABLE_IMG}} style={styles.img} />
          )}
        </View>
        <View style={styles.informContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {film?.show?.name ? film?.show?.name : 'Journeys'}
            </Text>
          </View>
          <Rating film={film} />
          {(film?.show?.summary && htmlContent) && (
            <View style={styles.summaryContainer}>
              <View style={styles.summaryTitleContainer}>
                <Text style={styles.summaryTitle}>Summary</Text>
              </View>
              <View style={styles.summaryText}>
                <RenderHtml 
                  source={{ html: htmlContent }}
                  tagsStyles={styles}
                />
              </View>
              {(film?.show?.summary.length > 97) && (
              <TouchableOpacity 
                style={styles.opeFullSummaryContainer}
                onPress={() => {
                  setOpenFullSummaty(prev => !prev)
                }}
              >
                <Text style={styles.opeFullSummaryText}>
                  {openFullSummary ? 'Read Less...' : 'Read More...'}
                </Text>
              </TouchableOpacity>
              )}
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.showButton}
              onPress={() => {
                buttonHandle()
              }}
            >
              <Text style={styles.textButton}>
                watch the series
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.PRIMARY_COLOR,
    display: 'flex',
    alignItems: 'center',
    minHeight: screenHeight,
  },
  img: {
    width: '100%',
    height: screenHeight * 0.4
  },
  imgContainer: {
    width: '100%',
    height: screenHeight * 0.4
  },
  informContainer: {},
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  nameText: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    borderWidth: 0,
    borderRadius: 10,
    textAlign: 'center',
  },
  summaryContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.INPUT_BACKGROUND,
    width: screenWidth,
    borderRadius: 10,
  },
  summaryText: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    borderWidth: 0,
    borderRadius: 10,
  },
  summaryTitle: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    borderWidth: 0,
    borderRadius: 10,
    textAlign: 'center',
  },
  summaryTitleContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  opeFullSummaryContainer: {
  },
  opeFullSummaryText: {
    color: colors.MAIN_HEADING_COLOR_TWO,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    borderWidth: 0,
    borderRadius: 10,
    textAlign: 'center',
  },
  p: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    borderWidth: 0,
    borderRadius: 10,
    textAlign: 'center',
  },
  b: {
    color: colors.MAIN_HEADING_COLOR_TWO,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    borderWidth: 0,
    borderRadius: 10,
  },
  i: {
    color: colors.MAIN_HEADING_COLOR_TWO,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    borderWidth: 0,
    borderRadius: 10,
  },
  showButton: {
    height: 70,
    width: screenWidth * 0.8,
    backgroundColor: colors.MAIN_HEADING_COLOR_TWO,
    borderRadius: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: colors.PRIMARY_COLOR,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    borderWidth: 0,
  },
  buttonContainer: {
    width: screenWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 25,
  }
})