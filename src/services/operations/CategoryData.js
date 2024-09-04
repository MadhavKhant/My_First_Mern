import React from 'react'
import { catalogData } from '../apis';
import { apiConnector } from '../apiconnector';
import toast from 'react-hot-toast';

export const getCatalogPageData = async (CategoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{

        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {CategoryId});

        console.log("response from getCatalogaPageData..................", response);

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

        result = response?.data;
    }
    catch(error){
        console.log("CATALOG PAGE DATA API ERROR....", error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}
