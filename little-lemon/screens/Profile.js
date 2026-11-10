import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";

export default function Profile({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [orderStatus, setOrderStatus] = useState(false);
  const [passwordChanges, setPasswordChanges] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData) {
        const user = JSON.parse(userData);

        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");

        setOrderStatus(user.orderStatus || false);
        setPasswordChanges(
          user.passwordChanges || false
        );
        setSpecialOffers(
          user.specialOffers || false
        );
        setNewsletter(user.newsletter || false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveProfile = async () => {
    try {
      const user = {
        firstName,
        lastName,
        email,
        phone,
        orderStatus,
        passwordChanges,
        specialOffers,
        newsletter,
      };

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      Alert.alert(
        "Success",
        "Profile Saved Successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();

    navigation.replace("Onboarding");
  };

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Personal Information
      </Text>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {initials}
          </Text>
        </View>
      </View>

      <Text style={styles.label}>
        First Name
      </Text>

      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>
        Last Name
      </Text>

      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>
        Email
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>
        Phone Number
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        placeholder="(217) 555-0113"
      />

      <Image
        source={require("../assets/photos/Profile.png")}
        style={{
          width: 90,
          height: 90,
          borderRadius: 45,
        }}
      />

      <Text style={styles.notificationTitle}>
        Email Notifications
      </Text>

      <View style={styles.checkboxRow}>
        <Checkbox
          value={orderStatus}
          onValueChange={setOrderStatus}
        />
        <Text style={styles.checkboxText}>
          Order Statuses
        </Text>
      </View>

      <View style={styles.checkboxRow}>
        <Checkbox
          value={passwordChanges}
          onValueChange={setPasswordChanges}
        />
        <Text style={styles.checkboxText}>
          Password Changes
        </Text>
      </View>

      <View style={styles.checkboxRow}>
        <Checkbox
          value={specialOffers}
          onValueChange={setSpecialOffers}
        />
        <Text style={styles.checkboxText}>
          Special Offers
        </Text>
      </View>

      <View style={styles.checkboxRow}>
        <Checkbox
          value={newsletter}
          onValueChange={setNewsletter}
        />
        <Text style={styles.checkboxText}>
          Newsletter
        </Text>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveProfile}
      >
        <Text style={styles.buttonText}>
          Save Changes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.buttonText}>
          Log Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#495E57",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },

  label: {
    marginBottom: 5,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
  },

  saveButton: {
    backgroundColor: "#F4CE14",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  logoutButton: {
    backgroundColor: "#495E57",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 30,
  },

  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});