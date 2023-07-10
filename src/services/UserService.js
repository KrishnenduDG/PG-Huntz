import { collection,query,where,getDocs,addDoc } from "firebase/firestore";
import { storage, db } from "../firebase.js";

class UserService {
    constructor(){
        this.user_collection_ref = collection(db,'user_collection');
    }


    async getUserById(userId){
        const q = query(this.user_collection_ref, where("uid", "==", userId));
        const qs = await getDocs(q);

        const res = [];
        qs.forEach((doc) => {
          res.push({ id: doc.id, data: doc.data() });
        });
        
        return res[0].data;
    }


    async createUser(userObj){
        const {uid,email,pic_url} = userObj;

        if((await this.getUserById(uid)).length) {
            return {msg: "User Already Exists!"}
        }else{
            try {
                const data_update_res = await addDoc(
                  this.user_collection_ref,
                  {uid,email,pic_url}
                );

                return { msg: "User Added Succesfully!",user_doc_id: data_update_res.id };
            } catch (error) {
                return null;
            }
        }      
    }
}

export default UserService;