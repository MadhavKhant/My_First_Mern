import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setLoading } from "../../slices/authSlice";
import { settingsEndpoints } from "../apis";




// UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
// CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
// DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints


export function DeleteAccount(navigate){
    return async(dispatch) => {
      console.log("entered in DeleteAccount in prrofileAPI");
      console.log("api checking: ", DELETE_PROFILE_API);
      dispatch(setLoading(true))
      try{
        console.log("entered in try block in delete account profileAPI")
        const response = await apiConnector("DELETE", DELETE_PROFILE_API);
        console.log("response of deleting account: ", response);
        console.log("response.data.success", response.data.success);
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Deleted Account Successfully");
        navigate("/")
      }
      catch(e){
        console.log("error in deleteing account in profileAPI error is: ", e);
        console.log("e.message is: ", e.message);
        
        toast.error("Unable to delete Account")
      }
      dispatch(setLoading(false))
    }
   }


export function ChangePassword(OldPassword, NewPassword, ConfirmNewPassword, navigate){
  return async(dispatch) => {
    console.log("enter in cha function");
    console.log("data in function: ", OldPassword,   NewPassword, ConfirmNewPassword)
    dispatch(setLoading(true))
    try{

      // const response = await apiConnector("POST", CHANGE_PASSWORD_API, {OldPassword, NewPassword, ConfirmNewPassword})
      const response = await apiConnector("POST", "/api/v1/auth/changepassword", {
        OldPassword,
        NewPassword,
        ConfirmNewPassword
    });

      console.log("response from changepassword: ", response);

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Password Changed Successfully");
    }
    catch(e){
      console.log("error in changepassword:", e);
      console.log("message of error:", e.message);
      toast.error("Unnable to changepassword")
    }
    dispatch(setLoading(false))
  }
}