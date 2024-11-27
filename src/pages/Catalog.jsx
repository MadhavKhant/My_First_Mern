import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getCatalogPageData } from '../services/operations/CategoryData';
import Footer from '../components/common/Footer';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiconnector';
import CourseCard from '../components/core/Catalog/CourseCard';

const Catalog = () => {

    const {CatalogName} = useParams("");
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [CategoryId, setCategoryId] = useState("");

    //Set category id in CAtegoryId of selected category from navbar 
    useEffect(()=> {
        if(CatalogName)
        {
            const getCategories = async() => {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                const category_id = res?.data?.data?.filter((ct) => ct.Name.split(" ").join("-") === CatalogName)[0]._id;
                setCategoryId(category_id);
            }
            getCategories();
        }
    }, [CatalogName]);

    //fetch single Category Page details
    useEffect(() => {
        
        if(CategoryId)
        {
            const getCategoyPageDetails = async () => {
            try{
                const res = await getCatalogPageData(CategoryId);
                //console.log("response in single Page CAtegory DEtails: ", res);
                catalogPageData?.data?.selectedCategory?.Course.map((ele, index) => {
                    console.log("ele is", ele.CourseName);
                })

                if(CategoryId){
                    setCatalogPageData(res);
                }

            }
            catch(e){
                console.log(e);
            }
        }

        getCategoyPageDetails();
        }


    },[CategoryId])

    // useEffect(() => {
    //     console.log("DATADATA: ", catalogPageData?.data?.selectedCategory.Course);
    // },[])



  return (
    <div className='text-white'>

        <div className='ml-[20%]'>
            <p>{`Home / Catalog /`}
                <span className=' text-white'>
                    {catalogPageData?.data?.selectedCategory?.Name}
                </span>
            </p>
            <p> {catalogPageData?.data?.selectedCategory?.Name} </p>
            {/* <p> {catalogPageData?.data?.selectedCategory?.Description}</p> */}
        </div>

        <div>
            {/* <div className='ml-[20%]'>
                Courses to get you started
            </div> */}
            {/* <div className=' flex gap-x-3 ml-[20%]'>
                <p>Most Popular</p>
                <p>New</p>
            </div> */}
            <div className='ml-[20%] flex gap-10 mt-6 mb-12'>
                {/* <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.Course} /> */}
                {
                    catalogPageData?.data?.selectedCategory.Course.map((ele, index) => (
                        <div key={index}>
                            <CourseCard  Course={ele}/>
                            
                        </div>
                    ))
                }
            </div> 
            <div>
                <CourseSlider Courses={catalogPageData?.data?.selectedCategory.Course}/>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Catalog
