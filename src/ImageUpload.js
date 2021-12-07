import { storage, bucket } from "./firebase/config";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

const selectImage = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need gallery permissions to make this work!");
    }
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (pickerResult.cancelled === false) {
    const response = await fetch(pickerResult.uri);

    // convert response into a blob
    const blob = await response.blob();

    // upload image to cloud using blob data and uri as filename
    const finalImage = await uploadImage(blob, pickerResult.uri);

    return finalImage;
  }
};

const uploadImage = async (file, uri) => {
  let resized = await ImageManipulator.manipulateAsync(uri, [
    {
      resize: {
        width: 500,
      },
    },
  ]);

  const resizedUri = resized.uri;

  // convert to blob
  const response = await fetch(resizedUri);
  const resizedBlob = await response.blob();

  // extract filename from uri
  const index = resizedUri.lastIndexOf("/") + 1;
  const fileName = resizedUri.substr(index);
  const imagesRef = ref(storage, `images/${fileName}`);

  console.log("uploading to cloud...");
  await uploadBytes(imagesRef, resizedBlob);
  console.log("uploaded to cloud");

  return resizedUri;
};

const retrieveImage = async (uri) => {
  // extract filename from uri
  const index = uri.lastIndexOf("/") + 1;
  const fileName = uri.substr(index);
  const imageRef = ref(storage, `images/${fileName}`);

  const retrievedUrl = await getDownloadURL(imageRef);

  return retrievedUrl;
};

export { selectImage, retrieveImage };
