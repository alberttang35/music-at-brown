import {
  getDocs,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { User } from "../frontend/src/components/types/types";

export function usersBackend() {
  const [users, setUsers] = useState<User[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  //   const [spotifyId, setSpotifyId] = useState("");
  const userCollectionRef = collection(db, "Users");

  async function onSubmitUser(
    name: string,
    image: string,
    userId: string,
    genres: string[],
    targetEvents: string[]
  ) {
    const toAdd: User = {
      name: name,
      image: image,
      userId: userId,
      genres: genres,
      targetEvents: targetEvents,
    };
    setUsers([...users, toAdd]);
    try {
      await setDoc(doc(db, "Users", userId), toAdd);
      // await addDoc(userCollectionRef, toAdd);
    } catch (err) {
      console.log(err);
    }
  }

  async function getUsers() {
    try {
      const data = await getDocs(userCollectionRef);
      const filteredData = data.docs.map((doc) => {
        const userData = doc.data() as User;
        return userData;
      });
      console.log(filteredData);
      setUsers(filteredData);
      const idData = data.docs.map((doc) => ({
        ...doc.data().spotifyId,
      }));
      setIds(idData);
    } catch (err) {
      console.error(err);
    }
  }

  async function editUser(
    userId: string,
    fieldToChange: string,
    fieldValue: string
  ) {
    try {
      // console.log(userCollectionRef);
      const userDocRef = doc(userCollectionRef, userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const currentUserData = userDocSnapshot.data();
        console.log(userDocSnapshot);
        console.log(currentUserData);
        if (currentUserData.hasOwnProperty(fieldToChange)) {
          // Only update if the field exists in the current artist data
          await updateDoc(userDocRef, {
            [fieldToChange]: fieldValue,
          });
          console.log("User edited successfully.");
        } else {
          console.log(
            `Field '${fieldToChange}' does not exist in the user document.`
          );
        }
      } else {
        console.log(`User with userId '${userId}' does not exist.`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log("usersBackend useEffect");
    getUsers();
    // console.log(users); // appears that users is empty even though filteredData (line 46) isnt
  }, []); // should only do this after an artist is added

  return { users, onSubmitUser, getUsers, editUser };
}
