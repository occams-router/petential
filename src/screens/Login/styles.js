import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    alignSelf: "center",
    color: "#404040",
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 18,
    marginBottom: 20,
    color: "#404040",
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    marginTop: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#24a6a8",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#24a6a8",
    fontWeight: "bold",
    fontSize: 16,
  },
});
