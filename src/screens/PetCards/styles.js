import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    color: "#000",
    fontSize: "30px",
    marginBottom: "30px",
  },
  cardContainer: {
    width: "90%",
    maxWidth: "260px",
    height: "300px",
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: "260px",
    height: "300px",
    shadowColor: "black",
    shadowOpacity: "0.2",
    shadowRadius: "20px",
    borderRadius: "20px",
    resizeMode: "cover",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: "20px",
  },
  cardTitle: {
    position: "absolute",
    bottom: 0,
    margin: "10px",
    color: "#fff",
  },
  infoText: {
    height: "28px",
    justifyContent: "center",
    display: "flex",
    zIndex: -100,
  },
  text: {
    alignSelf: "center",
    fontSize: 20,
  },
});
