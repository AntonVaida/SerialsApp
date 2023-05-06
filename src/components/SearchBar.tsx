import React, {useEffect, useState} from "react"
import { View, StyleSheet, TextInput, Image } from "react-native"
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { fetchFilms, setSearchStatus } from "../../src/features/sliceFilmList";
import { colors } from "../assents/colors/colors";
import { setCounterPage } from "../features/pageCounterSlice";
import { debounce } from 'lodash';

export const SearchBar = () => {
  const [query, setQuery] = useState('')
  const dispatch = useAppDispatch();
  const { pageCounter } = useAppSelector(store => store.pageCounter)
   

  useEffect(() => {
    if (query.length > 1) {
      const searchQuery = query.trim().replace(/ /g, '%20');
      dispatch(fetchFilms({query: searchQuery, page: pageCounter}));
      dispatch(setSearchStatus(true));

      return;
    } 

    dispatch(setSearchStatus(false));
  }, [query, pageCounter])


  useEffect(() => {
    dispatch(setCounterPage(1))
  }, [query])

  return (
    <View style={styles.inputContainer}>
      <Image 
        source={require('../../src/assents/images/IconSearch.png')} 
        style={styles.inputIcon} 
      />
      <TextInput
        placeholder="Search serial"
        value={query}
        onChangeText={setQuery}
        placeholderTextColor={colors.JOURNEY_INFORMATION_TEXT}
        maxLength={50}
        style={styles.searchInput}
        underlineColorAndroid={'transparent'}
      />
    </View>
  )
}

const styles = StyleSheet.create({

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
    marginBottom: 15,
  },
  inputIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: '35%',
    left: '8%',
    zIndex: 30,
  }
})

