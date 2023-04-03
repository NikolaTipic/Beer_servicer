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
  Image
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { widthPercentToDp as wp, heightPercentToDp as hp } from './components/Dimenisons';
import KeyboardAvoidingWrapper from './components/KeyboardAvoidingWrapper';

export default function App() {
  const [valueDate, setValueDate] = useState(new Date().toDateString());
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.text}>BE</Text>
        <Text style={styles.text}>ER</Text>
      </View>
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
      <View style={styles.credentialsContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={hp(20)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <View style={styles.textInputContainer}>
                <View style={styles.inputIconContainer}>
                  <Image
                    source={require("./assets/beer-tap.png")}
                    style={styles.inputIcon}
                  />
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder='Invtenturni broj...'
                />
              </View>

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
              {!showDatePicker && (
                <View style={styles.textInputContainer}>
                  <View style={styles.inputIconContainer}>
                    <Image
                      source={require("./assets/beer.png")}
                      style={styles.inputIcon}
                    />
                  </View>
                  <Pressable onPress={
                    toggleDatePicker
                  }>
                    <TextInput
                      style={styles.textInput}
                      value={valueDate}
                      onChangeText={setDate}
                      editable={false}
                      onPressIn={toggleDatePicker}
                    />
                  </Pressable>
                </View>
              )}
              {showDatePicker && Platform.OS === "ios" && (
                <View style={styles.iosPickerButtonContainer}>
                  <TouchableOpacity
                    onPress={() => { setShowDatePicker(false) }}
                    style={styles.iosPickerButton}>
                    <Text style={{ color: "#fff" }}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={confirmIOSDate}
                    style={[styles.iosPickerButton, { backgroundColor: "#fca311" }]}>
                    <Text style={{ color: "#fff" }}>Ok</Text>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity style={styles.button}>
                <Text style={{ color: "#fff", fontSize: wp(3.4) }}>Potvrdi obavljenu Sanitaciju</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
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
    bottom: hp(10.5),
  },
  headerLogoPic: {
    width: wp(40),
    height: wp(40),
    marginHorizontal: wp(4)
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
    justifyContent: 'center',
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
    shadowRadius: wp(0.4),
    shadowOpacity: 0.2,
    shadowOffset: { width: wp(0.3), height: wp(0.3) },
    elevation: hp(1),
    borderRadius: wp(20),
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
    shadowRadius: wp(0.25),
    shadowOpacity: 0.4,
    shadowOffset: { width: wp(0.2), height: wp(0.2) },
    elevation: 15
  },
  datePicker: {
    height: hp(15),
    marginVertical: hp(1.5)
  },
  iosPickerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: wp(70)
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
    marginTop: hp(10),
    elevation: hp(1)
  }
});
