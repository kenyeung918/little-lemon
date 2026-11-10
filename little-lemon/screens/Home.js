import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { menuItems } from "../data/menuData";

export default function Home() {

  const categories = [
    "Starters",
    "Mains",
    "Desserts",
  ];

  const [searchText, setSearchText] =
    useState("");

  const [debouncedText,
    setDebouncedText] =
    useState("");

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState([]);

  useEffect(() => {

    const timeout = setTimeout(() => {
      setDebouncedText(searchText);
    }, 500);

    return () => clearTimeout(timeout);

  }, [searchText]);

  const toggleCategory = (
    category
  ) => {

    if (
      selectedCategories.includes(
        category
      )
    ) {
      setSelectedCategories(
        selectedCategories.filter(
          item =>
            item !== category
        )
      );
    } else {
      setSelectedCategories([
        ...selectedCategories,
        category,
      ]);
    }
  };

  const filteredItems =
    menuItems.filter(item => {

      const nameMatch =
        item.name
          .toLowerCase()
          .includes(
            debouncedText.toLowerCase()
          );

      const categoryMatch =
        selectedCategories.length ===
          0 ||
        selectedCategories.includes(
          item.category
        );

      return (
        nameMatch &&
        categoryMatch
      );
    });

  return (
    <View style={styles.container}>

      {/* Hero Banner */}

      <View style={styles.hero}>
        <Image
          source={require("../assets/photos/Hero.png")}
          style={{
            width: 120,
            height: 120,
            borderRadius: 10,
          }}
        />
        <Text style={styles.heroTitle}>
          Little Lemon
        </Text>

        <Text style={styles.heroCity}>
          Chicago
        </Text>

        <Text style={styles.heroText}>
          We are a family owned
          Mediterranean restaurant,
          focused on traditional
          recipes served with a
          modern twist.
        </Text>

        <TextInput
          style={styles.search}
          placeholder="Search Menu"
          value={searchText}
          onChangeText={
            setSearchText
          }
        />
      </View>

      {/* Categories */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        style={{
          marginVertical: 15,
        }}
      >
        {categories.map(category => {

          const selected =
            selectedCategories.includes(
              category
            );

          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selected &&
                  styles.activeCategory,
              ]}
              onPress={() =>
                toggleCategory(
                  category
                )
              }
            >
              <Text
                style={
                  selected
                    ? styles.activeText
                    : styles.normalText
                }
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Menu List */}

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <View style={styles.textContainer}>
              <Text style={styles.foodName}>
                {item.name}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>

              <Text style={styles.price}>
                {item.price}
              </Text>
            </View>

            <Image
              source={item.image}
              style={styles.foodImage}
            />

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  hero: {
    backgroundColor:
      "#495E57",
    padding: 20,
  },

  heroTitle: {
    color: "#F4CE14",
    fontSize: 32,
    fontWeight: "bold",
  },

  heroCity: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },

  heroText: {
    color: "#fff",
    marginBottom: 15,
  },

  search: {
    backgroundColor:
      "#EDEFEE",
    padding: 12,
    borderRadius: 8,
  },

  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor:
      "#EDEFEE",
    borderRadius: 20,
    marginHorizontal: 5,
  },

  activeCategory: {
    backgroundColor:
      "#495E57",
  },

  normalText: {
    color: "#333",
  },

  activeText: {
    color: "#fff",
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  textContainer: {
    flex: 1,
    paddingRight: 10,
  },

  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  foodName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  description: {
    color: "#666",
    marginTop: 4,
    marginBottom: 8,
  },

  price: {
    color: "#495E57",
    fontWeight: "bold",
  },

  foodName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    marginTop: 5,
    color: "green",
    fontWeight: "bold",
  },
});