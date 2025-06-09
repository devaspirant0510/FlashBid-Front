import {useQueryGetCategories} from "@/features/auction/lib";
import AuctionCategory from "@widgets/auction/AuctionCategory.tsx";

const CategoryLists = ()=>{
    const {isLoading,data,isError,error} =useQueryGetCategories();
    if(isLoading){
        return <>loading</>
    }
    if(!data || !data.data){
        return <>nodata</>
    }
    if(isError){
        return <>{error}</>
    }

    return (
        <div className={"flex "}>
            <AuctionCategory category={data?.data!!}/>
        </div>
    )
}
export default CategoryLists;