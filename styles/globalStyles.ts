import { StyleSheet } from 'react-native'
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
  

  export const registerStyles = StyleSheet.create({
    // display:'flex', alignItems: 'center', justifyContent: 'center'
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        gap: 20,
      },

      input: {
        backgroundColor: '#CDD4FF',
        height: 45,
        margin: 12,
        color: 'black',
        borderColor: '#88E8FF',
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
        backgroundColor: '#88E8FF',
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
        color: '#8898FF',
        
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
    loadingContainer:{
     
      width: '100%',
      paddingTop: 50,
      color:'black',
    
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
      gap: 15
      // height: 150,
      // flexWrap: 'wrap',

  },

    textContainer: {
        display:'flex',
        // justifyContent: 'space-evenly',
        gap: 5,
        flexWrap: 'wrap',
    
    }, 
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        flexWrap: 'wrap',
        maxWidth: '90%',
    },
    location:{
        fontSize: 10,
        fontStyle: 'italic',
        color: 'black',
    },
    
    image:{
      width: 100, 
      height: 100, 
      borderRadius: 20, 
      borderColor: 'black', 
      borderWidth: 1
    }
});