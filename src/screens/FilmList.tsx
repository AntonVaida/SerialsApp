import React, { useLayoutEffect, useMemo} from "react"
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, useWindowDimensions } from "react-native"
import { useAppNavigation, useAppDispatch, useAppSelector } from "../../../AwesomeProject/src/app/hooks";
import { colors } from "../../src/assents/colors/colors";
import { SearchBar } from "../../src/components/SearchBar";
import { RenderLoader } from "../components/RenderLoader";
import { FilmCard } from "../components/FilmCard";
import { setCounterPage } from "../features/pageCounterSlice";
import { ErrorModal } from "../../src/components/ErrorModal";

export const FilmList = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const {filmList, error, loading, nonResult, nextPageIsEmpty} = useAppSelector((store) => store.filmList)
  const { pageCounter } = useAppSelector(store => store.pageCounter)
  const windowDimensions = useWindowDimensions();
  const screenHeight = windowDimensions.height;
  const screenWidth = windowDimensions.width;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const handleEndReached = () => {
    dispatch(setCounterPage(pageCounter + 1))
  }

  const modalMessadge = useMemo(() => {
    if (error) {
      return error
    } else if (nextPageIsEmpty) {
      return 'Loaded all serials'
    }

    return null;
  }, [error, nextPageIsEmpty])

  return (
    <SafeAreaView style={[styles.container, {height: screenHeight, width: screenWidth}]}>
    <ErrorModal error={modalMessadge} />
    <SearchBar />
      {(loading && !filmList.length) ? (
         <View style={[styles.loadingContainer, {height: screenHeight - 155}]}>
            <ActivityIndicator size="large" color={colors.MAIN_HEADING_COLOR_TWO} />
        </View>
      ) : (
        <View style={[styles.contentCotainer, {height: screenHeight - 80, width: screenWidth}]}>
          <FlatList
            style={{width: screenWidth}}
            data={filmList}
            renderItem={({item}) => (
              <FilmCard film={item}/>
            )}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReached={() => {
              if (filmList.length > 0 && !loading && !nextPageIsEmpty) {
                handleEndReached()
              }
            }}
            ListFooterComponent={() => {
              if (loading && filmList.length && !error) {
                return <RenderLoader />
              }

              return <View style={styles.endList} />
            }}
            ListEmptyComponent={() => (
              nonResult ? (
              <View style={[styles.emtyListBunner, {height: screenHeight - 155}]}>
                <Text style={styles.textMessadge}>Sorry, nothing found with this search</Text>
              </View>
              ) : (
              <View style={[styles.emtyListBunner, {height: screenHeight - 155,}]}>
                <Text style={styles.textMessadge}>Type the show's name</Text>
              </View>
              )
            )}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_COLOR,
    display: 'flex', 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  contentCotainer: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  searchInput: {
    paddingLeft: '10%',
    height: 50,
    marginTop: 2,
    backgroundColor: colors.INPUT_BACKGROUND,
    width: '90%',
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    borderWidth: 0,
    borderRadius: 10,
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 15,
  },
  inputIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: '35%',
    left: '8%',
    zIndex: 30,
  },
  endList: {
    height: 40,
  },
  textMessadge: {
    color: colors.JOURNEY_INFORMATION_TEXT,
    fontFamily: 'Ubuntu-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    borderWidth: 0,
    borderRadius: 10,
    textAlign: 'center',
  },
  separator: {
    height: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  emtyListBunner: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  loadingContainer: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
})
