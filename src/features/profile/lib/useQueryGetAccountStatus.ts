import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@shared/lib";
import {ApiResult} from "@entities/common";
import {UserStats} from "@entities/user/model";

export const useQueryGetAllAuctionChat = (id: number) => {
    return useQuery({
        queryKey: ["api", "v1", "profile", "status", Number(id)],
        queryFn: httpFetcher<ApiResult<UserStats>>
    })
}