import { storage, db } from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection,query, where,getDocs, doc,deleteDoc } from "firebase/firestore";

class PGService {
  constructor() {
    this.pg_collection_ref = collection(db, "pg_collection");
  }
  async addPG(pgObj, userId) {
    const { name, address, minPrice, maxPrice, city, state, reviews, pic } =
      pgObj;

    // Adding the Image
    const storageRef = ref(storage, `${userId} - ${pic.name}`);

    try {
      const upload_res = await uploadBytes(storageRef, pic);
      const pic_url = await getDownloadURL(storageRef);

      const data_update_res = await addDoc(this.pg_collection_ref, {
        uid: userId,
        name,
        address,
        min_price: minPrice,
        max_price: maxPrice,
        pic_url,
        city,
        state,
      });
      return data_update_res.id;
    } catch (error) {
      return null;
    }
  }

  async getUserWisePG(userId) {
    const q = query(this.pg_collection_ref, where("uid", "==", userId));
    const qs = await getDocs(q);

    const res = [];
    qs.forEach((doc) => {
      console.log({ id: doc.id, data: doc.data() });
      res.push({ id: doc.id, data: doc.data() });
    });

    return res;
  }

  async deletePG(docId,userId) {
    const reqd_doc = doc(db,"pg_collection",docId);
    
    try {
        await deleteDoc(reqd_doc);
        return true
    } catch (error) {
        return false
    }
}
}


export default PGService;
