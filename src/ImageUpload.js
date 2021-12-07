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
    base64: true,
  });

  console.log("result:", result.uri);
  if (result.cancelled === false) {
    uploadImage(result);
    return result.uri;
  }
};

const uploadImage = async (file) => {
  // extract filename from uri
  const index = file.uri.lastIndexOf("/") + 1;
  const fileName = file.uri.substr(index);
  const imagesRef = ref(storage, `images/${fileName}`);

  console.log("uploading image");
  /*
  const dataString = `data:image/jpeg;base64,${file.base64}`;
  uploadString(imagesRef, dataString, "data_url").then((snapshot) => {
    console.log("uploaded");
  });
  */
  uploadBytes(imagesRef, file).then((snapshot) => {
    console.log("uploaded");
  });
};

export default selectImage;
