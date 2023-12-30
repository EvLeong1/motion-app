import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    //   padding: 10,
    //   backgroundColor: '#D0E3CC',
    backgroundColor: colors.background,
    //   alignItems: 'center',
    //   justifyContent: 'center',
  },
  scrollView: {
    // backgroundColor: colors.background,
    alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 20,
    paddingBottom: 200,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    color: 'white',
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 15,
  },

  input: {
    backgroundColor: '#d8d8d8',
    height: 45,
    margin: 12,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 12,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#53524E',
    color: 'white',
    width: 300,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  link: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#384ef5',
  },
  forgot: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#384Ef5',
    // alignItems: 'right'
  },
});
export const registerStyles = StyleSheet.create({
  // display:'flex', alignItems: 'center', justifyContent: 'center'
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 20,
  },

  input: {
    backgroundColor: '#d8d8d8',
    height: 45,
    margin: 12,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#53524E',
    color: 'white',
    width: 300,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  link: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#384ef5',
  },
});

export const viewParks = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    gap: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    width: '100%',
    paddingTop: 50,
    color: 'black',
  },
  parkBox: {
    // display:'flex',

    flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
    borderColor: 'darkgray',
    borderWidth: 1,
    borderRadius: 20,
    width: '95%',
    backgroundColor: 'white',
    gap: 15,
    // height: 150,
    // flexWrap: 'wrap',
  },

  textContainer: {
    display: 'flex',
    // justifyContent: 'space-evenly',
    gap: 5,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    flexWrap: 'wrap',
    maxWidth: '99%',
  },
  location: {
    fontSize: 10,
    fontStyle: 'italic',
    color: 'black',
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export const ViewProfile = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    gap: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addPhotoButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    padding: 20,
    color: '#ccc',
    backgroundColor: '#ccc',
  },

  descriptor: {
    fontSize: 15,
    color: 'black',
    fontStyle: 'italic',
    // textDecorationLine: 'underline',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  signInContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
  },
  boxContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    gap: 5,
  },
});

export const rideInfoStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },

  video: {
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 10,
    alignItems: 'center',
  },

  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    padding: 20,
  },

  text: {
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    textAlign: 'left',
  },
});
