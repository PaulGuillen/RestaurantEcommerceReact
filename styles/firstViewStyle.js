import { StyleSheet } from "react-native";

export const onBoardingStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
  },
  verticalContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  textLeft: {
    fontSize: 18,
  },
  textRigth: {
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: -6,
    fontStyle: "normal",
  },
  rotatedContainer: {
    transform: [{ rotate: "-90deg" }],
    marginRight: -40,
  },
  separator: {
    width: 1,
    height: 94,
    backgroundColor: "gray",
    marginHorizontal: 20,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageContainer: {
    marginTop: -60,
  },
  image: {
    width: 260,
    height: 260,
  },
  textBottomFromImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textBottomFromImage: {
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 4,
    fontStyle: "italic",
  },
  bottom: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  separatorContainer: {
    width: "100%",
    alignSelf: "center",
    bottom: 20,
  },
  separatorBottom: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
  },
  buttonStyle: {
    bottom: 10,
    right: 30,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
