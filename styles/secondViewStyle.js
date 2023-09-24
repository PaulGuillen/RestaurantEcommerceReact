import { StyleSheet } from 'react-native';

export const secondOnBoardingStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /**Only body*/
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 260,
    height: 260,
  },
  textBottomFromImage: {
    padding: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    marginHorizontal: 4,
    fontStyle: 'italic',
  },
  /**Bottom*/
  horizontalCotainerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  separatorContainer: {
    width: '100%',
    alignSelf: 'center',
    bottom: 20,
  },
  separatorBottom: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
  },
  buttonStartStyle: {
    bottom: 10,
    start: 20,
  },
  buttonEndStyle: {
    bottom: 10,
    right: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
