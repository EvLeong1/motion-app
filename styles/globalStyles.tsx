import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
        // justifyContent: '',
        gap: 10,
      },

      input: {
        backgroundColor: '#CDD4FF',
        height: 45,
        margin: 12,
        color: 'white',
        // borderColor: '#8898FF',
        // borderWidth: 1,
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
        fontSize: 10,
        color: '#8898FF',
        
    },
  });