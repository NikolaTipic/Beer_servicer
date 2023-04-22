import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Pressable,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { widthPercentToDp as wp, heightPercentToDp as hp } from './components/Dimenisons';
import { Formik } from 'formik';
import axios from 'axios';
import { MotiText, MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { MotiPressable } from 'moti/interactions';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [oneRender, setOneRender] = useState(true);

  const [valueDate, setValueDate] = useState(new Date().toDateString());
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [successMessage, setSuccessMesage] = useState();
  const [failedMessage, setFailedMessage] = useState();
  const [render, setRender] = useState(true);
  const [isInputAndroid, setIsInputAndroid] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    setTimeout(() => {
      setOneRender(false);
    }, 5000);
  }, []);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setValueDate(currentDate.toDateString());
      }

    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setValueDate(date.toDateString());
    toggleDatePicker();
  }

  const addDateOfLastSanitation = (values, setSubmitting) => {
    const url = "https://salty-river-31434.herokuapp.com/facility/AddDateOfLastSanitation";

    axios
      .post(url, values)
      .then((response) => {
        const { status, message } = response.data;

        if (status !== "SUCCESS") {
          setFailedMessage(message);
          setSubmitting(false);

          return;
        }

        setSuccessMesage(message);
        setSubmitting(false);
      })
      .catch(err => {
        setFailedMessage("Error, provijeri svoju internetsku vezu pa pokusaj ponovno!")
        setSubmitting(false);
      })
  }

  if (isLoading) {
    return (
      //Popravit Beer slova da se pojave, jer kod pocetnog ucitavanja tranzicija nije dobra
      <>
        <StatusBar style='dark' />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.logoContainer}>
            <MotiText
              style={styles.text1}
              transition={{
                type: "timing",
                duration: 1000,
                easing: Easing.inOut(Easing.ease)
              }}
              from={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
            >
              BE
            </MotiText>
            <MotiText
              style={styles.text}
              transition={{
                type: "timing",
                duration: 2000,
                easing: Easing.inOut(Easing.ease)
              }}
              from={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
            >
              ER
            </MotiText>
          </View>
          {/* <LottieView
          source={require("./assets/90751-android-app-background.json")}
          autoPlay
          loop={false}
          resizeMode="cover"
        /> */}
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>

        <MotiView
          transition={{
            type: "timing",
            duration: 2000,
            easing: Easing.inOut(Easing.ease)
          }}
          from={{
            flex: 0
          }}
          animate={{
            flex: 1.8
          }}
          style={{
            width: wp(100),
            flex: 1.8
          }}
        >
          {Platform.OS === "android" ? !isInputAndroid && (
            <View style={styles.logoContainer}>
              <MotiText
                style={[styles.text1, { color: isInputAndroid && Platform.OS === "android" ? "#000" : "#fff" }]}
                transition={{
                  type: "timing",
                  duration: 2000,
                  easing: Easing.inOut(Easing.ease),
                  delay: oneRender? 1000 : 0
                }}
                from={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
              >
                BE
              </MotiText>
              <MotiText
                style={[styles.text, { color: isInputAndroid && Platform.OS === "android" ? "#000" : "#fff" }]}
                transition={{
                  type: "timing",
                  duration: 2000,
                  easing: Easing.inOut(Easing.ease),
                  delay: oneRender? 1000 : 0
                }}
                from={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
              >
                ER
              </MotiText>
            </View>
          ) : (
            <View style={styles.logoContainer}>
              <MotiText
                style={styles.text1}
                transition={{
                  type: "timing",
                  duration: 2000,
                  easing: Easing.inOut(Easing.ease),
                  delay: 1000
                }}
                from={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
              >
                BE
              </MotiText>
              <MotiText
                style={styles.text1}
                transition={{
                  type: "timing",
                  duration: 2000,
                  easing: Easing.inOut(Easing.ease),
                  delay: 1000
                }}
                from={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
              >
                BR
              </MotiText>
            </View>
          )}

          <View style={styles.headerLogoPicContainer}>
            <Image
              source={require("./assets/tap.png")}
              style={styles.headerLogoPic}
            />
            <Image
              source={require("./assets/tap.png")}
              style={styles.headerLogoPic}
            />
          </View>
        </MotiView>
        <View style={styles.credentialsContainer}>
          <MotiView
            style={{
              position: "absolute",
              top: wp(-12),
              width: wp(88),
              alignSelf: "center",
              backgroundColor: "rgba(200, 200, 200, 0.95)",
              borderRadius: wp(3),
              zIndex: 2,
              alignItems: "center",
              justifyContent: "center"
            }}
            transition={{
              type: "timing",
              duration: 500,
              easing: Easing.inOut(Easing.ease)
            }}
            from={{
              height: 0
            }}
            animate={{
              height: failedMessage || successMessage ? wp(22) : 0
            }}
          >
            <MotiPressable
              onPress={() => { setFailedMessage(null); setSuccessMesage(null) }}
              style={styles.notificationContainer}
              from={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: successMessage || failedMessage ? 1 : 0,
                height: successMessage || failedMessage ? wp(14) : 0
              }}
              transition={{
                type: "timing",
                duration: 500,
                easing: Easing.inOut(Easing.ease)
              }}
            >
              {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : <Text style={styles.failedMessage}>{failedMessage}</Text>}
            </MotiPressable>
          </MotiView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={hp(20)}
          >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setIsInputAndroid(false); }}>
              <View style={styles.inputContainer}>
                <Formik
                  initialValues={{
                    invNumber: "",
                    dateOfLastSanitation: ""
                  }}

                  onSubmit={(values, { setSubmitting }) => {
                    values = { ...values, dateOfLastSanitation: date }
                    addDateOfLastSanitation(values, setSubmitting);
                  }}
                >
                  {
                    ({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                      <>
                        <MotiView
                          style={styles.textInputContainer}
                          transition={{
                            type: "timing",
                            duration: 2000,
                            easing: Easing.inOut(Easing.ease)
                          }}
                          from={{
                            translateX: wp(100)
                          }}
                          animate={{
                            translateX: 0
                          }}
                        >
                          <View style={styles.inputIconContainer}>
                            <Image
                              source={require("./assets/beer-tap.png")}
                              style={styles.inputIcon}
                            />
                          </View>

                          <TextInput
                            style={styles.textInput}
                            placeholder='Inventurni broj...'
                            onChangeText={handleChange("invNumber")}
                            onBlur={handleBlur("invNumber")}
                            value={values.invNumber}
                            onPressIn={() => {
                              setFailedMessage(null);
                              setSuccessMesage(null);
                              setIsInputAndroid(true);
                            }}
                            onSubmitEditing={() => { setIsInputAndroid(false); }}
                            keyboardAppearance="light"
                          />
                        </MotiView>

                        {showDatePicker && (
                          <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChange}
                            style={styles.datePicker}
                            minimumDate={new Date()}
                          />
                        )}

                        {showDatePicker && Platform.OS === "ios" && (
                          <View style={styles.iosPickerButtonContainer}>
                            <TouchableOpacity
                              onPress={() => {
                                setShowDatePicker(false);
                                setDate(new Date());
                                setValueDate(new Date().toDateString())
                                setRender(false);
                                setSuccessMesage(null);
                                setFailedMessage(null);
                              }}
                              style={styles.iosPickerButton}>
                              <Text style={{ color: "#fff" }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => {
                                confirmIOSDate();
                                setRender(false);
                                setSuccessMesage(null);
                                setFailedMessage(null);
                              }}
                              style={[styles.iosPickerButton, { backgroundColor: "#fca311" }]}>
                              <Text style={{ color: "#fff" }}>Ok</Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        {!showDatePicker && (
                          <MotiView
                            style={[styles.textInputContainer, { marginBottom: wp(20) }]}
                            transition={{
                              type: "timing",
                              duration: 2000,
                              easing: Easing.inOut(Easing.ease)
                            }}
                            from={{
                              translateX: render ? wp(-100) : 0
                            }}
                            animate={{
                              translateX: 0
                            }}
                          >
                            <View style={styles.inputIconContainer}>
                              <Image
                                source={require("./assets/beer.png")}
                                style={styles.inputIcon}
                              />
                            </View>
                            <Pressable onPress={() => {
                              setFailedMessage(null);
                              setSuccessMesage(null);
                              toggleDatePicker();
                              setRender(false);
                              setIsInputAndroid(false);
                            }
                            }>
                              <TextInput
                                style={styles.textInput}
                                value={valueDate}
                                onChangeText={handleChange("dateOfLastSanitation")}
                                editable={false}
                                onBlur={handleBlur("dateOfLastSanitation")}
                                onPressIn={toggleDatePicker}
                              />
                            </Pressable>
                          </MotiView>
                        )}

                        {!isSubmitting ? (
                          <TouchableOpacity
                            onPress={() => {
                              handleSubmit();
                              setSuccessMesage(null);
                              setFailedMessage(null);

                            }}>
                            <MotiView
                              style={styles.button}
                              transition={{
                                type: "timing",
                                duration: 300,
                                easing: Easing.inOut(Easing.ease)
                              }}
                              from={{
                                width: hp(5)
                              }}
                              animate={{
                                width: wp(80)
                              }}
                            >
                              <MotiView
                                transition={{
                                  type: "timing",
                                  duration: 600,
                                  easing: Easing.inOut(Easing.ease)
                                }}
                                from={{
                                  opacity: 0
                                }}
                                animate={{
                                  opacity: 1
                                }}
                              >
                                <Text style={{ color: "#fff", fontSize: wp(3.4) }}>Potvrdi obavljenu Sanitaciju</Text>
                              </MotiView>
                            </MotiView>
                          </TouchableOpacity>
                        ) : (
                          //Pokusat napravit svoj state za submitanje, mozda to sredi animaciju(za resetiranje forme)
                          <MotiView
                            transition={{
                              type: "timing",
                              duration: 400,
                              easing: Easing.inOut(Easing.ease)
                            }}
                            from={{
                              width: wp(80)
                            }}
                            animate={{
                              width: hp(5)
                            }}
                            style={styles.button}
                          >
                            <ActivityIndicator
                              size={wp(5.5)}
                              color="#fff"
                            />
                          </MotiView>
                        )}
                      </>
                    )
                  }
                </Formik>

              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerLogoPicContainer: {
    flexDirection: "row",
    position: "relative",
    bottom: wp(22)
  },
  headerLogoPic: {
    width: wp(40),
    height: wp(40),
    marginHorizontal: wp(5)
  },
  credentialsContainer: {
    flex: 2,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    flex: 1,
    width: wp(120),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(2)
  },
  textInput: {
    width: wp(65),
    height: hp(5),
    paddingHorizontal: wp(4),
    marginLeft: wp(3),
    backgroundColor: "#fff",
    fontSize: wp(3.2),
    color: "#000",
    elevation: 2,
    shadowColor: "#000",
    shadowRadius: wp(0.6),
    shadowOpacity: 0.3,
    shadowOffset: { width: wp(0.4), height: wp(0.3) },
    elevation: hp(1),
    borderRadius: wp(20),
  },
  text1: {
    color: "#fff",
    fontSize: wp(13),
    fontWeight: 100,
    lineHeight: wp(13),
    marginBottom: wp(-2),
    marginLeft: Platform.OS === "android" ? -3 : 0
  },
  text: {
    color: "#fff",
    fontSize: wp(13),
    fontWeight: 100,
    lineHeight: wp(13),
    marginBottom: wp(-2)
  },
  inputIcon: {
    width: wp(7),
    height: wp(7)
  },
  inputIconContainer: {
    borderRadius: wp(50),
    borderColor: "#fff",
    borderWidth: wp(0.6),
    padding: wp(1.5),
    shadowColor: "#000",
    shadowRadius: wp(0.4),
    shadowOpacity: 0.6,
    shadowOffset: { width: wp(0.3), height: wp(0.2) },
    elevation: 15
  },
  datePicker: {
    height: hp(15)
  },
  iosPickerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: wp(70),
    marginBottom: wp(7)
  },
  iosPickerButton: {
    marginVertical: hp(1),
    backgroundColor: "#e5e5e5",
    padding: wp(1),
    width: wp(20),
    alignItems: "center",
    borderRadius: wp(25),
    shadowColor: "#000",
    shadowRadius: wp(0.25),
    shadowOpacity: 0.4,
    shadowOffset: { width: wp(0.2), height: wp(0.2) }
  },
  button: {
    width: wp(80),
    height: hp(5),
    backgroundColor: "#fca311",
    borderRadius: wp(50),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowRadius: wp(0.25),
    shadowOpacity: 0.4,
    shadowOffset: { width: wp(0.2), height: wp(0.2) },
    marginTop: hp(0),
    elevation: hp(1)
  },
  notificationContainer: {
    width: wp(80),
    backgroundColor: "#fff",
    borderRadius: wp(2),
    shadowColor: "#000",
    shadowRadius: wp(0.6),
    shadowOpacity: 0.3,
    shadowOffset: { width: wp(0.4), height: wp(0.3) },
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(1)
  },
  msgContainer: {
    width: wp(80),
    alignItems: "center",
    position: "relative",
    top: hp(-2)
  },
  successMessage: {
    color: "green",
    textAlign: "center",
    fontSize: wp(3.2),
    flexWrap: "wrap"
  },
  failedMessage: {
    color: "red",
    textAlign: "center",
    fontSize: wp(3.2),
    flexWrap: "wrap"
  }
});
