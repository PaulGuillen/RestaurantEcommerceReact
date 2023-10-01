import { StyleSheet } from "react-native";

export const registerStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  containerBody: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  cardImage: {
    width: 120,
    height: 120,
    margin: 20,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "600",
    padding: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    padding: 14,
  },
  inputText: {
    height: 50,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 15,
    width: "90%",
    marginTop: 20,
    paddingLeft: 20,
    backgroundColor: "white",
  },
  roundedButton: {
    backgroundColor: "orange",
    paddingVertical: 14,
    borderRadius: 15,
    marginTop: 40,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: "white",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 60,
  },
  textRegister: {
    margin: 20,
    marginLeft: 10,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
