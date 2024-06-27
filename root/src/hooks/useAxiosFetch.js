import { useEffect,useState } from "react";
import api from "axios";

const useAxiosFetchData= (dataUrl)=>{
    const [datas,setData]=useState([])
    const [fetchError,setFetchError]=useState(null)
    const [isLoading,setIsLoading]=useState(false)

    useEffect((url)=>{
        let isMount=true
        const source = api.CancelToken.source();
        const fetchData= async(url)=>{
            setIsLoading(true);
            try{
                const response=await api.get(url,{cancelToken:source.token})
                if(isMount){
                    setData(response.data)
                    setFetchError(null);
                }
            }
            catch(err){
                if(isMount){
                    setData([])
                    setFetchError(err.message);
                }
            }
            finally{
                isMount && setTimeout(()=>setIsLoading(false),2000)
                // isMount && setIsLoading(false);
            }
        }
        fetchData(dataUrl)
        const clean=()=>{
            isMount=false;
            source.cancel();
        }
        return clean;
    },[dataUrl])
    return{datas,fetchError,isLoading};
}
export default useAxiosFetchData;