import { storage } from "./firebase/config";
import * as ImagePicker from "expo-image-picker";
import {
  uploadBytes,
  getDownloadURL,
  uploadString,
  ref,
} from "firebase/storage";

const selectImage = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need gallery permissions to make this work!");
    }
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  console.log("result:", result.uri);
  if (result.cancelled === false) {
    const response = await fetch(result.uri);
    const blob = await response.blob();
    uploadImage(blob, result.uri);
    return result.uri;
  }
};

const uploadImage = async (file, uri) => {
  // extract filename from uri

  const index = uri.lastIndexOf("/") + 1;
  const fileName = uri.substr(index);
  const imagesRef = ref(storage, `images/${fileName}`);

  console.log("uploading image");

  uploadBytes(imagesRef, file).then((snapshot) => {
    console.log("uploaded");
  });
};

export default selectImage;
