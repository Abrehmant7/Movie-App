import { collection, doc, getDoc, setDoc, updateDoc, increment, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // your Firebase setup

const COLLECTION_NAME = "searches"; // Firestore collection you created

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // Use movie.id or searchTerm as document ID to avoid duplicates
    const docRef = doc(db, COLLECTION_NAME, searchTerm); // or movie.id if available
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If it exists, increment the count
      await updateDoc(docRef, {
        count: increment(1),
      });
    } else {
      // If it doesn't exist, create the document
      await setDoc(docRef, {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("count", "desc"),
      limit(5)
    );

    const querySnapshot = await getDocs(q);
    const trendingMovies = [];

    querySnapshot.forEach((doc) => {
      trendingMovies.push({ id: doc.id, ...doc.data() });
    });

    return trendingMovies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};