import React from "react"
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native"
import { colors } from "../assents/colors/colors";
import { Film } from "../types/Film";
import Icon from 'react-native-vector-icons/MaterialIcons';


type Props = {
  film: Film
}

export const Rating:React.FC<Props> = ({film}) => {
  const windowDimensions = useWindowDimensions();
  const screenWidth = windowDimensions.width;

  return (
    <View style={[styles.container, {width: screenWidth}]}>
      <View style={styles.genresContainerFlex}>
        {(film?.show?.genres?.length > 0) && (
          <View style={[styles.genresContainer, {width: screenWidth * 0.5}]}>
            <Text style={styles.genresTitile}>
              Genres:
            </Text>
            {film.show.genres.map((ganre: string, index:number) => (
              <Text style={styles.genresText} key={index}>
                {(film.show.genres.length !== index + 1) ? `${ganre}/` : `${ganre}`}
              </Text>
            ))}
          </View>
        )}
        <View style={[styles.genresContainer, {width: screenWidth * 0.5}]}>
          <Text style={styles.genresTitile}>
            Status:
          </Text>
            <Text style={styles.genresText}>
              {film.show.status}
          </Text>
        </View>
      </View>
      <View style={[styles.scheduleContainer, {width: screenWidth}]}>
        {(film?.show?.schedule?.time && film?.show?.schedule?.days) && (
        <View style={[styles.schedule, {width: screenWidth * 0.5}]}>
          <View style={styles.scheduleImgContainer}>
            <Image source={require('../../src/assents/images/schedule.png')} style={styles.scheduleImg} />
          </View>
          <View style={styles.scheduleInform}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {film?.show?.schedule?.time}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              {film?.show?.schedule?.days.map((day: string, index: number) => (
              <Text style={styles.timeText} key={index}>
                {(film?.show?.schedule?.days.length !== index + 1) ? `${day}/` : `${day}`}
              </Text>
              ))}
            </View>
          </View>
        </View>
        )}
        {(film?.show?.rating?.average) && (
            <View style={[styles.flexContainer, {width: screenWidth * 0.5}]}>
              <Text style={styles.textRating}>Rating:  </Text>
               <Icon name="star" size={15} color="gold" />
              <Text style={styles.textRating}>{`${film?.show?.rating?.average}/10`}</Text>
            </View>
          )}      
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  genresContainer: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  genresText: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
  },
  genresTitile: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    marginRight: 15,
  },
  genresContainerFlex: {
    width: 100,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scheduleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  schedule: {
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scheduleImgContainer: {
    height: 20,
    width: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleImg: {
    height: 20,
    width: 20,
  },
  scheduleInform: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 13,
  },
  flexContainer: {
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textRating: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    borderWidth: 0,
    borderRadius: 10,
  }
})