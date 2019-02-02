import firebase from 'react-native-firebase'
import { GoogleSignin, statusCodes } from 'react-native-google-signin'

class Firebase {
  constructor() {
    this.instance = firebase
  }

  googleLogin = async () => {
    let currentUser

    // Add any configuration settings here:
    await GoogleSignin.configure()

    const data = await GoogleSignin.signIn()

    // create a new firebase credential with the token
    const credential = this.instance.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken
    )
    // login with credential
    currentUser = await this.instance
      .auth()
      .signInAndRetrieveDataWithCredential(credential)

    return currentUser.user.toJSON()
  }

  reGoggleLogin = async () => {
    const data = await GoogleSignin.signInSilently()
    return data
  }

  isLoggedIn = GoogleSignin.isSignedIn
}

export default Firebase
