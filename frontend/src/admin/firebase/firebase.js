/********************************************************************
 *
 * firebase.jsx
 *
 *   This file is used to connect and integrate Firebase with 
 *   the website
 * 
 ********************************************************************
 */

// Import the needed funtion from SDKs 
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// web app's firebase configuration 
const firebaseConfig = {
    apiKey: "AIzaSyAZIoVQL8azm2snoGwgLvdh8i6EcyPA-vY",
    authDomain: "simzy-b3068.firebaseapp.com",
    projectId: "simzy-b3068",
    storageBucket: "simzy-b3068.appspot.com",
    messagingSenderId: "557242598271",
    appId: "1:557242598271:web:6ecfa816a336695bfb504a"
};

// Initialize firebase 
const app = initializeApp(firebaseConfig);

export default app;