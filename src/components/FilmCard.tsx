import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native"
import { useAppNavigation } from "../../src/app/hooks";
import { colors } from "../assents/colors/colors";
import { Film } from "../types/Film";
import Icon from 'react-native-vector-icons/MaterialIcons';
const screenWidth = Dimensions.get('window').width;

type Props = {
  film: Film,
};

const NOT_AVAILABLE_IMG ='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'

export const FilmCard:React.FC<Props> = ({film}) => {
  const navigation = useAppNavigation();

  const handleToDeatilScreen = (item) => {
    navigation.navigate('DetailFilmInform', {
      selesctFilm: item
    });
  }

  return (
    <TouchableOpacity
    onPress={() => {
      handleToDeatilScreen(film)
    }}
      style={styles.container}
    >
      <View style={styles.imgContainer}>
        {(film?.show?.image?.original) ? (
          <Image source={{uri: film?.show?.image?.original}} style={styles.img} />
        ) : (
          <Image source={{uri: NOT_AVAILABLE_IMG}} style={styles.img} />
        )}
      </View>
      <View style={styles.informContainer}>
        <View>
          <Text style={styles.name}>{film?.show?.name}</Text>
        </View>
        <View style={styles.ratingContainer}> 
          {(film?.show?.rating?.average) && (
            <View style={styles.flexContainer}>
              <Text style={styles.textRating}>Rating:  </Text>
               <Icon name="star" size={15} color="gold" />
              <Text style={styles.textRating}>{`${film?.show?.rating?.average}/10`}</Text>
            </View>
          )}       
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,
    height: 300,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.INPUT_BACKGROUND,
    borderRadius: 10,
    flexDirection: 'column'
  },
  imgContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
  },
  img: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
  },
  informContainer: {
    width: '100%',
    height: 100,
    paddingBottom: 30,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  ratingContainer: {
    height: 40,
  },
  ratingIcon: {
    height: 20,
    width: 20,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  name: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    borderWidth: 0,
    borderRadius: 10,
    textAlign: 'center',
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